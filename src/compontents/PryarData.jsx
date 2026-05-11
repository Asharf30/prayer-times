// ملف: prayerData.js
import fajrImage from "../images/صلاه الفجر.webp";
import dhuhrImage from "../images/صلاه الظهر.webp";
import asrImage from "../images/صلاه العصر.webp";
import maghribImage from "../images/صلاه المغرب.webp";
import ishaImage from "../images/صلاه العشاء.webp";

export const prayerCards = [
  {
    title: "صلاة الفجر",
    subtitle: "FAJR PRAYER",
    description: "صلاة ما قبل الشروق وبداية اليوم بطمأنينة.",
    image: fajrImage,
    Time: "05:30 AM",
    timingKey: "Fajr",
  },
  {
    title: "صلاة الظهر",
    subtitle: "DHUHR PRAYER",
    description: "صلاة منتصف اليوم بعد زوال الشمس.",
    image: dhuhrImage,
    Time: "12:00 PM",
    timingKey: "Dhuhr",
  },
  {
    title: "صلاة العصر",
    subtitle: "ASR PRAYER",
    description: "صلاة آخر النهار قبل الغروب.",
    image: asrImage,
    Time: "03:00 PM",
    timingKey: "Asr",
  },
  {
    title: "صلاة المغرب",
    subtitle: "MAGHRIB PRAYER",
    description: "صلاة وقت الغروب بعد أذان المغرب مباشرة.",
    image: maghribImage,
    Time: "06:00 PM",
    timingKey: "Maghrib",
  },
  {
    title: "صلاة العشاء",
    subtitle: "ISHA PRAYER",
    description: "صلاة الليل وختام الصلوات المفروضة في اليوم.",
    image: ishaImage,
    Time: "09:00 PM",
    timingKey: "Isha",
  },
];
