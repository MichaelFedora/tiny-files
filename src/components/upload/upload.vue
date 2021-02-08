<template>
<div class='tiny-upload modal-card'
  @dragover.prevent='throttledDragover()'>
  <header class='modal-card-head'>
    <p class='modal-card-title'>
      <span>Upload Files&nbsp;</span><span style='font-size: 1rem'>- {{ uploadDir }}</span>
    </p>
    <button type='button' class='delete' @click='$emit("close")' />
  </header>
  <section class='modal-card-body'>
    <template v-if='fileList.length'>
      <div class='files'>
        <div class='file-entry' v-for='(entry, i) of fileList' :key='"file-" + i'>
          <b-icon :icon='entry.fileIcon' :style='{ color: entry.fileIconColor }' :title='entry.type' />
          <span>{{ entry.file.name }}</span>
          <button type='button' class='delete' @click='remFile(entry.file)' />
        </div>
        <div class='file-entry' :key='"file-" + fileList.length' style='margin-top: 0.5rem'>
          <b-icon icon='file-multiple has-text-info' title='' />
          <span style='font-style: italic; opacity: 0.5'>Drop files here, or click the button below to upload</span>
          <span></span>
        </div>
      </div>
    </template>
    <b-field v-else>
      <b-upload
        v-model='localFiles'
        multiple
        drag-drop>
        <section class='section'>
          <div class='content has-text-centered'>
            <p><b-icon icon='upload' size='is-large' /></p>
            <p>Drop your files here or click to upload</p>
          </div>
        </section>
      </b-upload>
    </b-field>
  </section>
  <footer class='modal-card-foot'>
    <b-field v-show='!status' class='file is-info'>
      <b-upload v-model='localFiles' multiple>
        <span class='file-cta'>
          <b-icon class='file-icon' icon='upload' />
          <span class='file-label'>Upload files</span>
        </span>
      </b-upload>
    </b-field>
    <span v-show='status'>{{ status }} ({{ progress }}%)</span>
    <div style='flex-grow:1'/>
    <b-button label='close' @click='$emit("close")' :disabled='working' />
    <b-button type='is-primary' label='upload' @click='upload()' :disabled='working || !fileList.length' :loading='working' />
  </footer>
  <section v-if='dragging' id='upload-section' @dragover.prevent='throttledDragover()'>
    <b-field>
      <b-upload
        v-model='localFiles'
        multiple
        drag-drop>
        <section class='section'>
          <div class='content has-text-centered'>
            <p><b-icon icon='upload' size='is-large' /></p>
            <p>Drop your files here or click to upload (or <a @click.prevent='dragging = false'>cancel</a>)</p>
          </div>
        </section>
      </b-upload>
    </b-field>
  </section>
</div>
</template>
<script src='./upload.ts'></script>
<style lang='scss'>
div.tiny-upload {
  > header.modal-card-head {
    > p.modal-card-title {
      display: flex;
      align-items: center;
    }
  }

  > section.modal-card-body {
    display: flex;
    flex-flow: column;
    align-items: center;

    > div.files {
      flex-grow: 1;

      > div.file-entry {
        display: flex;
        align-items: center;
        > span:not(.icon) { margin-left: 0.5rem; margin-right: 1rem; }
      }
    }
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
}
</style>
