# عربيات القاهرة

هذه النسخة مبنية على ملف `index.html` المرفق، مع استعادة ملفات المشروع التي يحتاجها، ومنها إعداد Supabase ومجلد الأغاني. أُضيف إلى زر الموسيقى مشغّل يقرأ قائمة `audio/playlist.json` ويشغّل ملفات الصوت الموجودة في `audio/`.

## الملفات

- `index.html`: اللعبة المرفقة مع واجهة اختيار الأغاني.
- `supabase-config.js`: إعداد الاتصال العام بـ Supabase للعب الجماعي.
- `audio/`: ملفات MP3 وقائمة التشغيل.
- `vercel.json`: إعداد النشر الثابت.
- `.github/workflows/update-audio-playlist.yml`: تحديث قائمة الأغاني تلقائيًا.
- `.github/workflows/build-cairo-apk.yml` و`android/`: إنشاء تطبيق Android.

## تشغيل اللعبة محليًا

تحتاج خادم ملفات محليًا لأن اللعبة تقرأ قائمة الأغاني عبر `fetch`؛ لا تفتح الملف مباشرة باستخدام `file://`. من مجلد المشروع شغّل:

```bash
python3 -m http.server 8000
```

ثم افتح `http://localhost:8000`. ويمكن نشر النسخة الثابتة عبر GitHub Pages (الفرع `main` والمجلد الجذر) أو Vercel.

## إضافة أغنية

أضف ملفًا مدعومًا إلى `audio/` وارفعه إلى `main`. يقوم GitHub Actions بتحديث `audio/playlist.json` تلقائيًا، ثم تظهر الأغنية في قائمة الموسيقى داخل اللعبة. يتطلب التحديث الآلي أن تسمح إعدادات Actions بالكتابة إلى محتوى المستودع.

## APK

يُبنى APK تجريبي قابل للتثبيت تلقائيًا عند تحديث اللعبة أو الأغاني. نزّله من GitHub: **Actions → Build Cairo APK → آخر تشغيل ناجح → Artifact `cairo-drive-apk`**. وللبناء المحلي، ثبّت Node.js وpnpm وAndroid SDK، ثم نفّذ `pnpm install` و`pnpm android:sync`، وبعدها `./gradlew --no-daemon assembleDebug` داخل `android/`.
