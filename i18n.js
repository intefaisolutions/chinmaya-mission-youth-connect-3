(function () {
  var STORAGE_KEY = "chinmay_doot_lang";

  var translations = {
    en: {
      langBtn: "हिं",
      mobileTopLabel: "Chinmay Doot · Free Camp",
      registerShort: "Register Now",
      registerBtn: "Register",
      orgLabel: "Chinmaya Mission, Indore",
      eyebrow: "Learn Advaita Vedanta in Guru Parampara Ashram",
      brandTitle: "Chinmay Doot Youth Camp",
      headline:
        'Free 5-day residential camp — <span class="accent">Advaita Vedanta</span>',
      credit:
        "Once in a lifetime opportunity to stay in the presence of a Guru and learn profound Vedanta",
      subcopy:
        "Transformative 5 days for your own self — to discover your True Self through Vedantic wisdom and sadhana at Chinmaya Sharanam Ashram.",
      jumpCta: "Register free · Last date 15 Sept",
      metaWhen: "When",
      metaWhenVal: "28 Sept – 2 Oct 2026",
      metaFor: "For",
      metaForVal: "Ages 18–30",
      metaVenue: "Venue",
      metaVenueVal: "Chinmaya Sharanam Ashram",
      metaCamp: "Camp",
      metaCampVal: "Completely free",
      presence: "In the presence of",
      swamijiName: "Swami Prabuddhananda Saraswati",
      swamijiRole: "Acharya and Vedanta Scholar",
      whatYouGet: "What you will get",
      reason1:
        "Learn Tatva Bodh, Yoga & Meditation, chanting Suktam and Stotras, Havan and Puja, cultural evenings, group discussions and games",
      reason2: "Get to know yourself and gain clarity for life",
      reason3: "Journey of Self-Realisation with Vedantic wisdom and sadhana",
      reason4: "Secret of happiness and peace",
      reason5:
        "Transformative 5 days in a positive atmosphere with sattvic living",
      reason6: "Q&A sessions with Swami Prabuddhananda Saraswati Ji",
      feeNote:
        "<strong>Camp is free.</strong> A refundable amount of <strong>₹1,100</strong> is collected at registration and fully returned after successful completion of the course. Includes accommodation, food, sessions &amp; camp kit. Last date: <strong>15 September 2026</strong>.",
      closing:
        "Take 5 days for yourself — know yourself, understand yourself, and begin the journey toward your True Self.",
      enquiries: "Enquiries:",
      enquiriesHariom: "Enquiries (Hariom Pandey):",
      venueLabel: "Venue:",
      venueFull:
        "Chinmaya Sharanam Ashram, Scheme No. 78, Slice 2, Sector-B, Vijay Nagar, Indore, Madhya Pradesh 452010",
      formHint: "Form stays in English for accurate registration.",
    },
    hi: {
      langBtn: "EN",
      mobileTopLabel: "चिन्मय दूत · निःशुल्क शिविर",
      registerShort: "अभी रजिस्टर करें",
      registerBtn: "रजिस्टर",
      orgLabel: "चिन्मय मिशन, इंदौर",
      eyebrow: "अद्वैत वेदांत सीखें गुरु परंपरा आश्रम में",
      brandTitle: "चिन्मय दूत यूथ कैंप",
      headline:
        'निःशुल्क 5 दिवसीय आवासीय शिविर — <span class="accent">अद्वैत वेदांत</span>',
      credit:
        "जीवन में एक बार मिलने वाला अवसर — गुरु के सान्निध्य में रहकर गहन वेदांत का अध्ययन करें।",
      subcopy:
        "अपने लिए 5 दिन निकालिए — स्वयं को जानिए, स्वयं को समझिए और अपने वास्तविक स्वरूप की ओर परिवर्तन की यात्रा शुरू कीजिए। चिन्मय शरणम् आश्रम में वेदांतिक ज्ञान एवं साधना के साथ।",
      jumpCta: "निःशुल्क रजिस्टर · अंतिम तिथि 15 सितंबर",
      metaWhen: "दिनांक",
      metaWhenVal: "28 सितंबर – 2 अक्टूबर 2026",
      metaFor: "आयु सीमा",
      metaForVal: "18–30 वर्ष",
      metaVenue: "स्थान",
      metaVenueVal: "चिन्मय शरणम् आश्रम",
      metaCamp: "शिविर",
      metaCampVal: "पूर्णतः निःशुल्क",
      presence: "सान्निध्य में",
      swamijiName: "स्वामी प्रबुद्धानंद सरस्वती जी",
      swamijiRole: "आचार्य एवं वेदांत विद्वान",
      whatYouGet: "आपको क्या मिलेगा?",
      reason1:
        "तत्त्वबोध, योग एवं ध्यान, सूक्तम् एवं स्तोत्रों का जप, हवन एवं पूजा, सांस्कृतिक संध्याएँ, समूह चर्चा एवं खेल",
      reason2: "स्वयं को जानने और जीवन में स्पष्टता प्राप्त करने का अवसर",
      reason3: "वेदांतिक ज्ञान एवं साधना के माध्यम से आत्म-साक्षात्कार की यात्रा",
      reason4: "सुख एवं शांति का रहस्य",
      reason5:
        "सकारात्मक वातावरण एवं सात्त्विक जीवनशैली में परिवर्तनकारी 5 दिन",
      reason6: "स्वामी प्रबुद्धानंद सरस्वती जी के साथ प्रश्नोत्तर सत्र (Q&A)",
      feeNote:
        "<strong>शिविर निःशुल्क है।</strong> पंजीकरण पर <strong>₹1,100</strong> की राशि ली जाती है, जो कोर्स सफलतापूर्वक पूरा करने के बाद पूरी तरह वापस कर दी जाती है। इसमें आवास, भोजन, सत्र एवं कैंप किट शामिल हैं। अंतिम तिथि: <strong>15 सितंबर 2026</strong>।",
      closing:
        "अपने लिए 5 दिन निकालिए — स्वयं को जानिए, स्वयं को समझिए और अपने वास्तविक स्वरूप की ओर परिवर्तन की यात्रा शुरू कीजिए।",
      enquiries: "पूछताछ:",
      enquiriesHariom: "पूछताछ (हरिओम पांडेय):",
      venueLabel: "स्थान:",
      venueFull:
        "चिन्मय शरणम् आश्रम, स्कीम नं. 78, स्लाइस 2, सेक्टर-बी, विजय नगर, इंदौर, मध्य प्रदेश 452010",
      formHint: "सटीक पंजीकरण के लिए फॉर्म अंग्रेज़ी में ही रहेगा।",
    },
  };

  function getLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "hi" ? "hi" : "en";
    } catch (err) {
      return "en";
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {}
    applyLang(lang);
  }

  function applyLang(lang) {
    var dict = translations[lang] || translations.en;
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
    document.body.classList.toggle("lang-hi", lang === "hi");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (dict[key] != null) el.innerHTML = dict[key];
    });

    document.querySelectorAll(".lang-toggle").forEach(function (btn) {
      btn.textContent = dict.langBtn;
      btn.setAttribute(
        "aria-label",
        lang === "hi" ? "Switch to English" : "हिंदी में देखें"
      );
    });
  }

  function toggleLang() {
    setLang(getLang() === "hi" ? "en" : "hi");
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(getLang());
    var btn = document.getElementById("lang-toggle");
    var btnMobile = document.getElementById("lang-toggle-mobile");
    if (btn) btn.addEventListener("click", toggleLang);
    if (btnMobile) btnMobile.addEventListener("click", toggleLang);
  });
})();
