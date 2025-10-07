<template>
  <Dialog 
    :visible="visible"
    @update:visible="emit('update:visible', $event)"
    :header="title"
    :modal="modal"
    :closable="closable"
    :style="{ width: width }"
  >
    <div class="py-4">
      <slot name="content"></slot>
    </div>

    <template #footer>
      <slot name="footer">
        <Button 
          :label="saveText"
          :loading="loading"
          @click="handleSave"
        />
        <Button 
          :label="cancelText"
          severity="secondary"
          :disabled="loading"
          @click="handleCancel"
        />
      </slot>
    </template>
  </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Dialog'
  },
  width: {
    type: String,
    default: '500px'
  },
  modal: {
    type: Boolean,
    default: true
  },
  closable: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  saveText: {
    type: String,
    default: 'Guardar'
  },
  cancelText: {
    type: String,
    default: 'Cancelar'
  }
});


const emit = defineEmits(['update:visible', 'save', 'cancel']);

const handleSave = () => {
  emit('save');
};

const handleCancel = () => {
  emit('cancel');
  emit('update:visible', false);
};
</script>