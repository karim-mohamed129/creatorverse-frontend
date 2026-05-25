import { useEffect } from "react";
import type { Lang } from "./Header";

export const isArabicLang = (lang?: Lang) => lang === "ar";

export const uiText = {
  en: {
    seeMore: "See More",
    readMore: "Read More",
    back: "BACK",
    backToMenu: "Back to menu",
    notifications: "Notifications",
    cart: "Cart",
    toggleNavigation: "Toggle navigation",
    userName: "User Name",
    userAccount: "User Account",
    creatorAccount: "Creator Account",
    dashboard: "MY DASHBOARD",
    creatorDashboard: "DASHBOARD",
    accountSettings: "ACCOUNT SETTINGS",
    favourites: "MY FAVOURITES",
    readingList: "MY READING LIST",
    content: "CONTENT",
    commentsReply: "COMMENTS REPLY",
    notificationsMenu: "NOTIFICATIONS",
    lightMode: "LIGHT MODE",
    language: "LANGUAGE",
    orders: "MY ORDERS",
    subscription: "SUBSCRIPTION",
    about: "ABOUT US",
    faqs: "FAQs",
    terms: "TERMS AND CONDITIONS",
    privacy: "PRIVACY POLICY",
    switchToCreator: "SWITCH TO CREATOR",
    switchToUser: "SWITCH TO USER",
    logout: "LOG OUT",
    creatorName: "CREATOR NAME",
    creatorByline: "CREATOR NAME",
    title: "THE TITLE",
    manga: "MANGA",
    bio: "BIO",
    giftBadge: "GIFT A BADGE",
    series: "SERIES",
    status: "STATUS",
    contact: "CONTACT",
    chapter: "CHAPTER",
    episodeName: "Episode Name",
    chapterOne: "CHAPTER 1",
    serieTitle: "SERIE TITLE",
    loading: "Loading...",
    loadMore: "LOAD MORE",
    filterBy: "Filter BY",
    sortBy: "Sort BY",
    highToLow: "HIGH TO LOW",
    all: "All",
    recent: "RECENT",
    oldest: "OLDEST",
    ongoing: "ONGOING",
    completed: "COMPLETED",
    popular: "POPULAR",
    badge: "Badge",
    shop: "SHOP",
    noDataFound: "No data found",
    viewCart: "VIEW CART",
    myCart: "MY CART",
    cartEmpty: "Your cart is empty",
    backToShop: "BACK TO SHOP",
    cartTotal: "Cart Total:",
    totalItems: "Total Items:",
    clearCart: "CLEAR CART",
    productName: "Product Name",
    quantity: "Quantity",
    availability: "Availability",
    price: "Price",
    total: "Total",
    action: "ACTION",
    availableNow: "Available Now",
    outOfStock: "Out of Stock",
    remove: "Remove",
    checkout: "CHECK OUT",
    subscribed: "Subscribed",
    totalCosts: "Total Costs",
    totalQuantity: "Total Quantity",
    subTotal: "Sub Total",
    discount: "Discount",
    grandTotal: "Grand Total",
    couponCode: "Coupon Code",
    getDiscount: "Get A Discount",
    apply: "Apply",
    applied: "Applied",
    payNow: "PAY NOW",
    orderSuccess: "Order Successful",
    confirmClearCart: "Are you sure you want to clear the cart?",
    lowToHigh: "LOW TO HIGH",
    badges: "Badges",
    addToCart: "ADD TO CART",
    badgeBundle: "Badge bundle",
    bundleOf5Badges: "Bundle of 5 Badges",
  },
  ar: {
    seeMore: "عرض المزيد",
    readMore: "اقرأ المزيد",
    back: "رجوع",
    backToMenu: "العودة إلى القائمة",
    notifications: "الإشعارات",
    cart: "السلة",
    toggleNavigation: "فتح القائمة",
    userName: "اسم المستخدم",
    userAccount: "حساب مستخدم",
    creatorAccount: "حساب مبدع",
    dashboard: "لوحة التحكم",
    creatorDashboard: "لوحة التحكم",
    accountSettings: "إعدادات الحساب",
    favourites: "مفضلتي",
    readingList: "قائمة القراءة",
    content: "المحتوى",
    commentsReply: "ردود التعليقات",
    chaptersComments: "تعليقات الفصول",
    notificationsMenu: "الإشعارات",
    lightMode: "الوضع الفاتح",
    language: "اللغة",
    orders: "طلباتي",
    subscription: "الاشتراك",
    about: "من نحن",
    faqs: "الأسئلة الشائعة",
    terms: "الشروط والأحكام",
    privacy: "سياسة الخصوصية",
    switchToCreator: "التحويل إلى مبدع",
    switchToUser: "التحويل إلى مستخدم",
    logout: "تسجيل الخروج",
    creatorName: "اسم المبدع",
    creatorByline: "اسم المبدع",
    title: "عنوان المانجا",
    manga: "مانجا",
    bio: "نبذة",
    giftBadge: "إهداء شارة",
    series: "السلاسل",
    status: "الحالة",
    contact: "التواصل",
    chapter: "الفصل",
    episodeName: "اسم الحلقة",
    chapterOne: "الفصل ١",
    serieTitle: "عنوان السلسلة",
    loading: "جاري التحميل...",
    loadMore: "تحميل المزيد",
    filterBy: "تصفية حسب",
    sortBy: "ترتيب حسب",
    highToLow: "من الأعلى إلى الأقل",
    all: "الكل",
    recent: "الأحدث",
    oldest: "الأقدم",
    ongoing: "مستمر",
    completed: "مكتمل",
    popular: "الأكثر رواجًا",
    badge: "شارة",
    shop: "المتجر",
    noDataFound: "لا توجد بيانات",
    viewCart: "عرض السلة",
    myCart: "سلة التسوق",
    cartEmpty: "سلة التسوق فارغة",
    backToShop: "العودة للمتجر",
    cartTotal: "إجمالي السلة:",
    totalItems: "عدد العناصر:",
    clearCart: "إفراغ السلة",
    productName: "اسم المنتج",
    quantity: "الكمية",
    availability: "التوفر",
    price: "السعر",
    total: "الإجمالي",
    action: "الإجراء",
    availableNow: "متاح الآن",
    outOfStock: "غير متوفر",
    remove: "إزالة",
    checkout: "إتمام الدفع",
    subscribed: "تم الاشتراك",
    totalCosts: "إجمالي التكاليف",
    totalQuantity: "إجمالي الكمية",
    subTotal: "المجموع الفرعي",
    discount: "الخصم",
    grandTotal: "الإجمالي النهائي",
    couponCode: "رمز القسيمة",
    getDiscount: "احصل على خصم",
    apply: "تطبيق",
    applied: "مطبّق",
    payNow: "ادفع الآن",
    orderSuccess: "تم الطلب بنجاح",
    confirmClearCart: "هل أنت متأكد من إفراغ السلة؟",
    lowToHigh: "من الأقل إلى الأعلى",
    badges: "شارات",
    rating: "التقييم",
    giveARate: "أعطِ تقييماً!",
    cancel: "إلغاء",
    submit: "إرسال",
    increaseQuantity: "زيادة الكمية",
    decreaseQuantity: "تقليل الكمية",
    category: "التصنيف",
    rate: "التقييم",
    rateNow: "قيّم الآن",
    description: "الوصف",
    noDescription: "لا يوجد وصف.",
    reviews: "المراجعات",
    leaveAReview: "اترك مراجعة!",
    writeHere: "اكتب هنا....",
    writeYourReply: "اكتب ردك...",
    reply: "رد",
    showMoreComments: "عرض المزيد من التعليقات",
    addToCart: "أضف إلى السلة",
    badgeBundle: "حزمة شارات",
    bundleOf5Badges: "حزمة من ٥ شارات",
  },
} as const;

export const tUi = (lang: Lang | undefined, key: keyof typeof uiText.en) =>
  uiText[isArabicLang(lang) ? "ar" : "en"][key];

const literalArabic: Record<string, string> = {

  "SUBSCRIBE TO SHOW YOUR SUPPORT": "اشترك لإظهار دعمك",
  "33K VIEWS": "33K مشاهدة",
  "10K LIKE": "10K إعجاب",
  "10K LIKES": "10K إعجاب",
  "10 COMMENTS": "10 تعليقات",
  "Sat 15 . Oct": "السبت 15 أكتوبر",
  "Sat 15 . Oct 2025": "السبت 15 أكتوبر 2025",
  "15 . Oct 2025": "15 أكتوبر 2025",
  "Episode view toggle": "تبديل عرض الحلقات",
  "Grid view": "عرض الشبكة",
  "List view": "عرض القائمة",
  "YOU MAY ALSO LIKE": "قد يعجبك أيضًا",
  "GIVE A RATE!": "أضف تقييمك!",
  "Follow Now": "تابع الآن",
  "GIFT": "إهداء",
  "GET": "احصل عليه",
  "No comments yet.": "لا توجد تعليقات بعد.",
  "Show More Comments": "عرض المزيد من التعليقات",
  BACK: uiText.ar.back,
  Back: uiText.ar.back,
  back: uiText.ar.back,
  BIO: uiText.ar.bio,
  Bio: uiText.ar.bio,
  bio: uiText.ar.bio,
  "GIFT A BADGE": uiText.ar.giftBadge,
  "Gift A Badge": uiText.ar.giftBadge,
  "Gift a Badge": uiText.ar.giftBadge,
  MANGA: uiText.ar.manga,
  Manga: uiText.ar.manga,
  "MY DASHBOARD": uiText.ar.dashboard,
  DASHBOARD: uiText.ar.creatorDashboard,
  "ACCOUNT SETTINGS": uiText.ar.accountSettings,
  "MY FAVOURITES": uiText.ar.favourites,
  "MY FAVORITES": uiText.ar.favourites,
  "MY READING LIST": uiText.ar.readingList,
  "READING LIST": uiText.ar.readingList,
  CONTENT: uiText.ar.content,
  "ALL CHAPTERS": "كل الفصول",
  "NEW CHAPTER": "فصل جديد",
  "NEW CONTENT": "محتوى جديد",
  NOTIFICATIONS: uiText.ar.notificationsMenu,
  "COMMENTS REPLY": uiText.ar.commentsReply,
  "MY ORDERS": uiText.ar.orders,
  SUBSCRIPTION: uiText.ar.subscription,
  "ABOUT US": uiText.ar.about,
  FAQs: uiText.ar.faqs,
  "TERMS AND CONDITIONS": uiText.ar.terms,
  "PRIVACY POLICY": uiText.ar.privacy,
  "UPDATE PROFILE": "تحديث الملف الشخصي",
  "UPDATE PASSWORD": "تحديث كلمة المرور",
  SETTINGS: "الإعدادات",
  COMMENTS: "التعليقات",
  "LEAVE A REVIEW!": "اترك مراجعة",
  SUBMIT: "إرسال",
  CANCEL: "إلغاء",
  "SAVE CHANGES": "حفظ التغييرات",
  "LOAD MORE": uiText.ar.loadMore,
  "SEE MORE": uiText.ar.seeMore,
  "READ MORE": uiText.ar.readMore,
  "RELATED EPISODES": "حلقات ذات صلة",
  BADGES: "الشارات",
  SHOP: "المتجر",
  "MY CART": "سلتي",
"Newest": "الأحدث",
  CHECKOUT: "الدفع",
  REVIEWS: "المراجعات",
  "CHAPTERS COMMENTS LIST": "قائمة تعليقات الفصول",
  "COMMENTS LIST": "قائمة التعليقات",
  "ORDER DETAILS": "تفاصيل الطلب",
  "PROFILE DETAILS": "تفاصيل الملف الشخصي",
  "RESET PASSWORD": "إعادة تعيين كلمة المرور",
  "FAVORITE LIST": "قائمة المفضلة",
  "USER STATUS": "حالة المستخدم",
  "Creator Work Status": "حالة عمل المبدع",
  "Creator Profile": "ملف المبدع",
  "USER INFORMATION": "معلومات المستخدم",
  "User Name": uiText.ar.userName,
  "Series Read": "السلاسل المقروءة",
  "Badges Bought": "الشارات المشتراة",
  "Badges Given": "الشارات المُهداه",
  Comments: "التعليقات",
  "No of Badges": "عدد الشارات",
  "Total Content": "إجمالي المحتوى",
  "Publish Content": "المحتوى المنشور",
  "Pending Content": "المحتوى المعلق",
  "Total Chapters": "إجمالي الفصول",
  "Published Chapters": "الفصول المنشورة",
  "Pending Chapters": "الفصول المعلقة",
  "Payment Status": "حالة الدفع",
  "Total Costs": "إجمالي التكاليف",
  "Coupon Code": "رمز القسيمة",
  "Grand Total": "الإجمالي النهائي",
  "Total Quantity": "إجمالي الكمية",
  "sub total": "المجموع الفرعي",
  "Content Information": "معلومات المحتوى",
  "Upload Your Content": "ارفع محتواك",
  "Add Your Comment": "أضف تعليقك",
  "Creator Bio": "نبذة المبدع",
  "Banner Photos": "صور الغلاف",
  "Available Quantity": "الكمية المتاحة",
  "Available Now": "متاح الآن",
  "No results found.": "لا توجد نتائج.",
  "No creators found.": "لا يوجد مبدعون.",
  "Select All": "تحديد الكل",
  Delete: "حذف",
  View: "عرض",
  Edit: "تعديل",
  Remove: "إزالة",
  Cancel: "إلغاء",
  Apply: "تطبيق",
  "Mark As Read": "تمييز كمقروء",
  "View Order": "عرض الطلب",
  "Download PDF": "تحميل PDF",
  "CONTINUE READING": "متابعة القراءة",
  "CHECK OUT": "إتمام الدفع",
  "PAY NOW": "ادفع الآن",
  "ADD TO CART": "أضف إلى السلة",
  "VIEW CART": "عرض السلة",
  "BUY NOW": "اشتر الآن",
  "Rate Now": "قيّم الآن",
  "SIGN UP NOW": "سجّل الآن",
  LOGIN: "تسجيل الدخول",
  "FORGOT PASSWORD": "نسيت كلمة المرور",
  "Filter BY": "تصفية حسب",
  "Sort BY": "ترتيب حسب",
  "HIGH TO LOW": "من الأعلى إلى الأقل",
  "LOW TO HIGH": "من الأقل إلى الأعلى",
  ALL: "الكل",
  UNREAD: "غير مقروء",
  STATUS: "الحالة",
  CONTACT: "التواصل",
  TITLE: "العنوان",
  AMOUNT: "المبلغ",
  ACTION: "الإجراء",
  ID: "المعرف",
  DATE: "التاريخ",
  COMMENT: "تعليق",
  "COMMENT BY": "المعلّق",
  REPLY: "الرد",
  REPLYS: "الردود",
  "SERIE NAME": "اسم السلسلة",
  "CHAPTER NAME": "اسم الفصل",
  "CHAPTER TITTLE": "عنوان الفصل",
  "CHAPTER TITLE": "عنوان الفصل",
  "Chapter 1": "الفصل ١",
  "CHAPTER NUMBER": "رقم الفصل",
  "COVER PHOTO": "صورة الغلاف",
  NAME: "الاسم",
  ACCESS: "الوصول",
  PUBLIC: "عام",
  MEMBERS: "الأعضاء",
  APPROVAL: "الموافقة",
  PUBLISHED: "منشور",
  "100 Items": "١٠٠ عنصر",
  "MOST BADGES": "الأكثر شارات",
  "View Comments": "عرض التعليقات",
  "ADD A NEW CHAPTER": "إضافة فصل جديد",
  "ADD NEW CHAPTER": "إضافة فصل جديد",
  "ADD NEW CONTENT": "إضافة محتوى جديد",
  "Approval Schedule": "جدولة الموافقة",
  "Product Name": "اسم المنتج",
  "PRODUCT NAME": "اسم المنتج",
  Quantity: "الكمية",
  QUANTITY: "الكمية",
  Availability: "التوفر",
  Price: "السعر",
  PRICE: "السعر",
  Total: "الإجمالي",
  "Cart Total:": "إجمالي السلة:",
  "Total Items:": "عدد العناصر:",
  "Bundle of 5 Badges": "حزمة من ٥ شارات",
  "Bundles of 5 Badges": "حزمة من ٥ شارات",
  "Badge bundle": "حزمة شارات",
  "THE TITLE": "عنوان المانجا",
  "THE TITTLE": "عنوان المانجا",
  "Blog Name": "اسم المقال",
  "BLOG NAME": "اسم المقال",
  "Episode Name": "اسم الحلقة",
  "CREATOR NAME": "اسم المبدع",
  "CREATOR'S NAME": "اسم المبدع",
  "Creator Name": "اسم المبدع",
  "Creator's Corner": "ركن المبدعين",
  "SERIE TITLE": "عنوان السلسلة",
  "SERIE TITTLE": "عنوان السلسلة",
  SERIES: "السلاسل",
  EPISODES: "الحلقات",
  RATING: "التقييم",
  FOLLOWERS: "المتابعون",
  DISCRIPTION: "الوصف",
  Description: "الوصف",
  Discription: "الوصف",
  HISTORY: "السجل",
  "Your Plan": "خطتك",
  Weekly: "أسبوعي",
  Active: "نشط",
  "Weekly Plan": "الخطة الأسبوعية",
  "Monthly Plan": "الخطة الشهرية",
  "A sneek peek of our content is available with this subscription plan.": "لمحة سريعة من محتوانا متاحة ضمن هذه الخطة.",
  "Fans who occasionally check out our site will benefit from this subscription plan.": "هذه الخطة مناسبة للقراء الذين يتابعون الموقع من وقت لآخر.",
  "To view all of our features, please subscribe to our website today. We offer avariety of plans to meet your needs": "للاطلاع على جميع الميزات، اشترك في موقعنا اليوم. نوفر خططًا متنوعة تناسب احتياجاتك.",
  "Per Week": "في الأسبوع",
  "Per Month": "في الشهر",
  "SUBSCRIPTION PLANS": "خطط الاشتراك",
  "SUBSCRIPTION DATE": "تاريخ الاشتراك",
  "AUTORENEWAL DATE": "تاريخ التجديد التلقائي",
  Image: "الصورة",
  Sku: "رمز المنتج",
  Show: "عرض",
  Items: "عناصر",
  "Enter Your Password": "أدخل كلمة المرور",
  "Confirm Your Password": "أكّد كلمة المرور",
  "Chapter Name": "اسم الفصل",
  "Serie Name": "اسم السلسلة",
  "Add A Summary": "أضف ملخصًا",
  "Add Your URL": "أضف الرابط",
  "About Your Experience": "عن تجربتك",
  "Get A Discount": "احصل على خصم",
  "Write Here.........": "اكتب هنا.........",
  "Paste GIF URL": "ألصق رابط GIF",
  "Add": "إضافة",
  "Tags": "الوسوم",
  "Genre": "النوع",
  "Language*": "اللغة*",
  "Members Only": "للأعضاء فقط",
  Public: "عام",
  Published: "منشور",
  Unpublished: "غير منشور",
  Pending: "قيد الانتظار",
  "Separate your tags with a space": "افصل الوسوم بمسافة",
  "Separate your genre with a space": "افصل الأنواع بمسافة",
  "SHARE THIS SERIES AND SUPPORT THE CREATOR": "شارك هذه السلسلة وادعم المبدع",
  "Get to Know the Creator": "تعرّف إلى المبدع",
  "Creator's Comment": "تعليق المبدع",
  Like: "إعجاب",
  Report: "إبلاغ",
  Reply: "رد",
  "Next page": "الصفحة التالية",
  "Previous page": "الصفحة السابقة",
  "Next episode": "الحلقة التالية",
  "Close expanded reader": "إغلاق القارئ الموسع",
};

export const localizeLiteral = (lang: Lang | undefined, value: string) => {
  if (!isArabicLang(lang)) return value;
  return literalArabic[value.trim()] ?? value;
};

const translateValue = (value: string) => {
  const trimmed = value.trim();
  const translated = literalArabic[trimmed];
  if (!translated) return value;
  return value.replace(trimmed, translated);
};

const originalTextNodes = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<HTMLElement, Map<string, string>>();

const translateNode = (node: Node) => {
  if (node.nodeType === Node.TEXT_NODE && node.textContent) {
    const textNode = node as Text;
    const originalText = originalTextNodes.get(textNode) ?? textNode.textContent;
    const translated = translateValue(originalText);
    if (translated !== originalText && !originalTextNodes.has(textNode)) {
      originalTextNodes.set(textNode, originalText);
    }
    if (translated !== node.textContent) node.textContent = translated;
    return;
  }

  if (!(node instanceof HTMLElement)) return;
  if (["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "PATH"].includes(node.tagName)) return;

  ["placeholder", "aria-label", "title", "alt"].forEach((attr) => {
    const value = node.getAttribute(attr);
    if (!value) return;
    let originalMap = originalAttributes.get(node);
    const originalValue = originalMap?.get(attr) ?? value;
    const translated = translateValue(originalValue);
    if (translated !== originalValue) {
      if (!originalMap) {
        originalMap = new Map<string, string>();
        originalAttributes.set(node, originalMap);
      }
      if (!originalMap.has(attr)) originalMap.set(attr, originalValue);
    }
    if (translated !== value) node.setAttribute(attr, translated);
  });

  node.childNodes.forEach(translateNode);
};

const restoreNode = (node: Node) => {
  if (node.nodeType === Node.TEXT_NODE) {
    const textNode = node as Text;
    const originalText = originalTextNodes.get(textNode);
    if (originalText !== undefined && textNode.textContent !== originalText) {
      textNode.textContent = originalText;
    }
    return;
  }

  if (!(node instanceof HTMLElement)) return;
  if (["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "PATH"].includes(node.tagName)) return;

  const originalMap = originalAttributes.get(node);
  originalMap?.forEach((value, attr) => {
    if (node.getAttribute(attr) !== value) node.setAttribute(attr, value);
  });

  node.childNodes.forEach(restoreNode);
};

export const useArabicDomTranslator = (lang: Lang | undefined) => {
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (!isArabicLang(lang)) {
      restoreNode(document.body);
      return;
    }

    translateNode(document.body);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(translateNode);
        if (mutation.type === "characterData") translateNode(mutation.target);
        if (mutation.type === "attributes") translateNode(mutation.target);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "aria-label", "title", "alt"],
    });

    return () => observer.disconnect();
  }, [lang]);
};
