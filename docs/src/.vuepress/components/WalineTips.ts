import { usePageFrontmatter, useRouteLocale } from 'vuepress/client';
import { computed, defineComponent, h } from 'vue';

import type { VNode } from 'vue';
import type {
  ThemeProjectHomePageFrontmatter,
  ThemeNormalPageFrontmatter,
} from 'vuepress-theme-hope';

const i18n: Record<string, string> = {
  '/': '友情提示：评论区仅作评论展示，如有问题咨询请去 <a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> 中提问。',
  '/en/':
    'TIPS: The comment area is only for demo. If you have any questions, please go to <a href="https://github.com/walinejs/waline/discussions" target="_blank">Github Discussion</a> to ask.',
};

import './WalineTips.scss';

export default defineComponent({
  name: 'WalineTips',

  setup() {
    const frontmatter = usePageFrontmatter<
      ThemeProjectHomePageFrontmatter | ThemeNormalPageFrontmatter
    >();
    const routeLocale = useRouteLocale();

    const isHome = computed(() => frontmatter.value.home ?? false);
    const text = computed(() => i18n[routeLocale.value]);

    return (): VNode =>
      h(
        'div',
        { class: ['waline-tips-wrapper', { home: isHome.value }] },
        h('div', {
          class: 'waline-tips',
          innerHTML: text.value,
        }),
      );
  },
});
