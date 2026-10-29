/**
 * All user-facing Persian text lives here, so wording stays consistent
 * and is easy to review in one place.
 */
export const fa = {
  app: {
    name: 'اپتیووس',
    tagline: 'مدیریت ارتباط با مشتری',
    skipToContent: 'رفتن به محتوای اصلی',
  },
  nav: {
    label: 'ناوبری اصلی',
    dashboard: 'داشبورد',
    leads: 'سرنخ‌ها',
    categories: 'دسته‌بندی‌ها',
    analytics: 'تحلیل‌ها',
    activities: 'فعالیت‌ها',
    profile: 'پروفایل',
    comingSoon: 'به‌زودی',
    openMenu: 'باز کردن منو',
    closeMenu: 'بستن منو',
    collapseSidebar: 'جمع کردن نوار کناری',
    expandSidebar: 'باز کردن نوار کناری',
    sidebarShortcut: 'Ctrl+B',
  },
  theme: {
    label: 'پوسته',
    choose: 'انتخاب پوسته',
    light: 'روشن',
    dark: 'تیره',
    system: 'هماهنگ با سیستم',
  },
  account: {
    menu: 'منوی حساب کاربری',
  },
  pages: {
    dashboardDescription: 'نمای کلی سرنخ‌ها، پیگیری‌ها و کارهای پیش رو.',
    leadsDescription: 'فهرست، جستجو و مدیریت سرنخ‌ها.',
    categoriesDescription: 'دسته‌بندی‌هایی که سرنخ‌ها با آن‌ها گروه‌بندی می‌شوند.',
    analyticsDescription: 'نمودارهایی که از داده‌های واقعی سرنخ‌ها محاسبه می‌شوند.',
    activitiesDescription: 'تاریخچهٔ تغییرات سرنخ‌ها.',
    profileDescription: 'اطلاعات حساب و تنظیمات شما.',
  },
  placeholder: {
    title: 'این بخش در حال ساخت است',
    description: 'محتوای این صفحه در مراحل بعدی توسعه اضافه می‌شود.',
  },
  unavailable: {
    title: 'در دسترس نیست',
    activities:
      'بک‌اند هنوز امکان خواندن تاریخچهٔ فعالیت‌ها را ارائه نمی‌دهد. این بخش پس از اضافه شدن آن فعال می‌شود.',
  },
  notFound: {
    title: 'صفحه پیدا نشد',
    description: 'نشانی واردشده وجود ندارد یا جابه‌جا شده است.',
    backHome: 'بازگشت به داشبورد',
  },
  error: {
    title: 'خطایی رخ داد',
    description: 'نمایش این صفحه با مشکل روبه‌رو شد. دوباره تلاش کنید.',
    retry: 'تلاش دوباره',
  },
  common: {
    loading: 'در حال بارگذاری…',
  },
} as const;
