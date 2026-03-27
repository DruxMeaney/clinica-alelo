// ============================================================
// Los 7 módulos del Índice Alelo
// ============================================================

import { IndiceAleloModule } from "@/types";

export const INDICE_ALELO_MODULES: IndiceAleloModule[] = [
  {
    id: "peso-obesidad",
    name: "Regulación del peso y obesidad",
    shortDescription:
      "Evalúa variantes asociadas con la regulación del apetito, el metabolismo basal, la acumulación de tejido adiposo y la predisposición genética a la obesidad.",
    fullDescription:
      "Este módulo integra variantes genéticas que influyen en los mecanismos de regulación del peso corporal, incluyendo el control del apetito y la saciedad, el metabolismo basal y la termogénesis, la distribución y acumulación de tejido adiposo, y la señalización hormonal relacionada con el balance energético. Genes como FTO (rs9939609), fuertemente vinculado con mayor masa grasa y alteración en la regulación energética, son centrales en este módulo. La identificación de estas variantes permite orientar estrategias nutricionales y de actividad física más específicas, considerando la predisposición constitutiva de cada individuo. El módulo incluye tanto variantes de riesgo (asociadas con mayor susceptibilidad a la obesidad) como variantes protectoras (asociadas con un metabolismo más eficiente o menor tendencia a la acumulación de grasa).",
    icon: "scale",
    colorAccent: "#2D6A4F",
    snvCount: 8,
    hasProtectiveVariants: true,
    hasRiskVariants: true,
    scaleMin: 0,
    scaleMax: 100,
    interpretationGuide:
      "Un puntaje más alto indica mayor carga genética asociada con la predisposición a la acumulación de peso. Puntajes bajos sugieren una menor carga de variantes de riesgo y/o presencia de variantes protectoras. El resultado debe interpretarse en conjunto con hábitos alimentarios, nivel de actividad física, perfil metabólico actual y antecedentes familiares. No determina el peso futuro, sino la susceptibilidad constitutiva.",
  },
  {
    id: "diabetes-tipo2",
    name: "Diabetes tipo 2",
    shortDescription:
      "Analiza variantes relacionadas con la resistencia a la insulina, la función de las células beta pancreáticas y el metabolismo de la glucosa, con especial énfasis en el módulo SLC16A11, variante de alta relevancia para la población mexicana.",
    fullDescription:
      "Este módulo examina variantes vinculadas con los mecanismos biológicos centrales de la diabetes tipo 2: la sensibilidad y resistencia a la insulina, la función y supervivencia de las células beta del páncreas, el transporte y metabolismo de la glucosa, y la regulación de lípidos asociada con el síndrome metabólico. Un componente distintivo de este módulo es el énfasis en SLC16A11, un gen con variantes de riesgo que presentan una frecuencia significativamente elevada en la población mexicana y latinoamericana en comparación con poblaciones europeas. Estas variantes se han asociado con alteraciones en el metabolismo de lípidos hepáticos y con un incremento en el riesgo de diabetes tipo 2. El módulo integra variantes de riesgo y variantes protectoras para construir una estimación neta de la carga genética asociada.",
    icon: "droplet",
    colorAccent: "#1B4965",
    snvCount: 10,
    hasProtectiveVariants: true,
    hasRiskVariants: true,
    scaleMin: 0,
    scaleMax: 100,
    interpretationGuide:
      "Un puntaje elevado refleja mayor carga de variantes asociadas con resistencia a la insulina, disfunción de células beta o alteraciones metabólicas. Debe complementarse con estudios de laboratorio como glucosa en ayuno, hemoglobina glucosilada (HbA1c), perfil de lípidos y mediciones antropométricas. No constituye un diagnóstico de diabetes, sino una herramienta para estratificar el riesgo y orientar la vigilancia preventiva.",
  },
  {
    id: "rendimiento-deportivo",
    name: "Rendimiento deportivo y composición muscular",
    shortDescription:
      "Examina variantes vinculadas con la composición de fibras musculares, la capacidad aeróbica, la recuperación y la respuesta al entrenamiento físico.",
    fullDescription:
      "Este módulo analiza variantes genéticas que influyen en la respuesta individual al ejercicio físico, incluyendo la proporción de fibras musculares de contracción rápida y lenta, la capacidad aeróbica máxima (VO₂ máx) y la eficiencia del transporte de oxígeno, la hipertrofia muscular y la respuesta al entrenamiento de fuerza, y la susceptibilidad a lesiones y los mecanismos de recuperación. Genes como ACTN3 (rs1815739), que determina la presencia de α-actinina-3 en las fibras musculares de tipo rápido y se vincula con diferencias en fuerza, potencia y capacidad de sprint, y el polimorfismo I/D de ACE (rs4646994), asociado con resistencia aeróbica e hipertrofia muscular, son centrales en este módulo. En este caso, las variantes no se clasifican estrictamente como de riesgo o protectoras, sino como orientadoras del tipo de actividad física que podría ser más compatible con el perfil genético del individuo.",
    icon: "activity",
    colorAccent: "#3A7D44",
    snvCount: 7,
    hasProtectiveVariants: false,
    hasRiskVariants: false,
    scaleMin: 0,
    scaleMax: 100,
    interpretationGuide:
      "En este módulo, el puntaje no indica riesgo sino orientación. Valores en diferentes rangos sugieren mayor predisposición hacia actividades de potencia/fuerza o hacia actividades de resistencia/endurance. El resultado debe combinarse con la evaluación funcional, los objetivos deportivos del paciente y su historia de entrenamiento. Ayuda a diseñar rutinas de ejercicio personalizadas que maximicen beneficios y reduzcan el riesgo de sobreentrenamiento o lesiones.",
  },
  {
    id: "salud-cardiovascular",
    name: "Salud cardiovascular",
    shortDescription:
      "Integra variantes asociadas con hipertensión, dislipidemias, riesgo de eventos cardiovasculares y factores de coagulación.",
    fullDescription:
      "Este módulo evalúa variantes genéticas que influyen en los principales factores de riesgo cardiovascular: la regulación de la presión arterial y la función endotelial, el metabolismo de lípidos y lipoproteínas (LDL, HDL, triglicéridos), la susceptibilidad a la aterosclerosis y eventos coronarios, y los factores de coagulación y la reactividad plaquetaria. Incluye genes como APOE (rs429358, rs7412), cuyas variantes ε2, ε3 y ε4 presentan diferentes grados de asociación con dislipidemias y riesgo coronario; ACE (rs4646994), relacionado con la presión arterial; y PCSK9 (rs11591147), que influye significativamente sobre los niveles de LDL-colesterol. La determinación del genotipo en estos genes facilita la estratificación del riesgo cardiovascular y guía las recomendaciones sobre estilo de vida, seguimiento médico y, cuando es necesario, la referencia a cardiología.",
    icon: "heart",
    colorAccent: "#9B2226",
    snvCount: 12,
    hasProtectiveVariants: true,
    hasRiskVariants: true,
    scaleMin: 0,
    scaleMax: 100,
    interpretationGuide:
      "Un puntaje más alto indica mayor carga genética de riesgo cardiovascular. Debe interpretarse junto con perfil de lípidos, presión arterial, índices de masa corporal, antecedentes familiares de enfermedad cardiovascular y hábitos de vida. Si el puntaje sugiere un riesgo elevado, se recomienda referencia a cardiología o medicina interna para una evaluación más profunda. Las variantes protectoras (como ciertas variantes de PCSK9) pueden atenuar parcialmente la carga de riesgo.",
  },
  {
    id: "nutrigenomica",
    name: "Nutrigenómica y micronutrientes",
    shortDescription:
      "Evalúa variantes que influyen en la absorción, el metabolismo y los requerimientos de vitaminas, minerales y macronutrientes.",
    fullDescription:
      "Este módulo examina cómo los genes modulan la respuesta individual a los nutrientes, incluyendo la absorción y metabolismo de vitaminas (ácido fólico, vitaminas B6, B12, D, entre otras), los requerimientos y la utilización de minerales como hierro, calcio y zinc, la sensibilidad a componentes dietarios específicos (lactosa, cafeína, gluten, grasas saturadas), y las rutas metabólicas relacionadas con la metilación y el metabolismo de un carbono. Genes como MTHFR (rs1801133, rs1801131), cuyas variantes C677T y A1298C se relacionan con la conversión de folato a sus formas activas y afectan los niveles de homocisteína, son representativos de este módulo. La identificación de estas variantes permite personalizar la dieta y optimizar la suplementación, contrarrestando alteraciones metabólicas y minimizando riesgos asociados a deficiencias nutricionales.",
    icon: "leaf",
    colorAccent: "#606C38",
    snvCount: 9,
    hasProtectiveVariants: true,
    hasRiskVariants: true,
    scaleMin: 0,
    scaleMax: 100,
    interpretationGuide:
      "El puntaje refleja la carga genética asociada con necesidades nutricionales específicas o metabolismo alterado de ciertos nutrientes. Un puntaje más alto sugiere mayor probabilidad de requerir ajustes dietarios o suplementación. Debe complementarse con estudios de laboratorio (niveles séricos de vitaminas, homocisteína, perfil de hierro) y con la evaluación nutricional. Las recomendaciones se diseñan en coordinación con profesionales en nutrición.",
  },
  {
    id: "farmacogenetica",
    name: "Farmacogenética y respuesta a fármacos",
    shortDescription:
      "Identifica variantes que modulan la absorción, el metabolismo y la eficacia de fármacos comunes, permitiendo anticipar ajustes terapéuticos.",
    fullDescription:
      "Este módulo analiza variantes genéticas que influyen en la farmacocinética y la farmacodinamia de medicamentos de uso común, incluyendo la actividad de las enzimas del citocromo P450 (CYP2D6, CYP2C19, CYP2C9, CYP3A4) que metabolizan una proporción significativa de los fármacos prescritos, los transportadores de membrana que afectan la absorción y distribución de medicamentos, la sensibilidad de los receptores farmacológicos, y el riesgo de reacciones adversas o ineficacia terapéutica. La farmacogenética permite clasificar a los individuos en categorías de metabolización (metabolizador ultrarrápido, extenso, intermedio o lento), lo que tiene implicaciones directas en la dosificación y la selección de fármacos. En este módulo, las variantes no se clasifican como de riesgo o protectoras en sentido clásico, sino como determinantes del perfil metabólico farmacológico del individuo.",
    icon: "pill",
    colorAccent: "#5C4D7D",
    snvCount: 8,
    hasProtectiveVariants: false,
    hasRiskVariants: false,
    scaleMin: 0,
    scaleMax: 100,
    interpretationGuide:
      "En este módulo, el puntaje no indica riesgo sino perfil de metabolización. Valores en diferentes rangos orientan sobre la velocidad y eficiencia con que el organismo procesa ciertos fármacos. Los resultados deben comunicarse al médico tratante para informar decisiones de prescripción y dosificación. Este módulo es especialmente relevante cuando el paciente utiliza medicamentos crónicos o múltiples fármacos simultáneamente.",
  },
  {
    id: "bienestar-general",
    name: "Tendencias de bienestar y salud general",
    shortDescription:
      "Agrupa variantes relacionadas con inflamación sistémica, respuesta al estrés oxidativo, longevidad y otros indicadores de salud general.",
    fullDescription:
      "Este módulo integra variantes genéticas asociadas con procesos biológicos transversales que influyen en el estado general de salud, incluyendo la regulación de la inflamación sistémica y la respuesta inmune, la capacidad antioxidante y la protección contra el daño celular, los mecanismos de reparación del ADN y el envejecimiento celular, la regulación del sueño, el estrés y los ritmos circadianos, y otros indicadores de salud metabólica y vascular. Este módulo ofrece una perspectiva complementaria a los ejes principales de la clínica, agrupando variantes que, si bien no se enfocan en una patología específica, aportan información sobre tendencias generales del organismo hacia la resiliencia o la vulnerabilidad biológica. Incluye variantes de riesgo y protectoras que se integran para estimar la carga neta.",
    icon: "sun",
    colorAccent: "#BC6C25",
    snvCount: 6,
    hasProtectiveVariants: true,
    hasRiskVariants: true,
    scaleMin: 0,
    scaleMax: 100,
    interpretationGuide:
      "Un puntaje más alto indica mayor carga de variantes asociadas con procesos inflamatorios, estrés oxidativo o vulnerabilidad general. Un puntaje bajo sugiere mejor perfil de resiliencia biológica. Este módulo es orientativo y debe interpretarse como parte del panorama general del Índice Alelo, no de forma aislada. Complementa la información de los otros módulos para construir una visión integrada del perfil del paciente.",
  },
];
