<template>
<div id='tiny-browse' :class='{ blur: dragging && !suppressDrag }' @dragover='dragOver'>
  <h1 class='title'>tiny-files browser</h1>
  <button id='upload-fab' class='has-background-info' v-show='canUpload' @click='upload()'><b-icon icon='file-upload' /></button>
  <tiny-explorer
    v-if='paths'
    :paths='paths'
    @update:dir='dir = $event'
    @open='open'
    @delete='remove'
    @copy='copy'
    @move='move'
    @share='share'
    :mapLink='getLink'
    rootRoute='/browse'
    :rootName='(familiarLayout && personal) ? "personal" : "root"'
    @dragging='suppressDrag = true'
    @draggingEnd='() => { suppressDrag = false; throttledDragover.flush(); }'
  />
  <section v-if='dragging && !suppressDrag' id='upload-section' @dragover.prevent='throttledDragover()'>
    <b-field>
      <b-upload
        v-model='dropFiles'
        multiple
        drag-drop>
        <section class='section'>
          <div class='content has-text-centered'>
            <p><b-icon icon='upload' size='is-large' /></p>
            <p>drop your files here or click to upload (or <a @click.prevent='dragging = false'>cancel</a>)</p>
          </div>
        </section>
      </b-upload>
    </b-field>
  </section>
  <b-loading :active='working' />
</div>
</template>

<script src='./browse.ts'></script>
<style lang='scss'>
div#tiny-browse {
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-flow: column;

  &.blur > :not(#upload-section) {
    filter: blur(2px);
  }

  > section#upload-section {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    > div.field {
      background: rgba(0, 0, 0, 0.4);

      div.upload-draggable {
        width:  calc(100vw - 2px);
        height: calc(100vh - 2px);

        > section.section {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  > h1 {
    padding-left: 0.5rem;
    padding-bottom: 1.25rem;
    padding-top: 0.75rem;
    margin-bottom: 0;
    border-bottom: 2px solid rgba(0, 0, 0, 0.05);
  }

  > div#tiny-explorer { height: 100%; }

  > button#upload-fab {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 20;

    display: flex;
    align-items: center;
    justify-content: center;

    color: white;

    border: none;
    padding: 0.5em;
    box-shadow: 0 1px 5px rgba(0,0,0,0.33);
    border-radius: 50%;

    cursor: pointer;
    user-select: none;
    z-index: 1;
  }
}
</style>
