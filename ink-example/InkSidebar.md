```vue
// not use slot
  <InkSidebar
  :currentAppName="$t('sandwich')" 
  :currentMainSwitchItem="currentConsole?.console" 
  :mainSwitchItems="user.permission.map((item:Permission) => item.console)"
  @mainItemCheckSwitch="checkSwitchEnv"
  :menu="menu"
  :currentMenuItemId="checkCurrentMenuItemId"
  />
// use slot
  <InkSidebar 
  :currentAppName="trans('cabinet.name')" 
  :currentMainSwitchItem="currentTeam" 
  :mainSwitchItems="env.team"
  @mainItemCheckSwitch="checkSwitchEnv"
  @tabItemCheckSwitch="checkSwitchEnv"
  :menu="menu"
  :currentMenuItemId="checkCurrentMenuItemId"
  :currentTabSwitchItemId="env.workspace.console"
  :tabSwitchItems="consoleList"
  >
    <!-- 建立文章 -->
     <InkButton
      as="router-link"
      variant="txt"
      theme="primary"
      v-if="env.article_type.length === 1"
      :to="{
        name: 'article-create',
        query: {
          team_id: env.workspace.team,
          article_type: env.article_type[0].id,
        },
      }"
      class="nav__compose !tw-mt-4 tw-w-full tw-min-w-[36px]"
    >
      <i class="far fa-edit tw-text-base"></i>
      <InkSidebarSimpleHide>
        {{ trans('buttons.compose') }}
      </InkSidebarSimpleHide>
    </InkButton>
    <div v-else class="!tw-mt-4">
      <InkMenu
        class="tw-w-full"
      >
        <InkMenuButton>
          <InkButton
            variant="txt"
            theme="primary"
            class="tw-w-full nav__compose tw-min-w-[36px]"
          >
            <i class="far fa-edit tw-text-base"></i>
            <InkSidebarSimpleHide>
              {{ trans('buttons.compose') }}
            </InkSidebarSimpleHide>
          </InkButton>
        </InkMenuButton>
        <InkMenuItems
        class="tw-w-full"
        >
        <InkMenuItemsWrapper>
          <InkMenuItem
            v-slot="{ close }"
            class="tw-w-full"
            v-for="item in env.article_type"
            :key="item.id"
          >
            <router-link
              :to="{
                name: 'article-create',
                query: {
                  team_id: env.workspace.team,
                  article_type: item.id,
                },
              }"
            >
              <span
              class="tw-w-full"
              @click="close()"
              > 
                {{ item.name }} 
              </span>
            </router-link>
          </InkMenuItem>
          </InkMenuItemsWrapper> 
        </InkMenuItems>
      </InkMenu>
    </div>
  </InkSidebar>

  // menu array 參考 1
const menu = computed<MenuItemSchema[]>(() => [
      {
      id: 'deliveryArticle',
      icon: 'fa-file-waveform',
      name: $t('deliveryArticle'),
      children: [{
          id: 'deliveryArticleOverview',
          name: $t('overview'),
          route: {
            name: 'article-delivery-overview',
            query: {
              console_id: currentConsole?.value?.console?.id
            }
          },
          isAllow: basePermission.value,
        },{
          id: 'deliveryArticleList',
          name: $t('deliveryArticleList'),
          route: {
            name: 'article-delivery',
            query: {
              console_id: currentConsole?.value?.console?.id
            }
          },
          isAllow: basePermission.value,
        }],
    },
    {
      id: 'displayAdv',
      route: {
        name: 'display-adv',
        query: {
          console_id: currentConsole?.value?.console?.id
        }
      },
      icon: 'fa-rectangle-ad',
      name: $t('displayAdv'),
      isAllow: basePermission.value,
    },
    {
      id: 'setting',
      icon: 'fa-gear',
      name: $t('setting'),
      children: [{
        id: 'deliveryPosition',
        name: $t('deliveryPosition'),
        route: {
          name: 'position',
          query: {
            console_id: currentConsole?.value?.console?.id
          }
        },
        isAllow: currentConsoleUserPermission.value.manage,
      },{
        id: 'displayAdvType',
        name: $t('displayAdvType'),
        route: {
          name: 'adv-type',
          query: {
            console_id: currentConsole?.value?.console?.id
          }
        },
        isAllow: currentConsoleUserPermission.value.manage,
      }],
    },
]);

  // menu array 參考 2
  const menu = computed(() => [
    {
      id: uuid(),
      route: {name: 'article-list'},
      icon: 'fa-file',
      name: trans('cabinet.sidebar.menu.articles'),
      isAllow: articleAuth.isAllow,
    },
    {
      id: uuid(),
      route: {name: 'author-list'},
      icon: 'fa-users-cog',
      name: trans('cabinet.sidebar.menu.authors'),
      isAllow: authorAuth.isAllow,
    },
    {
      id: uuid(),
      url: 'categories-list',
      icon: 'fa-folder-open',
      name: trans('cabinet.sidebar.menu.categories'),
      children: globalStore.env.term_type?.map(({id, name, slug}) => {
        return {
          id,
          name,
          slug,
          route: {
            name: 'term-list',
            params: {slug},
            query: {team_id: globalStore.env.workspace.team},
          },
          isAllow: termAuth.isAllow,
        };
      }),
    },
  ]);
```