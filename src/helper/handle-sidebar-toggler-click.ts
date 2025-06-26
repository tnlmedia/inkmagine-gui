import Cookies from 'js-cookie';

export const handleSidebarTogglerClick = (): void => {
  const isDesktop:boolean = window.innerWidth > 1024;

  document.body.classList.toggle(isDesktop ? 'sidebar-folded' : 'sidebar-open');

  if (isDesktop) {
    const isFolded = document.body.classList.contains('sidebar-folded') ? '1' : '0';
    Cookies.set('sidebar-folded', isFolded);
  }
};
