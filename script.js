document.getElementById('weightForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  // دالة لحساب الوزن لجزء معين
  function calculateWeight(flange1_length, flange1_width, flange1_thickness,
                           flange2_length, flange2_width, flange2_thickness,
                           web_length, web_width, web_thickness, count) {
    // حجم الفلانشة الأولى
    const flange1_volume = flange1_length * flange1_width * flange1_thickness;
    // حجم الفلانشة الثانية
    const flange2_volume = flange2_length * flange2_width * flange2_thickness;
    // حجم الويب
    const web_volume = web_length * web_width * web_thickness;

    // الحجم الكلي للمقطع الواحد (سم^3)
    const total_volume = flange1_volume + flange2_volume + web_volume;

    // كثافة الحديد = 7.85 جم/سم^3 = 7.85 كغ/لتر (بما أن 1 سم^3 = 1 مل = 0.001 لتر، الكثافة تكون بنفس الوحدة)
    // لذلك الوزن بالكيلو = الحجم بالسم^3 * 7.85 / 1000
    const weight_per_piece = total_volume * 7.85 / 1000;

    return weight_per_piece * count;
  }

  // حساب الأوزان لكل جزء
  const mainColumnsWeight = calculateWeight(
    parseFloat(formData.get('main_columns_flange1_length')),
    parseFloat(formData.get('main_columns_flange1_width')),
    parseFloat(formData.get('main_columns_flange1_thickness')),
    parseFloat(formData.get('main_columns_flange2_length')),
    parseFloat(formData.get('main_columns_flange2_width')),
    parseFloat(formData.get('main_columns_flange2_thickness')),
    parseFloat(formData.get('main_columns_web_length')),
    parseFloat(formData.get('main_columns_web_width')),
    parseFloat(formData.get('main_columns_web_thickness')),
    parseInt(formData.get('main_columns_count'))
  );

  const middleColumnsWeight = calculateWeight(
    parseFloat(formData.get('middle_columns_flange1_length')),
    parseFloat(formData.get('middle_columns_flange1_width')),
    parseFloat(formData.get('middle_columns_flange1_thickness')),
    parseFloat(formData.get('middle_columns_flange2_length')),
    parseFloat(formData.get('middle_columns_flange2_width')),
    parseFloat(formData.get('middle_columns_flange2_thickness')),
    parseFloat(formData.get('middle_columns_web_length')),
    parseFloat(formData.get('middle_columns_web_width')),
    parseFloat(formData.get('middle_columns_web_thickness')),
    parseInt(formData.get('middle_columns_count'))
  );

  const faceColumnsWeight = calculateWeight(
    parseFloat(formData.get('face_columns_flange1_length')),
    parseFloat(formData.get('face_columns_flange1_width')),
    parseFloat(formData.get('face_columns_flange1_thickness')),
    parseFloat(formData.get('face_columns_flange2_length')),
    parseFloat(formData.get('face_columns_flange2_width')),
    parseFloat(formData.get('face_columns_flange2_thickness')),
    parseFloat(formData.get('face_columns_web_length')),
    parseFloat(formData.get('face_columns_web_width')),
    parseFloat(formData.get('face_columns_web_thickness')),
    parseInt(formData.get('face_columns_count'))
  );

  const raftersFlyingWeight = calculateWeight(
    parseFloat(formData.get('rafters_flying_flange1_length')),
    parseFloat(formData.get('rafters_flying_flange1_width')),
    parseFloat(formData.get('rafters_flying_flange1_thickness')),
    parseFloat(formData.get('rafters_flying_flange2_length')),
    parseFloat(formData.get('rafters_flying_flange2_width')),
    parseFloat(formData.get('rafters_flying_flange2_thickness')),
    parseFloat(formData.get('rafters_flying_web_length')),
    parseFloat(formData.get('rafters_flying_web_width')),
    parseFloat(formData.get('rafters_flying_web_thickness')),
    parseInt(formData.get('rafters_flying_count'))
  );

  const raftersLevelWeight = calculateWeight(
    parseFloat(formData.get('rafters_level_flange1_length')),
    parseFloat(formData.get('rafters_level_flange1_width')),
    parseFloat(formData.get('rafters_level_flange1_thickness')),
    parseFloat(formData.get('rafters_level_flange2_length')),
    parseFloat(formData.get('rafters_level_flange2_width')),
    parseFloat(formData.get('rafters_level_flange2_thickness')),
    parseFloat(formData.get('rafters_level_web_length')),
    parseFloat(formData.get('rafters_level_web_width')),
    parseFloat(formData.get('rafters_level_web_thickness')),
    parseInt(formData.get('rafters_level_count'))
  );

  const raftersFlyingAfterWeight = calculateWeight(
    parseFloat(formData.get('rafters_flying_after_flange1_length')),
    parseFloat(formData.get('rafters_flying_after_flange1_width')),
    parseFloat(formData.get('rafters_flying_after_flange1_thickness')),
    parseFloat(formData.get('rafters_flying_after_flange2_length')),
    parseFloat(formData.get('rafters_flying_after_flange2_width')),
    parseFloat(formData.get('rafters_flying_after_flange2_thickness')),
    parseFloat(formData.get('rafters_flying_after_web_length')),
    parseFloat(formData.get('rafters_flying_after_web_width')),
    parseFloat(formData.get('rafters_flying_after_web_thickness')),
    parseInt(formData.get('rafters_flying_after_count'))
  );

  // حساب الوزن الكلي
  const totalWeight = mainColumnsWeight + middleColumnsWeight + faceColumnsWeight + raftersFlyingWeight + raftersLevelWeight + raftersFlyingAfterWeight;

  // حساب وزن التات (12%)
  const wastageWeight = totalWeight * 0.12;

  // الوزن النهائي مع التات
  const finalWeight = totalWeight + wastageWeight;

  // عرض النتائج
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
    <p>وزن الأعمدة الرئيسية: <strong>${mainColumnsWeight.toFixed(2)}</strong> كغ</p>
    <p>وزن الأعمدة الوسط: <strong>${middleColumnsWeight.toFixed(2)}</strong> كغ</p>
    <p>وزن الأعمدة الوجهة: <strong>${faceColumnsWeight.toFixed(2)}</strong> كغ</p>
    <p>وزن الرافترات الطيارة: <strong>${raftersFlyingWeight.toFixed(2)}</strong> كغ</p>
    <p>وزن الرافترات العدل: <strong>${raftersLevelWeight.toFixed(2)}</strong> كغ</p>
    <p>وزن الرافترات الطيارة بعد السلبة: <strong>${raftersFlyingAfterWeight.toFixed(2)}</strong> كغ</p>
    <hr>
    <p>الوزن الكلي: <strong>${totalWeight.toFixed(2)}</strong> كغ</p>
    <p>وزن التات (12%): <strong>${wastageWeight.toFixed(2)}</strong> كغ</p>
    <p><strong>الوزن النهائي مع التات: ${finalWeight.toFixed(2)} كغ</strong></p>
  `;
});
