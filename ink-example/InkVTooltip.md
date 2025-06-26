```vue
// normal example
  <InkVTooltip>
    <button type="button"><i class="fa-regular fa-circle-info"></i></button>
    <template #popper>
      {{ tipContent }}
    </template>
  </InkVTooltip>

// disabled example
  <InkVTooltip :disabled="Boolean(list.deletable)">
    <InkButton
    size="xs"
    variant="icon"
    theme="transparent"
    :disabled="!Boolean(list.deletable) || currentConsoleUserPermission.view"
    @click="handleDelete(list.id, list.article.title)"
    >
      <i class="far fa-trash"></i>
    </InkButton>
    <template #popper>
      {{ $t('enabledCannotDeleted') }}
    </template>
  </InkVTooltip>
```