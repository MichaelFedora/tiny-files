<template>
<div id='tiny-explorer'>
  <div id='header'>
    <div id='progress' class='has-background-primary' :style='{ width: (progress * 100).toFixed(2) + "%" }'></div>
    <div id='path'>
      <button
        class='button is-small is-dark'
        style='margin-right: 0.5rem; margin-left: 0.8rem'
        :disabled='splitDir.length <= 1'
        @click='goto(splitDir.length - 2)'
      >
        <b-icon icon='folder-upload' style='color: #FFD54F' />
      </button>
      <template v-for='(d, i) in splitDir'>
        <a :key='"a-"+i' class='tag' :title='d' @click='goto(i)'>
          <span>{{ d }}</span>
        </a>
        <span v-if='i + 1 < splitDir.length' :key='"s-"+i'><b-icon icon='chevron-right' /></span>
      </template>
    </div>
    <div id='buttons'>
      <div v-show='working' id='tiny-loading-small'></div>
      <button
        class='button is-small is-dark is-hidden-touch'
        :class='{ "has-text-primary": showPreview }'
        title='toggle preview'
        @click='showPreview = !showPreview'
      >
        <b-icon icon='view-split-vertical' />
      </button>
      <hr class='is-hidden-touch'>
      <template v-if='!viewOnly'>
        <button
          class='button is-small is-dark'
          :class='{ "has-text-warning": clipboard.length && cut }'
          :disabled='!anyActive || working'
          title='cut'
          @click='cutSelected()'
        >
          <b-icon icon='content-cut' />
        </button>
        <button
          class='button is-small is-dark'
          :class='{ "has-text-info": clipboard.length && !cut }'
          :disabled='!anyActive || working'
          title='copy'
          @click='copySelected()'
        >
          <b-icon icon='content-copy' />
        </button>
        <button
          class='button is-small is-dark'
          :class='{
            "has-text-warning": clipboard.length && cut,
            "has-text-info": clipboard.length && !cut
          }'
          :disabled='working || clipboard.length < 1'
          :title='clipboard.length ? "paste (" + clipboard.length + ")" : "paste"'
          @click='paste()'
        >
          <b-icon icon='content-paste' />
        </button>
        <button
          class='button is-small is-dark'
          :disabled='working || clipboard.length < 1'
          title='clear'
          @click='clearClipboard()'
        >
          <b-icon icon='backspace-outline' />
        </button>
        <hr>
        <button class='button is-small is-dark' :disabled='!anyActive || working' title='delete' @click='removeSelected()'>
          <b-icon icon='delete-forever' />
        </button>
        <hr>
        <template v-if='dir.startsWith("/public")'>
          <button class='button is-small is-dark' :disabled='!anyActive || working' title='share' @click='shareSelected()'>
            <b-icon icon='share' />
          </button>
          <hr>
        </template>
      </template>
      <button class='button is-small is-dark' :disabled='!anyActive || working' title='Download' @click='downloadSelected()'>
        <b-icon icon='download' />
      </button>
    </div>
  </div>
  <div id='explorer-container'>
    <div id='explorer'> <!-- preview split -->
      <div id='explorer-header' class='exp-grid' ref='expheader' :style='{ paddingRight: "calc(1.25rem + " + listHeaderScrollPadding + "px)" }'> <!-- sorting etc -->
        <button v-if='!viewOnly'
          class='button is-small is-dark'
          @click='newFolder()'
        >
          <b-icon icon='folder-plus' style='color: #FFD54F' />
        </button>
        <span v-else></span>
        <button class='button is-dark' @click='sort("name")'>
          <span>name</span>
          <b-icon v-show='sortByName === "name"' :icon='sortByDir ? "chevron-up" : "chevron-down"' />
        </button>
        <button class='button is-dark' @click='sort("size")'>
          <span>size</span>
          <b-icon v-show='sortByName === "size"' :icon='sortByDir ? "chevron-up" : "chevron-down"' />
        </button>
        <button class='button is-dark' @click='sort("mod")'>
          <span>last modified</span>
          <b-icon v-show='sortByName === "mod"' :icon='sortByDir ? "chevron-up" : "chevron-down"' />
        </button>
        <b-dropdown aria-role='list' position='is-bottom-left'>
          <button slot='trigger' class='dot-button hover-primary'>
            <b-icon icon='dots-horizontal' />
          </button>
          <b-dropdown-item aria-role='list-item' v-if='!viewOnly && dir.startsWith("/public")' @click='$emit("share", dir)'>share</b-dropdown-item>
          <b-dropdown-item aria-role='list-item' @click='selectAll()'>select all</b-dropdown-item>
          <b-dropdown-item aria-role='list-item' @click='downloadDir(dir)'>download</b-dropdown-item>
        </b-dropdown>
      </div>
      <div id='list-container' ref='listcontainer'> <!-- (vertical) scrolling -->
        <div id='list' ref='list'> <!-- must be full sized for background / selectionbox -->
          <div id='background' @mousedown='drawStart'
            @contextmenu='contextMenu($event)'>
            <h5 v-if='!index || !index[dir] || (index[dir].folders.length === 0 && index[dir].files.length === 0)' class='subtitle is-5'>
              nothing here...
            </h5>
          </div>
          <template v-if='index && index[dir]'>
            <router-link
              v-for='folder of sortedFolders'
              :key='"/" + folder.name'
              :to='getPath(folder.name)'
              v-slot='{ href }'
              custom
            >
              <a
                :id='"m-/" + folder.name'
                class='folder exp-grid'
                :class='{ active: active["/" + folder.name], "last-active": lastActive === "/" + folder.name }'
                :href='href'
                @click.prevent.stop='clickItem($event, folder, true)'
                :draggable='!viewOnly'
                @drop='folderDrop($event, folder)'
                @dragover='dragOver'
                @dragstart='folderDragStart($event, folder)'
                @dragend='dragEnd'
                @contextmenu='contextMenu($event, "folder", folder)'
              >
                <b-icon
                  :icon='folder.itemCount < 0 ? "folder-alert" : folder.path.startsWith("/public") ? "folder-search" : "folder"'
                  :style='{ color: folder.itemCount < 0 ? "#FFD54F" : "#FFD54F" }'
                  :title='folder.itemCount < 0 ? "will be removed unless files are uploaded inside" : (folder.itemCount + (folder.path.startsWith("/public") ? " shareable" : "") + " items")'
                />
                <span style='padding-left: 1em' :title='folder.name'>{{ folder.name }}</span>
                <span>{{ folder.size }}</span>
                <span>{{ folder.lastModified }}</span>
                <b-dropdown aria-role='list' position='is-bottom-left'>
                  <button slot='trigger' class='dot-button'>
                    <b-icon icon='dots-horizontal' />
                  </button>
                  <b-dropdown-item aria-role='list-item' @click='downloadDir(folder.path + "/")'>download</b-dropdown-item>
                  <template v-if='!viewOnly'>
                    <hr>
                    <b-dropdown-item aria-role='list-item' @click='cutItem("folder", folder.path)'>cut</b-dropdown-item>
                    <b-dropdown-item aria-role='list-item' @click='copyItem("folder", folder.path)'>copy</b-dropdown-item>
                    <b-dropdown-item aria-role='list-item' @click='pasteInto(folder.path)' :disabled='!clipboard.length'>paste into</b-dropdown-item>
                    <hr>
                    <b-dropdown-item aria-role='list-item' v-if='folder.path.startsWith("/public")' @click='$emit("share", folder.path)'>share</b-dropdown-item>
                    <b-dropdown-item aria-role='list-item' @click='$emit("delete", { type: "folder", path: folder.path })'>delete</b-dropdown-item>
                    <b-dropdown-item aria-role='list-item' @click='rename("folder", folder)'>rename</b-dropdown-item>
                  </template>
                </b-dropdown>
              </a>
            </router-link>
            <a
              v-for='file of sortedFiles'
              :id='"m-"+file.name'
              :key='file.name'
              :href='getLink(file.path)'
              :class='{ active: active[file.name], "last-active": lastActive === file.name }'
              class='file exp-grid'
              @click.prevent.stop='clickItem($event, file)'
              :draggable='!viewOnly'
              @drop='nullEvent'
              @dragover='nullEvent'
              @dragstart='fileDragStart($event, file)'
              @dragend='dragEnd'
              @contextmenu='contextMenu($event, "file", file)'
            >
              <b-icon :icon='file.fileIcon' :style='{ color: file.fileIconColor }' :title='file.contentType' />
              <span style='padding-left: 1em' :title='file.name'>{{ file.name }}</span>
              <span>{{ file.size }}</span>
              <span>{{ file.lastModified }}</span>
              <b-dropdown aria-role='list' position='is-bottom-left'>
                <button slot='trigger' class='dot-button'>
                  <b-icon icon='dots-horizontal' />
                </button>
                <b-dropdown-item aria-role='list-item' @click='openFile(file.path)'>open</b-dropdown-item>
                <template v-if='!viewOnly'>
                  <hr>
                  <b-dropdown-item aria-role='list-item' @click='cutItem("file", file.path)'>cut</b-dropdown-item>
                  <b-dropdown-item aria-role='list-item' @click='copyItem("file", file.path)'>copy</b-dropdown-item>
                  <hr>
                  <b-dropdown-item aria-role='list-item' v-if='dir.startsWith("/public")' @click='$emit("share", file.path)'>share</b-dropdown-item>
                  <b-dropdown-item aria-role='list-item' @click='$emit("delete", { type: "file", path: file.path })'>delete</b-dropdown-item>
                  <b-dropdown-item aria-role='list-item' @click='rename("file", file)'>rename</b-dropdown-item>
                </template>
              </b-dropdown>
            </a>
          </template>
          <div v-show='drawing' id='selectbox' :style='drawPos'></div>
          <!--
          div
            v-show='drawing'
            style='position: fixed; border: 2px solid red;'
            :style='{ top: drawPoints.y1 + "px", left: drawPoints.x1 + "px" }'
          ></div>
          <div
            v-show='drawing'
            style='position: fixed; border: 2px solid green;'
            :style='{ top: drawPoints.y1 + "px", left: drawPoints.x2 + "px" }'
          ></div>
          <div
            v-show='drawing'
            style='position: fixed; border: 2px solid blue;'
            :style='{ top: drawPoints.y2 + "px", left: drawPoints.x1 + "px" }'
          ></div>
          <div
            v-show='drawing'
            style='position: fixed; border: 2px solid yellow;'
            :style='{ top: drawPoints.y2 + "px", left: drawPoints.x2 + "px" }'
          ></div -->
        </div>
      </div>
    </div>
    <div id='explorer-preview' ref='exppreview' class='is-hidden-touch' v-if='showPreview'>
      <div>
        <template v-if='activeFile'>
          <span v-if='activeFile.rawSize > 20000000'>File too large to preview (> 20MB).</span>
          <figure v-else-if='/image\//.test(activeFile.contentType) || /\.(?:jpg|jpeg|png)$/i.test(activeFile.path)'><img :src='getLink(activeFile.path)'></figure>
          <pre v-else-if='/text\//.test(activeFile.contentType) || /\.(?:txt|json|yaml|ini|md)$/i.test(activeFile.path)'><b-loading :is-full-page='false' :active='loadingFileContents' />{{ autoActiveFileContents }}</pre>
          <span v-else>File not supported for previewing.</span>
        </template>
        <span v-else>No file selected.</span>
      </div>
    </div>
  </div>
  <div
    v-show='showContextMenu'
    id='context-menu'
    class='dropdown-content'
    aria-role='list'
    ref='contextmenu'
    @mousedown.stop=''
    @mouseup='closeContextMenu()'
  >
    <button class='dropdown-item' aria-role='list-item' @click='contextItem ? downloadSelected() : downloadDir()'>download {{!contextItem ? ' directory' : contextItemType }}</button>
    <button class='dropdown-item' aria-role='list-item' v-if='contextItem && contextItemType === "file"' @click='copyLink()'>copy link</button>
    <template v-if='!viewOnly'>
      <button class='dropdown-item' aria-role='list-item' @click='cutSelected()' :disabled='!contextItem && !anyActive'>cut</button>
      <button class='dropdown-item' aria-role='list-item' @click='copySelected()' :disabled='!contextItem && !anyActive'>copy</button>
      <button class='dropdown-item' aria-role='list-item' v-if='!contextItemType' @click='paste()' :disabled='!clipboard.length'>paste</button>
      <button class='dropdown-item' aria-role='list-item' v-else-if='contextItemType === "folder"' @click='pasteInto(contextItem.path)' :disabled='!clipboard.length'>paste into</button>
      <hr>
      <button class='dropdown-item' aria-role='list-item' v-if='dir.startsWith("/public") || viewOnly' @click='anyActive ? shareSelected() : $emit("share", dir)'>share {{ !anyActive ? ' directory' : '' }}</button>
      <button class='dropdown-item' aria-role='list-item' @click='removeSelected()' :disabled='!anyActive'>delete</button>
      <button class='dropdown-item' aria-role='list-item' v-show='contextItemType && contextItem' @click='() => rename(contextItemType, contextItem)'>rename</button>
    </template>
  </div>
</div>
</template>
<script src='./explorer.ts'></script>
<style lang='scss'>
#tiny-explorer {

  display: flex;
  flex-flow: column;
  overflow: hidden;

  .tag {
    background-color: rgba(0, 0, 0, 0.05);
  }

  div#selectbox {
    position: fixed;
    background-color: rgba(3, 168, 244, 0.33);
    border: 1px solid rgba(3, 168, 244, 0.67);
  }

  button.dot-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: inherit;
    height: 100%;
  }

  div#context-menu {
    position: fixed;
    button {
      border: none;
      cursor: pointer;
      &:not(:hover) {
        background: inherit;
      }
    }
    > a.is-disabled, button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: disabled;
      &:hover {
        background: inherit;
        color: inherit;
      }
    }
  }

  .exp-grid,
  div#list > a.exp-grid {
    display: grid;
    grid-template-columns: 2em 1fr 9em 12em 3em;
    grid-template-rows: 100%;

    min-width: 2em + 6em + 9em + 12em + 3em; // 32em
    width: 100%;

    align-items: center;
    justify-items: flex-start;

    > :first-child {
      justify-self: center;
    }
    > span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
    }
    > :last-child {
      justify-self: center;
    }
  }

  div#explorer-container {
    display: flex;
    min-height: 0;
    flex-grow: 1;

    > div#explorer {
      flex: 1 0 1px;
      min-width: 35em;
      width: auto;

      display: flex;
      flex-flow: column;

      > div#explorer-header {
        flex-shrink: 0;
      }

      > div#list-container {
        overflow: auto;
        flex: 1 1 1px;
      }
    }

    > div#explorer-preview {
      padding: 1.25rem;
      border-left: 2px solid rgba(0, 0, 0, 0.05);
      display: flex;
      justify-content: center;
      align-items: center;

      height: 100%;
      max-width: calc(100% - 25em);
      width: 50vw;
      flex-shrink: 0;

      > div {
        position: relative;
        display: flex;
        height: 100%;
        width: 100%;

        div.loading-overlay {
          z-index: 0;
        }

        > figure,
        > div,
        > pre {
          flex: 1 1 1px;
        }

        > figure,
        > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        > figure > img { max-height: 100%; }

        > pre { height: max-content; }

        > span {
          text-align: center;
          align-self: center;
          flex-grow: 1;
        }
      }
    }
  }

  div#list {
    padding: 1.25rem;
    padding-top: 1rem;
    position: relative;
    flex: 1 0 1px;
    // height: max-content;

    > div#background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      user-select: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > a {
      color: inherit;
      user-select: none;
      cursor: default;
      position: relative;
      display: flex;
      align-items: center;
      border: 1px solid transparent;
      width: calc(100vw - 2.5rem);
      /*> :first-child {
        display: flex;
        align-items: center;
        > :first-child {
          margin-right: 0.5em;
        }
      }*/
      > span {
        padding: 0 1em;
      }
      /** {
        pointer-events: none;
      }*/
      &:hover, &.hover {
        background-color: rgb(71, 124, 149); // rgb(225,245,254);
        border-color: rgb(79,195,247);
      }
      &.active {
        background-color: rgb(36,91,117); // rgb(179,229,252);
        border-color: rgb(14, 142, 201); // rgb(129,212,250);
        &:hover, &.last-active {
          border-color: rgb(79,195,247);
        }
      }
      &.last-active {
        border-color: rgb(79,195,247);
      }
    }
  }

  div#explorer-header {
    padding: 0 1.25rem;
    justify-items: stretch;
    > :not(:first-child) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 0;
      &:not(:last-child) {
        border-right: 2px solid rgba(0, 0, 0, 0.05);
      }
    }
  }

  div#header {
    position: relative;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid rgba(0,0,0,0.05);
    > div#path {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    > div#buttons {
      display: flex;
      align-items: center;
      > a, > button {
        background-color: transparent;
      }

      > hr {
        display: inline-block;
        height: 1em;
        width: 0;
        margin: 0 0.4em;
        padding: 0 1px;
      }
    }
  }

  div#progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    top: 0;
    opacity: 0.2;
  }

  div#tiny-loading-small {
    position: relative;
    background-color: hsl(0, 0%, 4%);
    width: 3px;
    height: 3px;
    margin: 9px;
    border-radius: 50%;

    &:after, &:before {
      content: "";
      position: absolute;
      width: 2px;
      height: 2px;
      border-radius: 50%;
    }

    &:after {
      left: -2px;
      top: -1px;
      background-color: hsl(0, 0%, 71%);
      transform-origin: 3px 2px;
      animation: axis 1s linear infinite;
    }
    &:before {
      left: -5px;
      top: -3px;
      background-color: hsl(204, 71%,  53%);
      transform-origin: 6px 4px;
      animation: axis 2s linear infinite;
    }
  }

  @keyframes axis {
    0% {
      transform: rotateZ(0deg) translate3d(0,0,0);
    }
    100% {
      transform: rotateZ(360deg) translate3d(0,0,0);
    }
  }
}
</style>
