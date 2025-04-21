<!-- button example -->
```vue
<div class="tw-text-xlmix">==== INK ====</div>
<strong>- string link</strong>
<div class="tw-flex tw-gap-1">
  <InkButton as="router-link" to="/" variant="base" theme="link">router-link</InkButton>
  <InkButton variant="base" theme="link">tw-btn-link</InkButton>
  <InkButton as="a" href="#" variant="base" theme="link">tw-btn-link</InkButton>
  <InkButton variant="base" theme="link" disabled>tw-btn-link</InkButton>
  <InkButton as="a" href="#" variant="base" theme="link" disabled>tw-btn-link</InkButton>
  <InkButton as="a" href="#">only a tag</InkButton>
  <InkButton as="a" href="#">empty props</InkButton>
  <InkButton variant="base" theme="link" :disabled="testLoading" :loading="testLoading">tw-btn-link</InkButton>
  <InkButton as="a" href="#" variant="base" theme="link" :disabled="testLoading" :loading="testLoading">
    tw-btn-link
  </InkButton>
  <InkButton as="a" href="#" :disabled="testLoading" :loading="testLoading">only a tag</InkButton>
  <InkButton as="a" href="#" :disabled="testLoading" :loading="testLoading">empty props</InkButton>

</div>
<strong>- btn-icon-txt, btn(h36px)</strong>
<div class="tw-flex tw-gap-1">
  <InkButton as="router-link" class="ABC" to="/" variant="txt" theme="transparent"><i
      class="far fa-sliders-h"></i>tw-btn-icon & txt</InkButton>
  <InkButton id="QWE" class="ABC" :class="['DEF']" @click="console.log('click')"
    @mouseenter="console.log('mouseenter')" @mouseleave="console.log('mouseleave')" variant="txt" theme="transparent">
    <i class="far fa-sliders-h"></i>tw-btn-icon & txt</InkButton>
  <InkButton variant="txt" :class="['ABC']" theme="gray"><i class="far fa-sliders-h"></i>tw-btn-gray
  </InkButton>
  <InkButton variant="txt" theme="info"><i class="far fa-sliders-h"></i>tw-btn-info</InkButton>
  <InkButton variant="txt" theme="primary"><i class="far fa-sliders-h"></i>tw-btn-primary</InkButton>
  <InkButton variant="txt" theme="outline-gray"><i class="far fa-sliders-h"></i>tw-btn-outline-gray</InkButton>
  <InkButton as="a" href="#" variant="txt" theme="primary"><i class="far fa-sliders-h"></i>100
  </InkButton>
</div>
<strong>- btn-icon-txt, btn-md(h32px)</strong>
<div class="tw-flex tw-gap-1">
  <InkButton as="router-link" to="/" variant="txt" theme="transparent" size="md"><i
      class="far fa-sliders-h"></i>tw-btn-icon & txt</InkButton>
  <InkButton variant="txt" size="md" theme="transparent"><i class="far fa-sliders-h"></i>tw-btn-icon & txt
  </InkButton>
  <InkButton variant="txt" size="md" theme="gray"><i class="far fa-sliders-h"></i>tw-btn-gray</InkButton>
  <InkButton variant="txt" size="md" theme="info"><i class="far fa-sliders-h"></i>tw-btn-info</InkButton>
  <InkButton variant="txt" size="md" theme="primary"><i class="far fa-sliders-h"></i>tw-btn-primary</InkButton>
  <InkButton variant="txt" size="md" theme="outline-gray"><i class="far fa-sliders-h"></i>tw-btn-outline-gray
  </InkButton>
  <InkButton as="a" href="#" variant="txt" size="md" theme="primary"><i
      class="far fa-sliders-h"></i>^^</InkButton>
</div>
<strong>- btn-txt, btn(h36px)</strong>
<div class="tw-flex tw-gap-1">
  <InkButton as="router-link" to="/" variant="txt" theme="transparent">router-link</InkButton>
  <InkButton variant="txt" theme="transparent">tw-btn-txt</InkButton>
  <InkButton variant="txt" theme="gray">tw-btn-gray</InkButton>
  <InkButton variant="txt" theme="info">tw-btn-info</InkButton>
  <InkButton variant="txt" theme="primary">tw-btn-primary</InkButton>
  <InkButton variant="txt" theme="outline-gray">tw-btn-outline-gray</InkButton>
  <InkButton as="a" href="#" variant="txt" theme="primary">mini 100</InkButton>
</div>
<strong>- btn-txt, btn-md(h32px)</strong>
<div class="tw-flex tw-gap-1">
  <InkButton as="router-link" to="/" variant="txt" size="md" theme="transparent">router-link
  </InkButton>
  <InkButton variant="txt" size="md" theme="transparent">tw-btn-txt</InkButton>
  <InkButton variant="txt" size="md" theme="gray">tw-btn-gray</InkButton>
  <InkButton variant="txt" size="md" theme="info">tw-btn-info</InkButton>
  <InkButton variant="txt" size="md" theme="primary">tw-btn-primary</InkButton>
  <InkButton variant="txt" size="md" theme="outline-gray">tw-btn-outline-gray</InkButton>
  <InkButton as="a" href="#" variant="txt" size="md" theme="primary">^^</InkButton>
</div>
<strong>- btn-icon</strong>
<div class="tw-flex tw-gap-1">
  <InkButton as="router-link" to="/" variant="icon" theme="transparent"><i class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton variant="icon" theme="transparent">i</InkButton>
  <InkButton variant="icon" theme="gray"><i class="far fa-sliders-h"></i></InkButton>
  <InkButton variant="icon" theme="info"><i class="far fa-sliders-h"></i></InkButton>
  <InkButton variant="icon" theme="primary"><i class="far fa-sliders-h"></i></InkButton>
  <InkButton variant="icon" theme="outline-gray"><i class="far fa-sliders-h"></i></InkButton>
  <InkButton as="a" href="#" variant="icon" theme="primary"><i class="far fa-sliders-h"></i>
  </InkButton>
</div>
<strong>- btn-icon, btn-md(h32px)</strong>
<div class="tw-flex tw-gap-1">
  <InkButton as="router-link" to="/" variant="icon" size="md" theme="transparent"><i
      class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton variant="icon" size="md" theme="transparent"><i class="far fa-sliders-h"></i></InkButton>
  <InkButton variant="icon" size="md" theme="gray"><i class="far fa-sliders-h"></i></InkButton>
  <InkButton variant="icon" size="md" theme="info"><i class="far fa-sliders-h"></i></InkButton>
  <InkButton variant="icon" size="md" theme="primary"><i class="far fa-sliders-h"></i></InkButton>
  <InkButton variant="icon" size="md" theme="outline-gray"><i class="far fa-sliders-h"></i></InkButton>
  <InkButton as="a" href="#" variant="icon" size="md" theme="primary"><i
      class="far fa-sliders-h"></i></InkButton>
</div>
<strong>- btn-icon, btn-xs(h24px)</strong>
<div class="tw-flex tw-gap-1">
  <InkButton as="router-link" to="/" variant="icon" size="xs" theme="transparent"><i
      class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton variant="icon" size="xs" theme="transparent"><i class="far fa-sliders-h"></i></InkButton>
  <InkButton variant="icon" size="xs" theme="gray"><i class="far fa-sliders-h"></i></InkButton>
  <InkButton variant="icon" size="xs" theme="info"><i class="far fa-sliders-h"></i></InkButton>
  <InkButton variant="icon" size="xs" theme="primary"><i class="far fa-sliders-h"></i></InkButton>
  <InkButton variant="icon" size="xs" theme="outline-gray"><i class="far fa-sliders-h"></i></InkButton>
  <InkButton as="a" href="#" variant="icon" size="xs" theme="primary"><i
      class="far fa-sliders-h"></i></InkButton>
</div>
<em class="tw-error-message">tw-error-message</em>
<strong>- attr disabled</strong>
<div class="tw-flex tw-gap-1">
  <InkButton as="router-link" to="/" variant="txt" theme="transparent" disabled><i
      class="far fa-sliders-h"></i>disabled
  </InkButton>
  <InkButton variant="txt" disabled theme="transparent"><i class="far fa-sliders-h"></i>disabled</InkButton>
  <InkButton variant="txt" disabled theme="gray"><i class="far fa-sliders-h"></i>disabled</InkButton>
  <InkButton variant="txt" disabled theme="info"><i class="far fa-sliders-h"></i>disabled</InkButton>
  <InkButton variant="txt" disabled theme="primary"><i class="far fa-sliders-h"></i>disabled</InkButton>
  <InkButton variant="txt" disabled theme="outline-gray"><i class="far fa-sliders-h"></i>disabled</InkButton>
  <InkButton as="a" href="#" variant="txt" disabled theme="primary"><i
      class="far fa-sliders-h"></i>disabled</InkButton>
</div>
<strong>- class disabled（a tag, sapn tag）, 為了讓按鈕可以觸發鼠標樣式，流程不觸發要在 js 做</strong>
<div class="tw-flex tw-gap-1">
  <InkButton as="router-link" to="/" variant="txt" disabled theme="transparent"><i
      class="far fa-sliders-h"></i>tw-btn-icon & txt</InkButton>
  <InkButton as="a" href="#" variant="txt" disabled theme="transparent"><i
      class="far fa-sliders-h"></i>tw-btn-icon &
    txt</InkButton>
  <InkButton as="a" href="#" variant="txt" disabled theme="gray"><i
      class="far fa-sliders-h"></i>tw-btn-gray</InkButton>
  <InkButton as="a" href="#" variant="txt" disabled theme="info"><i
      class="far fa-sliders-h"></i>tw-btn-info</InkButton>
  <InkButton as="a" href="#" variant="txt" disabled theme="primary"><i
      class="far fa-sliders-h"></i>tw-btn-primary
  </InkButton>
  <InkButton as="a" href="#" variant="txt" disabled theme="outline-gray"><i
      class="far fa-sliders-h"></i>tw-btn-outline-gray</InkButton>
  <InkButton as="a" href="#" variant="txt" disabled theme="primary"><i
      class="far fa-sliders-h"></i>100</InkButton>
</div>
<strong>- attr disabled & spinner</strong>
<div><strong><i>- txt</i></strong></div>
<div class="tw-flex tw-gap-1">
  <InkButton :disabled="testLoading" :loading="testLoading" as="router-link" to="/" variant="txt"
    theme="transparent">
    router-link</InkButton>
  <InkButton :disabled="testLoading" :loading="testLoading" variant="txt" theme="transparent">tw-btn-txt
  </InkButton>
  <InkButton :disabled="testLoading" :loading="testLoading" variant="txt" theme="gray">tw-btn-gray</InkButton>
  <InkButton :disabled="testLoading" :loading="testLoading" variant="txt" theme="info">tw-btn-info</InkButton>
  <InkButton :disabled="testLoading" :loading="testLoading" variant="txt" theme="primary">tw-btn-primary
  </InkButton>
  <InkButton :disabled="testLoading" :loading="testLoading" variant="txt" theme="outline-gray">tw-btn-outline-gray
  </InkButton>
  <InkButton :disabled="testLoading" :loading="testLoading" as="a" href="#" variant="txt"
    theme="primary">mini 100
  </InkButton>
</div>
<div><strong><i>- icon-txt</i></strong></div>
<div class="tw-flex tw-gap-1">
  <InkButton as="router-link" to="/" variant="txt" theme="transparent" :disabled="testLoading"
    :loading="testLoading"><i class="far fa-sliders-h"></i>loading</InkButton>
  <InkButton variant="txt" :disabled="testLoading" :loading="testLoading" theme="transparent"><i
      class="far fa-sliders-h"></i>loading</InkButton>
  <InkButton variant="txt" :disabled="testLoading" :loading="testLoading" theme="gray"><i
      class="far fa-sliders-h"></i>loading</InkButton>
  <InkButton variant="txt" :disabled="testLoading" :loading="testLoading" theme="info"><i
      class="far fa-sliders-h"></i>loading</InkButton>
  <InkButton variant="txt" :disabled="testLoading" :loading="testLoading" theme="primary"><i
      class="far fa-sliders-h"></i>loading</InkButton>
  <InkButton variant="txt" :disabled="testLoading" :loading="testLoading" theme="outline-gray"><i
      class="far fa-sliders-h"></i>loading</InkButton>
  <InkButton as="a" href="#" variant="txt" :disabled="testLoading" :loading="testLoading"
    theme="primary"><i class="far fa-sliders-h"></i>loading</InkButton>
</div>
```