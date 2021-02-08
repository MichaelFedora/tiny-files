<template>
<div id='tiny-explorer'>
  <div id='header'>
    <div id='progress' class='has-background-primary' :style='{ width: (progress * 100).toFixed(2) + "%" }'></div>
    <div id='path'>
      <button
        class='button is-small is-dark'
        style='margin-right: 0.5rem;'
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
      <button class='button is-small is-dark' :disabled='!anyActive || working' title='Download' @click='downloadSelected()'>
        <b-icon icon='download' />
      </button>
    </div>
  </div>
  <div id='explorer-header' class='exp-grid'>
    <button v-if='!viewOnly'
      class='button is-small is-dark'
      @click='newFolder()'
    >
      <b-icon icon='folder-plus' style='color: #FFD54F' />
    </button>
    <button class='button is-dark' @click='sort("name")'>
      <span>Name</span>
      <b-icon v-show='sortByName === "name"' :icon='sortByDir ? "chevron-up" : "chevron-down"' />
    </button>
    <button class='button is-dark' @click='sort("size")'>
      <span>Size</span>
      <b-icon v-show='sortByName === "size"' :icon='sortByDir ? "chevron-up" : "chevron-down"' />
    </button>
    <button class='button is-dark' @click='sort("mod")'>
      <span>Last Modified</span>
      <b-icon v-show='sortByName === "mod"' :icon='sortByDir ? "chevron-up" : "chevron-down"' />
    </button>
    <b-dropdown aria-role='list' position='is-bottom-left'>
      <button slot='trigger' class='dot-button hover-primary'>
        <b-icon icon='dots-horizontal' />
      </button>
      <b-dropdown-item aria-role='list-item' @click='downloadDir(dir)'>Download</b-dropdown-item>
    </b-dropdown>
  </div>
  <div id='explorer' ref='explorer'>
    <div id='background' @mousedown='drawStart($event)'>
      <h5 v-if='!index || !index[dir] || (index[dir].folders.length === 0 && index[dir].files.length === 0)' class='subtitle is-5'>
        Nothing here...
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
        >
          <b-icon icon='folder' style='color: #FFD54F' :title='folder.itemCount + " items"' />
          <div style='padding-left: 1em'>
            <span>{{ folder.name }}</span>
          </div>
          <span>{{ folder.size }}</span>
          <span>{{ folder.lastModified }}</span>
          <b-dropdown aria-role='list' position='is-bottom-left'>
            <button slot='trigger' class='dot-button'>
              <b-icon icon='dots-horizontal' />
            </button>
            <b-dropdown-item aria-role='list-item' @click='downloadDir(dir + folder.name + "/")'>Download</b-dropdown-item>
            <template v-if='!viewOnly'>
              <b-dropdown-item aria-role='list-item' @click='$emit("delete", { type: "folder", path: folder.path })'>Delete</b-dropdown-item>
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
      >
        <b-icon :icon='file.fileIcon' :style='{ color: file.fileIconColor }' :title='file.contentType' />
        <div style='padding-left: 1em'>
          <span>{{ file.name }}</span>
        </div>
        <span>{{ file.size }}</span>
        <span>{{ file.lastModified }}</span>
        <b-dropdown aria-role='list' position='is-bottom-left'>
          <button slot='trigger' class='dot-button'>
            <b-icon icon='dots-horizontal' />
          </button>
          <b-dropdown-item aria-role='list-item' @click='openFile(file.path)'>Open</b-dropdown-item>
          <template v-if='!viewOnly'>
            <b-dropdown-item aria-role='list-item' @click='$emit("delete", { type: "file", path: file.path })'>Delete</b-dropdown-item>
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
</template>
<script src='./explorer.ts'></script>
<style lang='scss'>
#tiny-explorer {

  display: flex;
  flex-flow: column;

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

  .exp-grid,
  div#explorer > a.exp-grid {
    display: grid;
    grid-template-columns: 2em 1fr 9em 12em 3em;
    grid-template-rows: 100%;
    align-items: center;
    justify-items: flex-start;
    > :first-child {
      justify-self: center;
    }
    > :last-child {
      justify-self: center;
    }
  }

  div#explorer {
    padding: 1.25rem;
    padding-top: 1rem;
    position: relative;
    flex: 1 0 1px;
    overflow-y: auto;

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