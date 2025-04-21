```vue
// editCategory: Disclosure
<InkDisclosure v-for="(item, index) in group" v-slot="{ open }" :defaultOpen="defaultOpen[index]">
  <InkDisclosureButton @click="onOpen(index)">
    {{ item . name }}
  </InkDisclosureButton>
  <div v-show="open">
    <InkDisclosurePanel static :unmount="false">
      <DynamicComponent v-for="field in item.field" :key="field.id" :field="field"
        :value="fieldValue.find(item => item.id === field.id)?.value" />
    </InkDisclosurePanel>
  </div>
</InkDisclosure>
// editArticlePageRightPanel: js
<InkDisclosure :defaultOpen="true" v-for="item of group" :key="item.name">
  <InkDisclosureButton class="tw-accordion-title js-tw-accordion-title" @click.prevent="toggleRightPanelItems($event)">
    {{ item . name }}
  </InkDisclosureButton>
  <InkDisclosurePanel>
    <DynamicComponent v-for="field in item.field" :key="field.id" :field="field"
      :value="createStore.currentArticleData.field.find(item => item.id === field.id)?.value"
      :status="createStore.currentArticleData.status" :disabled="createStore.isLock"
      :aiDisabled="!createStore.currentArticleData.content" :aiTypes="currentConsole.service?.ai && field.ai" />
  </InkDisclosurePanel>
</InkDisclosure>
```
