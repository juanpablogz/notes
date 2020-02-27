<template>
  
  <div class="q-pa-md ">

    <div class="q-pa-md q-gutter-sm">
    <q-editor
    v-if="!modoEdicion"
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Save your work',
          icon: 'save',
          label: 'Save',
          handler: saveWork
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />


      <q-editor
     v-else
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Update',
          icon: 'save',
          label: 'Update',
          handler: updateWork
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />

  </div>


    <div class="q-my-md">
      <q-card class="my-card col q-mt-lg"  v-for="(item, index) in task" :key="index"  >

      <q-card-section>

      </q-card-section>

      <q-card-section class="q-pt-none" v-html="item.texto" :class="item.estado ? 'tachar' : ''">
        <div class="text-subtitle1" >
         
        <div class="text-caption text-grey">
          texto prueba
        </div>
        </div>
       
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="keyboard_tab" />
        <q-btn flat color="primary" @click="eliminar(index, item.id)">
          delete
        </q-btn>
        <q-btn flat color="primary" @click="item.estado = !item.estado">
          tachar
        </q-btn>
        <q-btn flat color="yellow" @click="editar(index, item.id)">Editar
        </q-btn>
        <div class="flex flex-center" v-if="task.length == 0"> sin notas</div>
      </q-card-actions>
    </q-card>
    </div>
  </div>
</template>

<script>


import {db} from "boot/firebase";

export default {
 created() {
   this.listar()
 },
  data () {
    return {
      stars: 4,
      editor: '',
      task: [],
      index: null,
      modoEdicion: false,
      id: null
    }
  },
   methods: {
     
   async updateWork(){
  try {
    this.$q.loading.show()
    const query = await db.collection('task').doc(this.id).update({
      texto: this.editor
    })

    this.task[this.index].texto = this.editor;
    this.index = null;
    this.modoEdicion = false;  
    this.id = null;
    this.editor = ''
    this.$q.notify({
      message: 'Tarea actualizada con éxito!',
      color: 'dark',
      textColor: 'white',
      icon: 'cloud_done'
    })
  } catch (error) {
    this.$q.notify({
      message: error,
      color: 'red',
      textColor: 'white',
      icon: 'clear'
    })
  } finally {
    this.$q.loading.hide()
  }
},


     editar(index, id){
       this.modoEdicion = true;
       this.index = index;
       this.id = id;
       this.editor = this.tasks[index].texto
     },

     async listar(){
      try {
        const resDB = await db.collection('task').get()
       
        resDB.forEach(res => {
          console.log(res);
           const tasks = {id: res.id, texto: res.data().texto, estado: res.data().estado} 
           this.task.push(tasks) });

         } catch (error) {
        console.log(error);
      }
     },
   async saveWork () {

     try {
       const resDB = await db.collection('task').add({
         texto: this.editor,
         estado: false
         
       })

         this.task.push({
        texto: this.editor,
        estado:false,
        id: resDB.id
      }) 
      this.$q.notify({
        message: 'Saved your note',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done'
      })
      this.editor = ''
     } catch (error) {
       
     }      
    },

 eliminar(index, id){
  this.$q.dialog({
    title: 'Cuidado!',
    message: 'Desea eliminar la nota?',
    cancel: true,
    persistent: true}).onOk( async () => {
      
      try {
       await db.collection('task').doc(id).delete()
        this.task.splice(index, 1);
      } catch (error) {
        console.log(error)
      }
      })
    }
  }
  
}

</script>

<style>
  .tachar{
    text-decoration: line-through;
  }
</style>

