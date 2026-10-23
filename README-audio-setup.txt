إعداد قائمة الأغاني التلقائية

1. ارفع index.html المحدّث، ومجلد audio/playlist.json، والملف
   .github/workflows/update-audio-playlist.yml إلى المستودع.
2. في GitHub افتح Settings > Actions > General، ثم اختر
   Workflow permissions: Read and write permissions واحفظ التغيير.
3. ارفع ملفات الأغاني إلى مجلد audio على فرع main. الامتدادات المدعومة:
   mp3, ogg, wav, m4a, aac, opus, webm, flac.
4. سيعمل GitHub Action تلقائيًا وينشئ/يحدّث audio/playlist.json.
   بعد اكتمال الـ Action ونشر الموقع، افتح اللعبة واضغط زر 🎵 لاختيار أغنية.

لو لم يظهر الـ Action: افتح تبويب Actions وتأكد أن Actions مفعّلة للمستودع.
