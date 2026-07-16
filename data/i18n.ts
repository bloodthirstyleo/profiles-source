export type Locale = "en" | "vi";

export const messagesByLocale = {
  en: {
    nav: { brand: "Portfolio.", home: "Home", about: "About", portfolio: "Portfolio", contact: "Contact" },
    common: { language: "Language", theme: "Theme", dark: "Dark", light: "Light", close: "Close", visitSite: "Visit Site" },
    actions: {
      themeLight: "Light mode",
      themeDark: "Dark mode",
      switchToEnglish: "English",
      switchToVietnamese: "Vietnamese",
      close: "Close",
      visitSite: "Visit Site",
      moreAbout: "More About Me",
      sendMessage: "Send Message",
      sending: "Sending...",
    },
    hero: {
      eyebrow: "Welcome to my space",
      greeting: "Hi, I'm",
      prefix: "Hi, I'm",
      rolePrefix: "I'm a",
      introFallback: "Full Stack Developer building scalable and high-performance web applications with modern technologies.",
      fallbackIntro: "Full Stack Developer building scalable and high-performance web applications with modern technologies.",
      cta: "More About Me",
    },
    section: { worksBig: "works", worksNormal: "portfolio", worksColor: "my", contactBig: "contact", contactNormal: "get in", contactColor: "me" },
    about: {
      bigTitle: "resume", normalTitle: "about", colorTitle: "me", personalInfo: "Personal Info", downloadCv: "Download CV",
      references: "References", referenceTitle: "Reference contact", coreTechnologies: "Core Technologies", skills: "Skills Proficiency",
      experienceEducation: "Experience & Education", workExperience: "Work Experience", educationTimeline: "Education Timeline",
      project: "Project", repo: "Summary", stack: "Stack",
    },
    portfolio: {
      all: "All", details: "Project details", project: "Project", client: "Client", role: "Role", teamSize: "Team size", date: "Date",
      stack: "Stack", features: "Features delivered", technologies: "Technologies", description: "Description", demo: "Open demo",
      source: "Source code", solo: "Solo / contract delivery", openDetails: "Open project details",
    },
    contact: {
      title: "Don't be shy!", heading: "Don't be shy!",
      intro: "Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
      address: "Address Point", email: "Mail Me", phone: "Call Me", namePlaceholder: "YOUR NAME", emailPlaceholder: "YOUR EMAIL",
      subjectPlaceholder: "YOUR SUBJECT", messagePlaceholder: "YOUR MESSAGE", send: "Send Message", sending: "Sending...",
      success: "Message sent successfully!", error: "Could not send message. Please try again later.", missingKey: "Contact form is missing Web3Forms access key.",
    },
  },
  vi: {
    nav: { brand: "Ho so.", home: "Trang chu", about: "Gioi thieu", portfolio: "Du an", contact: "Lien he" },
    common: { language: "Ngon ngu", theme: "Giao dien", dark: "Toi", light: "Sang", close: "Dong", visitSite: "Mo website" },
    actions: {
      themeLight: "Giao dien sang",
      themeDark: "Giao dien toi",
      switchToEnglish: "Tieng Anh",
      switchToVietnamese: "Tieng Viet",
      close: "Dong",
      visitSite: "Mo website",
      moreAbout: "Xem them ve toi",
      sendMessage: "Gui tin nhan",
      sending: "Dang gui...",
    },
    hero: {
      eyebrow: "Chao mung den voi khong gian cua toi",
      greeting: "Xin chao, toi la",
      prefix: "Xin chao, toi la",
      rolePrefix: "Toi la",
      introFallback: "Full Stack Developer xay dung ung dung web co kha nang mo rong va hieu nang cao bang cong nghe hien dai.",
      fallbackIntro: "Full Stack Developer xay dung ung dung web co kha nang mo rong va hieu nang cao bang cong nghe hien dai.",
      cta: "Xem them ve toi",
    },
    section: { worksBig: "du an", worksNormal: "danh muc", worksColor: "cua toi", contactBig: "lien he", contactNormal: "ket noi", contactColor: "voi toi" },
    about: {
      bigTitle: "ho so", normalTitle: "ve", colorTitle: "toi", personalInfo: "Thong tin ca nhan", downloadCv: "Tai CV",
      references: "Nguoi gioi thieu", referenceTitle: "Lien he tham chieu", coreTechnologies: "Cong nghe chinh", skills: "Ky nang",
      experienceEducation: "Kinh nghiem & Hoc van", workExperience: "Kinh nghiem lam viec", educationTimeline: "Qua trinh hoc tap",
      project: "Du an", repo: "Tom tat", stack: "Cong nghe",
    },
    portfolio: {
      all: "Tat ca", details: "Chi tiet du an", project: "Du an", client: "Khach hang", role: "Vai tro", teamSize: "Quy mo doi ngu", date: "Thoi gian",
      stack: "Cong nghe", features: "Tinh nang da lam", technologies: "Cong nghe", description: "Mo ta", demo: "Mo demo",
      source: "Ma nguon", solo: "Ca nhan / hop dong", openDetails: "Mo chi tiet du an",
    },
    contact: {
      title: "Dung ngai lien he!", heading: "Dung ngai lien he!",
      intro: "Hay lien he neu ban muon trao doi ve du an moi, y tuong san pham hoac co hoi hop tac.",
      address: "Dia chi", email: "Email", phone: "Dien thoai", namePlaceholder: "HO TEN", emailPlaceholder: "EMAIL",
      subjectPlaceholder: "CHU DE", messagePlaceholder: "NOI DUNG", send: "Gui tin nhan", sending: "Dang gui...",
      success: "Tin nhan da duoc gui!", error: "Khong gui duoc tin nhan. Vui long thu lai sau.", missingKey: "Form lien he chua co Web3Forms access key.",
    },
  },
};

export type Messages = typeof messagesByLocale.en;
