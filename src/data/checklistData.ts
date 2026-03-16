// Checklist Data - Import your Excel checklist here

export interface ChecklistItem {
  id: string;
  task: string;
  rating: 0 | 50 | 75 | 80 | 85 | 90 | 100; // Rating system: 0%, 50%, 75%, 80%, 85%, 90%, 100%
}

export interface ProjectChecklist {
  housekeeping: ChecklistItem[];
  maintenance: ChecklistItem[];
  security: ChecklistItem[];
  landscape: ChecklistItem[];
}

export const sectionInfo = {
  housekeeping: {
    title: 'النظافة العامة',
    icon: 'broom',
    color: '#4CAF50',
  },
  maintenance: {
    title: 'الصيانة',
    icon: 'tools',
    color: '#FF9800',
  },
  security: {
    title: 'الأمن',
    icon: 'shield-check',
    color: '#2196F3',
  },
  landscape: {
    title: 'تنسيق الحدائق',
    icon: 'tree',
    color: '#8BC34A',
  },
};

// Add your checklist items from your Excel sheet below
// You can copy and paste the data in this format:

export const checklistTemplate: ProjectChecklist = {
  housekeeping: [
    { id: 'hk1', task: 'إلتزام الشركة بالزي والشكل العام وسلوك الأفراد', rating: 0 },
    { id: 'hk2', task: 'استخدام أدوات الوقاية الشخصية للعاملين أثناء الجمع', rating: 0 },
    { id: 'hk3', task: 'الإلتزام بتعليمات السلامه والصحه المهنية ', rating: 0 },
    { id: 'hk4', task: 'معدات النظافة صالحه للعمل ونظيفة ', rating: 0 },
    { id: 'hk5', task: 'نظافة المرايات والزجاج والشبابيك', rating: 0 },
    {
      id: 'hk6',
      task: 'نظافة  المحتويات الداخلية والموبيليا والأثاث من الأتربة ',
      rating: 0,
    },
    { id: 'hk7', task: 'نظافة الأرضيات الرخام الداخلية للمباني ', rating: 0 },
    { id: 'hk8', task: 'نظافة الحمامات داخل الأوبرا', rating: 0 },
    { id: 'hk9', task: 'نظافة المصعد( ارضيات - استانليس - مرايات - أبواب ) ', rating: 0 },
    { id: 'hk10', task: 'نظافة سلالم الطوارئ', rating: 0 },
    { id: 'hk11', task: 'نظافة المكاتب الإدارية ', rating: 0 },
    { id: 'hk12', task: 'نظافة مكاتب الأمن والبوابات ', rating: 0 },
    { id: 'hk13', task: 'نظافة المشاية أمام الأوبرا ', rating: 0 },
    { id: 'hk14', task: 'نظافة التماثيل الخارجية ', rating: 0 },
    { id: 'hk15', task: 'نظافة أعمدة الإضائه', rating: 0 },
    { id: 'hk16', task: 'نظافة اللوحات الإرشادية ', rating: 0 },
    { id: 'hk17', task: 'نظافة الممرات بين الأبنية ', rating: 0 },
    { id: 'hk18', task: 'نظافة المسجد من الداخل ', rating: 0 },
    { id: 'hk19', task: 'نظافة الجراجات السطحية ', rating: 0 },
    { id: 'hk20', task: 'نظافة الجراجات الداخلية  ', rating: 0 },
    {
      id: 'hk21',
      task: 'نظافة ابواب الجراجات ومدخل السيارات نظيفة وخالية من المخلفات ',
      rating: 0,
    },
    { id: 'hk22', task: 'خلو الشارع من الأوراق والمخلفات واوراق الشجر', rating: 0 },
    { id: 'hk23', task: 'الحاويات فارغه من القمامة نهاية مواعيد العمل', rating: 0 },
    { id: 'hk24', task: 'الحاويات نظيفه ومغسولة حسب جدول الأعمال ', rating: 0 },
    { id: 'hk25', task: 'تنظيف المنطقة المحيطة بالحاوية', rating: 0 },
    { id: 'hk26', task: 'نظافة غرفة تجميع القمامة حسب الجدول', rating: 0 },
  ],
  maintenance: [
    { id: 'mn1', task: 'المصاعد تعمل بشكل جيد', rating: 0 },
    { id: 'mn2', task: 'عدم وجود أسلاك مكشوفة أو محروقة', rating: 0 },
    { id: 'mn3', task: 'إحكام إغلاق لوحات الكهرباء', rating: 0 },
    { id: 'mn4', task: 'نظافة لوحات الكهرباء وخلوّها من الأتربة', rating: 0 },
    { id: 'mn5', task: 'لا يوجد تسريبات فى خطوط المياه والسباكه', rating: 0 },
    { id: 'mn6', task: 'رقم الإبلاغ على الطوارء يعمل فى الخدمة ', rating: 0 },
    { id: 'mn7', task: 'نظافة مكان العمل بعد الانتهاء ', rating: 0 },
    { id: 'mn8', task: 'لا يوجد تسريبات فى خطوط المياه والسباكه', rating: 0 },
    { id: 'mn9', task: 'رقم الإبلاغ على الطوارء يعمل فى الخدمة ', rating: 0 },
    { id: 'mn10', task: 'نظافة مكان العمل بعد الانتهاء ', rating: 0 },
    { id: 'mn11', task: 'التأكد من عدم ترك أي أدوات بعد الصيانة', rating: 0 },
    { id: 'mn12', task: 'إلتزام أفراد الصيانة بمهمات الصحه والسلامة المهنية ', rating: 0 },
    { id: 'mn13', task: 'إلتزام الشركة بالزي والشكل العام وسلوك الأفراد', rating: 0 },
  ],
  security: [
    { id: 'sc1', task: 'إلتزام الشركة بالزي والشكل العام وسلوك الأفراد', rating: 0 },
    { id: 'sc2', task: 'حمل بطاقة الهوية/البادج شعار ACES', rating: 0 },
    { id: 'sc3', task: 'التواجد في الموقع المخصص بدون غياب', rating: 0 },
    { id: 'sc4', task: 'الاحترام والالتزام بقواعد التعامل مع الجمهور', rating: 0 },
    { id: 'sc5', task: 'أعداد افراد الامن مطابقه للخطه', rating: 0 },
    { id: 'sc6', task: 'إحكام بوابات الدخول والخروج  للسيارات  ', rating: 0 },
    { id: 'sc7', task: 'الإبلاغ الفوري عن أي ملاحظات اومخالفات ', rating: 0 },
    { id: 'sc8', task: 'تنفيذ الدوريات فى مواعيدها حسب الإخطار', rating: 0 },
    { id: 'sc9', task: 'صلاحية الأجهزة التابعه للأمن بالموقع', rating: 0 },
    { id: 'sc10', task: 'اليقظة التامة اثناء الخدمة ( عدم النوم )', rating: 0 },
    { id: 'sc11', task: 'تغطية جميع المناطق الحيوية', rating: 0 },
    { id: 'sc12', task: 'عدم مغادرة نقطة الحراسة بدون بديل', rating: 0 },
    { id: 'sc13', task: 'عدم استخدام الجوال أثناء العمل', rating: 0 },
  ],
  landscape: [
    { id: 'ls1', task: 'التأكد من عدم رش المياه على الأرصفة أو المباني', rating: 0 },
    { id: 'ls2', task: 'خلو الأحواض من الحشائش', rating: 0 },
    { id: 'ls3', task: 'خلو النباتات من الإصفرار أو الذبول', rating: 0 },
    { id: 'ls4', task: 'عدم وجود إصابات أو آفات ظاهرية', rating: 0 },
    { id: 'ls5', task: 'قص الفروع الميتة أو المتدلية', rating: 0 },
    { id: 'ls6', task: 'تنظيف المسطح من المخلفات والأوراق', rating: 0 },
    { id: 'ls7', task: 'انتظام الري وعدم وجود بقع جافة', rating: 0 },
    { id: 'ls8', task: 'خلو المسطحات من الحشائش الضارة', rating: 0 },
    { id: 'ls9', task: 'عدم ترك مخلفات زراعية بعد ساعات العمل', rating: 0 },
    { id: 'ls10', task: 'لا يوجد تسريبات ري والشكل الظاهري للشبكة ', rating: 0 },
    { id: 'ls11', task: 'ارتفاع العشب ضمن المستوى المطلوب', rating: 0 },
    { id: 'ls12', task: 'إلتزام الشركة بالزي والشكل العام وسلوك الأفراد   ', rating: 0 },
  ],
};

// You can add multiple project checklists if needed
export const projectChecklists: Record<string, ProjectChecklist> = {
  // '1': { housekeeping: [...], maintenance: [...], security: [...] },
};
