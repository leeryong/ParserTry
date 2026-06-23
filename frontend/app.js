/* ParseTrial — Alpine.js 앱 로직 */

const API = '';

const ELEM_TYPE_LABELS = {
  text: '텍스트', heading: '제목', table: '표',
  image: '이미지', chart: '차트', formula: '수식',
  code: '코드', list_item: '목록', caption: '캡션',
  footnote: '각주', header: '헤더', footer: '푸터', unknown: '기타',
};

// 요소 타입별 색상 (오버레이 범례)
const ELEMENT_COLORS = {
  text:      '#3B82F6',  // 파란색
  heading:   '#7C3AED',  // 보라색
  table:     '#059669',  // 초록색
  image:     '#F97316',  // 주황색
  chart:     '#F59E0B',  // 황금색
  formula:   '#DB2777',  // 분홍색
  code:      '#0EA5E9',  // 하늘색
  list_item: '#10B981',  // 에메랄드
  caption:   '#6B7280',  // 회색
  footnote:  '#92400E',  // 갈색
  header:    '#0369A1',  // 진파랑
  footer:    '#9D174D',  // 진분홍
  unknown:   '#9CA3AF',  // 밝은 회색
};

const TIER_LABELS = {
  strongly_recommended: '강력 추천',
  recommended: '추천',
  possible: '사용 가능',
  not_suitable: '비적합',
};

const LANGS = ['ko', 'en', 'ja', 'zh'];

const I18N = {
  ko: {
    appName: 'ParserTry',
    appDesc: '다양한 PDF 파서의 출력을 나란히 비교하고, 어떤 파서가 내 문서에 최적인지 확인하세요.',
    home: '🏠 홈', viewer: '🔍 문서 뷰어', analysis: '💡 파서 추천',
    parsersInfo: '🧩 파서 정보', settings: '⚙️ 설정', help: '❓ 도움말',
    uploadBtn: 'PDF 업로드',
    docList: '문서 목록',
    deleteAll: '전체삭제',
    dropZoneTitle: 'PDF 파일을 여기에 드래그하거나 클릭하여 업로드',
    dropZoneSub: '여러 파일 동시 업로드 가능 · 최대 200MB',
    parserSelect: '파서 선택',
    analyzeBtn: '▶ 분석',
    analyzingBtn: '분석 중...',
    pdfOriginal: '📄 PDF 원본',
    parseResult: '🔍 파싱 결과',
    tabText: '텍스트', tabMarkdown: '마크다운', tabElements: '요소 목록', tabLayout: '레이아웃', tabMedia: '미디어', tabJson: 'JSON',
    mediaTotal: '총', mediaItems: '개 미디어', noMedia: '추출된 미디어가 없습니다 (그림/표/차트/수식)',
    noLayoutBbox: '이 파서는 좌표(bbox) 정보를 제공하지 않습니다.\nPyMuPDF, pdfplumber, Docling, Marker 등을 사용하면 레이아웃 미니맵을 볼 수 있습니다.',
    overlayLegend: '오버레이 색상 범례',
    copyBtn: '📋 복사',
    parserAvail: '사용 가능',
    availableParsers: '파서',
    installedLabel: '✓ 설치됨',
    notInstalledLabel: '미설치',
    installedGroup: '✓ 설치된 파서',
    notInstalledGroup: '⚠ 미설치 (설치 후 사용 가능)',
    analyzeDone: '분석 완료!',
    analyzeError: '분석 중 오류가 발생했습니다.',
    step1Title: 'PDF 업로드', step1Desc: '드래그 앤 드롭 또는 클릭으로 PDF를 업로드합니다.',
    step2Title: '파서 선택 & 분석', step2Desc: '원하는 파서를 선택하고 분석을 시작합니다. 파서 추천도 받을 수 있어요.',
    step3Title: '결과 비교', step3Desc: '텍스트, 마크다운, 요소 목록을 탭별로 보고 오버레이로 위치를 확인합니다.',
    noDocSelected: '문서를 선택해 주세요',
    orPickLeft: '또는 좌측 문서 목록에서 선택하세요',
    startAnalysis: '▶ 분석 버튼을 눌러\n파싱을 시작하세요',
    noResult: '분석 결과가 없습니다',
    notInstalled: '📦 파서가 설치되어 있지 않습니다',
    githubLink: '🔗 GitHub에서 자세히 보기',
    parseError: '❌ 파싱 오류',
    renderMd: '마크다운 렌더링',
    totalElements: '총',
    elements: '개 요소',
    allPages: '전체 페이지',
    allTypes: '전체 타입',
    noElementsFound: '해당 조건의 요소가 없습니다',
    fitBtn: '높이맞춤', fitWidthBtn: '폭맞춤',
    fitHeightTip: '페이지 높이를 화면에 맞춤 (비율 유지)', fitWidthTip: '페이지 폭을 화면에 맞춤',
    parserRecommend: '파서 추천 분석',
    parserRecommendDesc: '을 분석하여 최적 파서를 추천합니다.',
    parserRecommendDesc2: '위 문서를 분석하여 가장 적합한 파서를 추천합니다.',
    analyzing: 'PDF 특성 분석 중...',
    pdfType: 'PDF 타입',
    pdfStats: '통계',
    pdfFeatures: '특성',
    recommTitle: '파서별 적합도',
    useParser: '이 파서로 분석',
    supportedParsers: '지원 파서 목록',
    totalParsers: '종 파서',
    installedCount: '개 설치됨',
    filterAll: '전체 분류',
    showInstalled: '설치된 파서만',
    githubBtn: 'GitHub',
    docsBtn: '문서',
    settingsTitle: '설정',
    globalSettings: '전역 설정',
    defaultLang: '기본 OCR 언어',
    useGpu: 'GPU 가속 사용',
    useGpuDesc: '지원하는 파서에서 CUDA GPU를 사용합니다',
    renderDpi: '페이지 렌더링 DPI',
    saveBtn: '저장', resetBtn: '초기화',
    helpTitle: '도움말',
    completedTag: '분석 완료:',
    pageRange: '범위', pageFirst: '현재페이지', pageAll: '전체', pageRangeOpt: '구간',
    stopBtn: '⏹ 중지', cancelledTag: '⏹ 중지됨', cancelDone: '분석을 중지했습니다.',
    page: '페이지',
    successTag: '✓ 성공', errorTag: '✗ 오류', notInstalledTag: '📦 미설치',
  },
  en: {
    appName: 'ParserTry',
    appDesc: 'Compare outputs of various PDF parsers side by side and find the best one for your document.',
    home: '🏠 Home', viewer: '🔍 Viewer', analysis: '💡 Parser Rec.',
    parsersInfo: '🧩 Parsers', settings: '⚙️ Settings', help: '❓ Help',
    uploadBtn: 'Upload PDF',
    docList: 'Documents',
    deleteAll: 'Delete All',
    dropZoneTitle: 'Drag & drop PDF here or click to upload',
    dropZoneSub: 'Multiple files supported · Max 200MB',
    parserSelect: 'Parser',
    analyzeBtn: '▶ Analyze',
    analyzingBtn: 'Analyzing...',
    pdfOriginal: '📄 PDF Original',
    parseResult: '🔍 Parse Result',
    tabText: 'Text', tabMarkdown: 'Markdown', tabElements: 'Elements', tabLayout: 'Layout', tabMedia: 'Media', tabJson: 'JSON',
    mediaTotal: 'Total', mediaItems: 'media items', noMedia: 'No media extracted (image/table/chart/formula)',
    noLayoutBbox: 'This parser does not provide coordinate (bbox) data.\nUse PyMuPDF, pdfplumber, Docling, or Marker to see the layout minimap.',
    overlayLegend: 'Overlay color legend',
    copyBtn: '📋 Copy',
    parserAvail: 'available',
    availableParsers: 'parsers',
    installedLabel: '✓ Installed',
    notInstalledLabel: 'Not installed',
    installedGroup: '✓ Installed parsers',
    notInstalledGroup: '⚠ Not installed (install to use)',
    analyzeDone: 'Analysis complete!',
    analyzeError: 'Error during analysis.',
    step1Title: 'Upload PDF', step1Desc: 'Drag & drop or click to upload a PDF.',
    step2Title: 'Select Parser & Analyze', step2Desc: 'Choose a parser and start analysis. Get parser recommendations too.',
    step3Title: 'Compare Results', step3Desc: 'View text, markdown, element list by tab and check positions with overlay.',
    noDocSelected: 'Please select a document',
    orPickLeft: 'or pick from the document list on the left',
    startAnalysis: 'Press ▶ Analyze\nto start parsing',
    noResult: 'No results yet',
    notInstalled: '📦 Parser is not installed',
    githubLink: '🔗 View on GitHub',
    parseError: '❌ Parse Error',
    renderMd: 'Render Markdown',
    totalElements: 'Total',
    elements: 'elements',
    allPages: 'All Pages',
    allTypes: 'All Types',
    noElementsFound: 'No elements match the filter',
    fitBtn: 'Fit H', fitWidthBtn: 'Fit W',
    fitHeightTip: 'Fit page height to view (keep ratio)', fitWidthTip: 'Fit page width to view',
    parserRecommend: 'Parser Recommendation',
    parserRecommendDesc: ' — analyzing to recommend the best parser.',
    parserRecommendDesc2: 'Analyzing the document above to recommend the best parser.',
    analyzing: 'Analyzing PDF characteristics...',
    pdfType: 'PDF Type',
    pdfStats: 'Stats',
    pdfFeatures: 'Features',
    recommTitle: 'Parser Suitability Scores',
    useParser: 'Use this parser',
    supportedParsers: 'Supported Parsers',
    totalParsers: 'parsers total',
    installedCount: 'installed',
    filterAll: 'All categories',
    showInstalled: 'Installed only',
    githubBtn: 'GitHub',
    docsBtn: 'Docs',
    settingsTitle: 'Settings',
    globalSettings: 'Global Settings',
    defaultLang: 'Default OCR Language',
    useGpu: 'Use GPU Acceleration',
    useGpuDesc: 'Use CUDA GPU in supporting parsers',
    renderDpi: 'Page Render DPI',
    saveBtn: 'Save', resetBtn: 'Reset',
    helpTitle: 'Help',
    completedTag: 'Analyzed:',
    pageRange: 'Range', pageFirst: 'Current page', pageAll: 'All', pageRangeOpt: 'Custom',
    stopBtn: '⏹ Stop', cancelledTag: '⏹ Stopped', cancelDone: 'Analysis stopped.',
    page: 'page',
    successTag: '✓ Success', errorTag: '✗ Error', notInstalledTag: '📦 Not installed',
  },
  ja: {
    appName: 'ParserTry',
    appDesc: '様々なPDFパーサーの出力を並べて比較し、あなたの文書に最適なパーサーを見つけましょう。',
    home: '🏠 ホーム', viewer: '🔍 ビューアー', analysis: '💡 パーサー推薦',
    parsersInfo: '🧩 パーサー情報', settings: '⚙️ 設定', help: '❓ ヘルプ',
    uploadBtn: 'PDFアップロード',
    docList: '文書リスト',
    deleteAll: '全件削除',
    dropZoneTitle: 'PDFをここにドラッグするかクリックしてアップロード',
    dropZoneSub: '複数ファイル対応 · 最大200MB',
    parserSelect: 'パーサー選択',
    analyzeBtn: '▶ 解析',
    analyzingBtn: '解析中...',
    pdfOriginal: '📄 PDF原本',
    parseResult: '🔍 解析結果',
    tabText: 'テキスト', tabMarkdown: 'マークダウン', tabElements: '要素一覧', tabLayout: 'レイアウト', tabMedia: 'メディア', tabJson: 'JSON',
    mediaTotal: '合計', mediaItems: '件のメディア', noMedia: '抽出されたメディアがありません（画像/表/グラフ/数式）',
    noLayoutBbox: 'このパーサーは座標(bbox)情報を提供しません。\nPyMuPDF、pdfplumber、Docling、Markerなどを使用するとレイアウトマップが表示されます。',
    overlayLegend: 'オーバーレイ色凡例',
    copyBtn: '📋 コピー',
    parserAvail: '利用可能',
    availableParsers: 'パーサー',
    installedLabel: '✓ インストール済',
    notInstalledLabel: '未インストール',
    installedGroup: '✓ インストール済パーサー',
    notInstalledGroup: '⚠ 未インストール（インストール後に使用可）',
    analyzeDone: '解析完了！',
    analyzeError: '解析中にエラーが発生しました。',
    step1Title: 'PDFアップロード', step1Desc: 'ドラッグ＆ドロップまたはクリックでPDFをアップロードします。',
    step2Title: 'パーサー選択・解析', step2Desc: 'パーサーを選んで解析を開始します。推薦機能も利用できます。',
    step3Title: '結果比較', step3Desc: 'テキスト、マークダウン、要素一覧をタブで確認し、オーバーレイで位置を確認します。',
    noDocSelected: '文書を選択してください',
    orPickLeft: 'または左の文書リストから選択してください',
    startAnalysis: '▶ 解析ボタンを押して\n解析を開始してください',
    noResult: '解析結果がありません',
    notInstalled: '📦 パーサーがインストールされていません',
    githubLink: '🔗 GitHubで詳細を見る',
    parseError: '❌ 解析エラー',
    renderMd: 'マークダウンレンダリング',
    totalElements: '合計',
    elements: '個の要素',
    allPages: '全ページ',
    allTypes: '全タイプ',
    noElementsFound: '条件に合う要素がありません',
    fitBtn: '高さ合わせ', fitWidthBtn: '幅合わせ',
    fitHeightTip: 'ページの高さを画面に合わせる（比率維持）', fitWidthTip: 'ページの幅を画面に合わせる',
    parserRecommend: 'パーサー推薦分析',
    parserRecommendDesc: 'を分析して最適なパーサーを推薦します。',
    parserRecommendDesc2: '上記の文書を分析して最適なパーサーを推薦します。',
    analyzing: 'PDF特性を分析中...',
    pdfType: 'PDFタイプ',
    pdfStats: '統計',
    pdfFeatures: '特性',
    recommTitle: 'パーサー適合度',
    useParser: 'このパーサーで解析',
    supportedParsers: '対応パーサー一覧',
    totalParsers: '種パーサー',
    installedCount: '個インストール済',
    filterAll: '全カテゴリー',
    showInstalled: 'インストール済のみ',
    githubBtn: 'GitHub',
    docsBtn: 'ドキュメント',
    settingsTitle: '設定',
    globalSettings: 'グローバル設定',
    defaultLang: 'デフォルトOCR言語',
    useGpu: 'GPU加速を使用',
    useGpuDesc: '対応パーサーでCUDA GPUを使用します',
    renderDpi: 'ページレンダリングDPI',
    saveBtn: '保存', resetBtn: 'リセット',
    helpTitle: 'ヘルプ',
    completedTag: '解析済み:',
    pageRange: '範囲', pageFirst: '現在のページ', pageAll: '全体', pageRangeOpt: '区間',
    stopBtn: '⏹ 停止', cancelledTag: '⏹ 停止済み', cancelDone: '解析を停止しました。',
    page: 'ページ',
    successTag: '✓ 成功', errorTag: '✗ エラー', notInstalledTag: '📦 未インストール',
  },
  zh: {
    appName: 'ParserTry',
    appDesc: '并排比较各种PDF解析器的输出，找到最适合您文档的解析器。',
    home: '🏠 首页', viewer: '🔍 文档查看', analysis: '💡 解析器推荐',
    parsersInfo: '🧩 解析器信息', settings: '⚙️ 设置', help: '❓ 帮助',
    uploadBtn: '上传 PDF',
    docList: '文档列表',
    deleteAll: '全部删除',
    dropZoneTitle: '将PDF文件拖到此处或点击上传',
    dropZoneSub: '支持多文件 · 最大200MB',
    parserSelect: '选择解析器',
    analyzeBtn: '▶ 分析',
    analyzingBtn: '分析中...',
    pdfOriginal: '📄 PDF原文',
    parseResult: '🔍 解析结果',
    tabText: '文本', tabMarkdown: 'Markdown', tabElements: '元素列表', tabLayout: '布局', tabMedia: '媒体', tabJson: 'JSON',
    mediaTotal: '共', mediaItems: '个媒体', noMedia: '未提取到媒体（图片/表格/图表/公式）',
    noLayoutBbox: '此解析器不提供坐标(bbox)信息。\n使用PyMuPDF、pdfplumber、Docling、Marker等可查看布局图。',
    overlayLegend: '叠加层颜色图例',
    copyBtn: '📋 复制',
    parserAvail: '可用',
    availableParsers: '解析器',
    installedLabel: '✓ 已安装',
    notInstalledLabel: '未安装',
    installedGroup: '✓ 已安装的解析器',
    notInstalledGroup: '⚠ 未安装（安装后可使用）',
    analyzeDone: '分析完成！',
    analyzeError: '分析过程中发生错误。',
    step1Title: '上传PDF', step1Desc: '拖放或点击上传PDF文件。',
    step2Title: '选择解析器并分析', step2Desc: '选择解析器并开始分析，也可获取推荐。',
    step3Title: '比较结果', step3Desc: '通过标签查看文本、Markdown、元素列表，并用叠加层确认位置。',
    noDocSelected: '请选择文档',
    orPickLeft: '或从左侧文档列表中选择',
    startAnalysis: '点击▶分析按钮\n开始解析',
    noResult: '暂无分析结果',
    notInstalled: '📦 解析器未安装',
    githubLink: '🔗 在GitHub查看详情',
    parseError: '❌ 解析错误',
    renderMd: '渲染Markdown',
    totalElements: '共',
    elements: '个元素',
    allPages: '全部页面',
    allTypes: '全部类型',
    noElementsFound: '没有符合条件的元素',
    fitBtn: '适合高度', fitWidthBtn: '适合宽度',
    fitHeightTip: '将页面高度适配到视图（保持比例）', fitWidthTip: '将页面宽度适配到视图',
    parserRecommend: '解析器推荐分析',
    parserRecommendDesc: '分析文档并推荐最合适的解析器。',
    parserRecommendDesc2: '分析上方文档以推荐最合适的解析器。',
    analyzing: '正在分析PDF特征...',
    pdfType: 'PDF类型',
    pdfStats: '统计',
    pdfFeatures: '特征',
    recommTitle: '解析器适合度',
    useParser: '使用此解析器',
    supportedParsers: '支持的解析器列表',
    totalParsers: '种解析器',
    installedCount: '个已安装',
    filterAll: '全部分类',
    showInstalled: '仅显示已安装',
    githubBtn: 'GitHub',
    docsBtn: '文档',
    settingsTitle: '设置',
    globalSettings: '全局设置',
    defaultLang: '默认OCR语言',
    useGpu: '使用GPU加速',
    useGpuDesc: '在支持的解析器中使用CUDA GPU',
    renderDpi: '页面渲染DPI',
    saveBtn: '保存', resetBtn: '重置',
    helpTitle: '帮助',
    completedTag: '已分析:',
    pageRange: '范围', pageFirst: '当前页', pageAll: '全部', pageRangeOpt: '区间',
    stopBtn: '⏹ 停止', cancelledTag: '⏹ 已停止', cancelDone: '分析已停止。',
    page: '页',
    successTag: '✓ 成功', errorTag: '✗ 错误', notInstalledTag: '📦 未安装',
  },
};

function docParserApp() {
  return {
    // ── 언어 ─────────────────────────────────────────────────────
    lang: 'ko',

    // ── 다크 모드 ─────────────────────────────────────────────────
    darkMode: true,  // 기본값 다크

    // ── 뷰 상태 ─────────────────────────────────────────────────
    view: 'viewer',
    dragOver: false,
    sidebarDragOver: false,

    // ── 문서 ────────────────────────────────────────────────────
    documents: [],
    selectedDoc: null,
    sampleDocs: [],
    _resetDocIds: new Set(),   // 초기화한 doc_id 집합 (캐시 재로드 방지)
    // 선택 삭제 모드
    selectMode: false,
    checkedDocs: [],

    // ── 파서 ────────────────────────────────────────────────────
    parsersInfo: [],
    parserFilter: '',
    showOnlyAvailable: false,
    parserSearch: '',
    parserSort: 'default',
    parserView: 'list',     // 'card' | 'list'
    settingsTab: 'global',  // 'global' | 'llm' | 'parser'
    settingsParserId: '',   // 파서별 설정에서 선택된 파서 id (탭)
    helpTab: 'start',       // 'start' | 'features' | 'guide' | 'install'

    // ── 현재 선택된 파서 (드롭다운 값) ──────────────────────────
    activeResultParser: '',

    // ── 파싱 상태 ────────────────────────────────────────────────
    isParsingActive: false,
    parseProgress: 0,
    parseStep: '',
    activeJobId: null,
    parseStartTime: null,   // 파싱 시작 시각 (ms)
    parseETA: '',           // 예상 남은 시간 문자열

    // ── 페이지 범위 ──────────────────────────────────────────────
    pageMode: 'current',   // "current"(현재 페이지) | "all" | "range"
    pageStart: 1,
    pageEnd: 1,

    // 파서별 결과 캐시: { parser_id: ParseResult }
    parseResults: {},

    // ── 결과 표시 탭 ─────────────────────────────────────────────
    resultTab: 'text',
    renderMarkdown: true,

    // ── 요소 필터 ────────────────────────────────────────────────
    elemPageFilter: -1,
    elemTypeFilter: '',

    // ── 미디어 ───────────────────────────────────────────────────
    mediaTypeFilter: '',
    mediaPopup: null,

    // ── PDF ↔ 결과 연동 ──────────────────────────────────────────
    selectedElementId: null,

    // ── 뷰어 (연속 스크롤) ───────────────────────────────────────
    currentPage: 0,
    totalPages: 0,
    allDims: [],             // 전체 페이지 [{width,height}, ...] (PDF 포인트)
    pdfScale: 1.0,           // 표시 스케일 (px per PDF point)
    _fitWidthScale: null,    // 폭 맞춤 기준 스케일 (100% 기준)

    // ── 패널 리사이즈 ─────────────────────────────────────────────
    panelSplit: 50,          // 좌측 패널 너비 (%)
    _resizing: false,
    _resizeStartX: 0,
    _resizeStartSplit: 50,

    // ── 파서 옵션 팝업 ────────────────────────────────────────────
    showOptions: false,
    activeParserSchema: {},
    showApiKey: {},

    // ── LLM 인증 (설정 페이지) ─────────────────────────────────────
    showLlmKey: {},
    llmProviders: [
      { id: 'openai_vision', name: 'GPT Vision (OpenAI)', color: '#10A37F',
        needsKey: true, needsUrl: false,
        keyUrl: 'https://platform.openai.com/api-keys',
        keyPlaceholder: 'sk-...', install: 'pip install openai',
        hint: 'platform.openai.com에서 API 키 발급. GPT-4o 등 비전 모델 사용.' },
      { id: 'claude_vision', name: 'Claude Vision (Anthropic)', color: '#D97706',
        needsKey: true, needsUrl: false,
        keyUrl: 'https://console.anthropic.com/settings/keys',
        keyPlaceholder: 'sk-ant-...', install: 'pip install anthropic',
        hint: 'console.anthropic.com에서 API 키 발급. Claude Opus/Sonnet 비전 사용.' },
      { id: 'gemini_vision', name: 'Gemini Vision (Google)', color: '#4285F4',
        needsKey: true, needsUrl: false,
        keyUrl: 'https://aistudio.google.com/apikey',
        keyPlaceholder: 'AIza...', install: 'pip install google-generativeai',
        hint: 'aistudio.google.com에서 API 키 발급. Gemini 2.0/1.5 사용.' },
      { id: 'ollama_vision', name: 'Ollama (로컬 VLM)', color: '#64748B',
        needsKey: false, needsUrl: true,
        keyUrl: 'https://ollama.ai', urlDefault: 'http://localhost:11434',
        install: 'ollama pull llava',
        hint: '로컬 Ollama 서버 주소. API 키 불필요. ollama.ai에서 설치 후 모델 다운로드.' },
    ],

    // ── 분석 추천 ────────────────────────────────────────────────
    analysisReport: null,
    analysisLoading: false,
    isDeepAnalysis: false,
    recTab: 'ranking',
    recSort: 'score',
    recCapFilter: '',
    highlightedParserId: null,

    // ── 설정 ────────────────────────────────────────────────────
    appSettings: {
      global_settings: { default_language: 'ko', use_gpu: false, render_dpi: 150 },
      parser_settings: {},
      llm_credentials: {},   // { openai_vision: {api_key, base_url}, ... }
    },

    // ── 토스트 / 상태바 ──────────────────────────────────────────
    toast: { show: false, message: '', type: '' },
    _toastTimer: null,
    statusMessage: '준비됨',
    _statusTimer: null,

    // ── 개념도 팝업 ──────────────────────────────────────────────────
    conceptPopup: false,

    // ── 파서 실측경험 상세 팝업 ──────────────────────────────────────
    experiencePopup: null,   // 열려 있는 파서 객체(p) 또는 null
    openExperience(p) { this.experiencePopup = p; },
    expRate(p) {
      const e = p && p.experience; if (!e || !e.tested) return null;
      return Math.round((e.success / e.tested) * 100);
    },
    expRateCls(rate) {
      // 배경은 옅게(/10 불투명), 글자색으로만 구분 — 눈부심 방지
      if (rate === null) return 'bg-slate-400/10 text-slate-500 dark:text-slate-400';
      if (rate >= 100) return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
      if (rate >= 50) return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
      return 'bg-rose-500/10 text-rose-500 dark:text-rose-400';
    },
    expDocStatusCls(s) {
      if (s === 'success') return 'text-emerald-600';
      return 'text-rose-500';
    },

    // ── 품질 vs 속도 비교 산점도 ─────────────────────────────────────
    // X축=처리속도(실측 평균, 오른쪽=빠름, 로그축), Y축=품질(0~100, 위=높음)
    scatterChart() {
      const W = 1000, H = 380;
      const mL = 44, mR = 20, mT = 18, mB = 46;
      const pw = W - mL - mR, ph = H - mT - mB;
      // 실측시간 + 품질점수가 모두 있는 파서만 (현재 필터/검색 반영)
      const pts = this.filteredParsers().filter(p =>
        p.experience && p.experience.avg_time != null && p.experience.quality != null);
      const tMin = 0.05, tMax = 120;   // 로그 도메인 (초)
      const lg = v => Math.log10(Math.min(Math.max(v, tMin), tMax));
      const lMin = lg(tMin), lMax = lg(tMax);
      const xOf = t => mL + ((lMax - lg(t)) / (lMax - lMin)) * pw;  // 빠를수록 오른쪽
      const yOf = q => mT + (1 - Math.min(Math.max(q, 0), 100) / 100) * ph;
      const points = pts.map(p => ({
        cx: xOf(p.experience.avg_time), cy: yOf(p.experience.quality),
        color: p.color, name: p.parser_name,
        time: p.experience.avg_time, quality: p.experience.quality,
      }));
      // 겹치는 점 소폭 분리 (서로 밀어내되 원위치에서 ±6px 이내로 제한 — 오해 방지)
      points.forEach(p => { p._x0 = p.cx; p._y0 = p.cy; });
      const MIND = 12, CAP = 6;
      for (let it = 0; it < 40; it++) {
        let moved = false;
        for (let i = 0; i < points.length; i++) for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j];
          let dx = b.cx - a.cx, dy = b.cy - a.cy, d = Math.hypot(dx, dy);
          if (d < MIND) {
            if (d < 0.01) { dx = 0; dy = 1; d = 1; }   // 완전 일치 → 수직 분리
            const push = (MIND - d) / 2, ux = dx / d, uy = dy / d;
            a.cx -= ux * push; a.cy -= uy * push; b.cx += ux * push; b.cy += uy * push;
            moved = true;
          }
        }
        if (!moved) break;
      }
      points.forEach(p => {     // 원위치 ±CAP 및 차트 경계로 클램프
        p.cx = Math.max(p._x0 - CAP, Math.min(p._x0 + CAP, Math.max(mL, Math.min(mL + pw, p.cx))));
        p.cy = Math.max(p._y0 - CAP, Math.min(p._y0 + CAP, Math.max(mT, Math.min(mT + ph, p.cy))));
      });
      // X축 눈금(초): 빠름→느림
      const xticks = [0.1, 0.5, 1, 5, 30, 120].map(t => ({ x: xOf(t), label: t < 1 ? t + 's' : t + 's' }));
      const yticks = [0, 25, 50, 75, 100].map(q => ({ y: yOf(q), label: q }));
      return { W, H, mL, mR, mT, mB, pw, ph, points, xticks, yticks };
    },
    // SVG를 문자열로 생성 (Alpine x-for는 SVG 내부에서 동작하지 않으므로 x-html로 주입)
    scatterSVG() {
      const c = this.scatterChart();
      if (!c.points.length) return '';
      const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const gridCol = this.darkMode ? '#334155' : '#E2E8F0';
      const axisCol = this.darkMode ? '#475569' : '#CBD5E1';
      const tickCol = this.darkMode ? '#64748B' : '#94A3B8';
      const lblCol = this.darkMode ? '#94A3B8' : '#64748B';
      const txtCol = this.darkMode ? '#CBD5E1' : '#475569';
      const cx2 = c.mL + c.pw / 2, cy2 = c.mT + c.ph / 2;
      let s = `<svg viewBox="0 0 ${c.W} ${c.H}" width="100%" style="display:block;width:100%;height:auto" preserveAspectRatio="xMidYMid meet">`;
      // 사분면 가이드
      s += `<line x1="${c.mL}" y1="${cy2}" x2="${c.mL + c.pw}" y2="${cy2}" stroke="${gridCol}" stroke-dasharray="3 3"/>`;
      s += `<line x1="${cx2}" y1="${c.mT}" x2="${cx2}" y2="${c.mT + c.ph}" stroke="${gridCol}" stroke-dasharray="3 3"/>`;
      // 축
      s += `<line x1="${c.mL}" y1="${c.mT}" x2="${c.mL}" y2="${c.mT + c.ph}" stroke="${axisCol}"/>`;
      s += `<line x1="${c.mL}" y1="${c.mT + c.ph}" x2="${c.mL + c.pw}" y2="${c.mT + c.ph}" stroke="${axisCol}"/>`;
      // Y 눈금
      c.yticks.forEach(tk => {
        s += `<line x1="${c.mL - 3}" y1="${tk.y}" x2="${c.mL}" y2="${tk.y}" stroke="${axisCol}"/>`;
        s += `<text x="${c.mL - 6}" y="${tk.y + 4}" text-anchor="end" fill="${tickCol}" style="font-size:11px">${tk.label}</text>`;
      });
      // X 눈금
      c.xticks.forEach(tk => {
        s += `<line x1="${tk.x}" y1="${c.mT + c.ph}" x2="${tk.x}" y2="${c.mT + c.ph + 3}" stroke="${axisCol}"/>`;
        s += `<text x="${tk.x}" y="${c.mT + c.ph + 16}" text-anchor="middle" fill="${tickCol}" style="font-size:11px">${esc(tk.label)}</text>`;
      });
      // 축 라벨
      s += `<text x="${c.mL + c.pw}" y="${c.mT + c.ph + 30}" text-anchor="end" fill="${lblCol}" style="font-size:12px">← 처리속도 (빠름 ▶ 오른쪽)</text>`;
      s += `<text x="6" y="${c.mT + 9}" fill="${lblCol}" style="font-size:12px">품질▲</text>`;
      // 데이터 점 + 라벨 배치 (유연 배치):
      // 기본은 점 바로 아래-오른편, 가로로 실제 겹치는 라벨이 있을 때만 살짝 위/더 아래로
      // 최소 이동, 점에서 너무 멀어지지 않도록 상한.
      const rightZone = c.mL + c.pw * 0.74;
      const LINE_H = 13;             // 라벨 세로 충돌 간격
      const topY = c.mT + 6, botY = c.mT + c.ph - 4;
      const clampY = y => Math.max(topY, Math.min(botY, y));
      const cw = ch => (ch.charCodeAt(0) > 0x2000 ? 11 : 6.2);   // CJK는 넓게
      const estW = name => [...name].reduce((w, ch) => w + cw(ch), 0);
      // 후보 baseline 오프셋(점 대비): 아래 우선 → 위 → 점점 멀리 (상한 ±60)
      const OFFS = [12, -9, 25, -22, 38, -35, 51, -48, 60, -57];
      const labels = c.points.map(pt => {
        const left = pt.cx > rightZone;          // true면 라벨을 점 왼쪽에 배치
        return { pt, left, anchor: left ? 'end' : 'start',
                 lx: left ? pt.cx - 8 : pt.cx + 8, w: estW(pt.name), ly: pt.cy + 12 };
      });
      // 라벨 x구간 (앵커 방향 고려) — 겹침 판정은 가로+세로 모두 만족할 때만
      const xint = L => L.left ? [L.lx - L.w, L.lx] : [L.lx, L.lx + L.w];
      const xHit = (a, b) => { const [a0, a1] = xint(a), [b0, b1] = xint(b); return a0 < b1 + 4 && b0 < a1 + 4; };
      // 라벨 글상자가 어떤 점(원)과 겹치는지 (자기 점은 lx가 8px 떨어져 있어 제외됨)
      const DOT_R = 6;
      const hitsDot = (L, ly) => {
        const [x0, x1] = xint(L), y0 = ly - 9, y1 = ly + 3;
        return c.points.some(d =>
          d.cx > x0 - DOT_R && d.cx < x1 + DOT_R && d.cy > y0 - DOT_R && d.cy < y1 + DOT_R);
      };
      const placed = [];
      // 위→아래 순으로 배치 (위쪽 라벨 먼저 고정, 아래쪽이 회피)
      labels.slice().sort((a, b) => a.pt.cy - b.pt.cy).forEach(L => {
        let chosen = null;
        for (const off of OFFS) {
          const ly = clampY(L.pt.cy + off);
          const labelHit = placed.some(P => xHit(L, P) && Math.abs(P.ly - ly) < LINE_H);
          if (!labelHit && !hitsDot(L, ly)) { chosen = ly; break; }
        }
        L.ly = chosen != null ? chosen : clampY(L.pt.cy + OFFS[OFFS.length - 1]);
        placed.push(L);
      });
      labels.forEach(({ pt, left, lx, anchor, ly }) => {
        s += `<g>`;
        // 점에서 많이 떨어진 경우에만 가는 리더선
        if (Math.abs(ly - pt.cy) > 16)
          s += `<line x1="${pt.cx}" y1="${pt.cy}" x2="${lx + (left ? 3 : -3)}" y2="${ly - 3}" stroke="${gridCol}" stroke-width="0.6"/>`;
        s += `<circle cx="${pt.cx}" cy="${pt.cy}" r="5" fill="${pt.color}" fill-opacity="0.85" stroke="${this.darkMode ? '#1E293B' : '#fff'}" stroke-width="1">`;
        s += `<title>${esc(pt.name)} · 품질 ${pt.quality} · ${pt.time}s</title></circle>`;
        s += `<text x="${lx}" y="${ly}" text-anchor="${anchor}" fill="${txtCol}" style="font-size:11px">${esc(pt.name)}</text>`;
        s += `</g>`;
      });
      s += `</svg>`;
      return s;
    },

    // ── 오버레이 색상 범례 (기본 접힘) ───────────────────────────────
    legendOpen: false,

    // ── 다크 모드 토글 ─────────────────────────────────────────────
    toggleDark() {
      this.darkMode = !this.darkMode;
      document.documentElement.classList.toggle('dark', this.darkMode);
      try { localStorage.setItem('parserTry_dark', String(this.darkMode)); } catch(_) {}
    },

    // ── i18n 헬퍼 ────────────────────────────────────────────────
    t(key) {
      return (I18N[this.lang] || I18N['ko'])[key] || key;
    },
    changeLang(l) {
      this.lang = l;
      try { localStorage.setItem('parserTry_lang', l); } catch(_) {}
    },

    // ════════════════════════════════════════════════════════════
    // 초기화
    // ════════════════════════════════════════════════════════════
    async init() {
      // 언어 복원
      const savedLang = localStorage.getItem('parserTry_lang');
      if (savedLang && LANGS.includes(savedLang)) this.lang = savedLang;
      // 다크 모드 복원 (head script에서 이미 html class 적용됨)
      const savedDark = localStorage.getItem('parserTry_dark');
      this.darkMode = savedDark !== 'false';  // 기본 true(다크)

      await Promise.all([
        this.loadDocuments(),
        this.loadParsers(),
        this.loadSettings(),
        this.loadSampleDocs(),
      ]);
      // 기본 파서: 첫 번째 설치된 파서
      if (!this.activeResultParser) {
        const avail = this.parsersInfo.find(p => p.is_available);
        if (avail) this.activeResultParser = avail.parser_id;
      }
      // ── 새로고침 후 화면 복원 ──────────────────────────────────────
      const savedDocId  = localStorage.getItem('parserTry_docId');
      const savedParser = localStorage.getItem('parserTry_parser');
      const savedView   = localStorage.getItem('parserTry_view');
      const savedSplit  = localStorage.getItem('parserTry_split');

      if (savedSplit) this.panelSplit = parseFloat(savedSplit) || 50;
      if (savedParser) this.activeResultParser = savedParser;

      if (savedDocId) {
        const doc = this.documents.find(d => d.id === savedDocId);
        if (doc) {
          await this.selectDocument(doc);
          // selectDocument 가 view를 viewer로 덮어쓸 수 있으므로 뷰 복원은 이후에
          if (savedView && ['viewer','analysis','parsers','settings','help'].includes(savedView)) {
            this.view = savedView;
          }
        }
      }

      // 뷰/파서/분리자 변경 시 자동 저장
      this.$watch('view',               v => { try { localStorage.setItem('parserTry_view',   v); } catch(_){} });
      this.$watch('activeResultParser', v => { try { localStorage.setItem('parserTry_parser', v); } catch(_){} });
      this.$watch('panelSplit',         v => { try { localStorage.setItem('parserTry_split',  v); } catch(_){} });
      this.$watch('selectedDoc',        v => { try { localStorage.setItem('parserTry_docId',  v?.id || ''); } catch(_){} });

      // 브라우저 자동완성 차단: 어떤 타이밍에 autofill이 들어와도 숫자만 있으면 즉시 제거
      setTimeout(() => { this.parserSearch = ''; }, 50);
      setTimeout(() => { this.parserSearch = ''; }, 500);
      this.$watch('parserSearch', val => {
        // 순수 숫자 (150, 300 등) 는 파서 검색어로 의미 없음 — autofill이 심은 것
        if (val && /^\d+$/.test(String(val).trim())) this.parserSearch = '';
      });
    },

    // ════════════════════════════════════════════════════════════
    // 문서 관리
    // ════════════════════════════════════════════════════════════
    async loadDocuments() {
      try {
        const r = await fetch(`${API}/api/documents`);
        this.documents = await r.json();
      } catch (e) { this.showToast('문서 목록 로드 실패', 'error'); }
    },

    async loadSampleDocs() {
      try {
        const r = await fetch(`${API}/api/samples`);
        if (r.ok) this.sampleDocs = await r.json();
      } catch (_) {}
    },

    async loadSamplePdf(name) {
      try {
        const r = await fetch(`${API}/api/samples/${encodeURIComponent(name)}/upload`, { method: 'POST' });
        if (!r.ok) { this.showToast('샘플 로드 실패', 'error'); return; }
        const doc = await r.json();
        if (!this.documents.find(d => d.id === doc.id)) {
          this.documents.unshift(doc);
        }
        await this.selectDocument(doc);
        this.showToast(`샘플 "${doc.filename}" 로드 완료`, 'success');
      } catch (e) {
        this.showToast('샘플 로드 오류: ' + e.message, 'error');
      }
    },

    triggerUpload() { document.getElementById('fileInput').click(); },

    handleFileInput(e) {
      const files = Array.from(e.target.files).filter(f => f.name.endsWith('.pdf'));
      if (files.length) this.uploadFiles(files);
      e.target.value = '';
    },

    handleDrop(e) {
      this.dragOver = false;
      const files = Array.from(e.dataTransfer.files).filter(f => f.name.endsWith('.pdf'));
      if (files.length) this.uploadFiles(files);
      else this.showToast('PDF 파일만 업로드할 수 있습니다.', 'error');
    },

    async uploadFiles(files) {
      for (const file of files) {
        const fd = new FormData();
        fd.append('file', file);
        try {
          const r = await fetch(`${API}/api/documents/upload`, { method: 'POST', body: fd });
          if (!r.ok) { const e = await r.json(); this.showToast(e.detail || '업로드 실패', 'error'); continue; }
          const doc = await r.json();
          this.documents.unshift(doc);
          this.showToast(`"${doc.filename}" 업로드 완료`, 'success');
        } catch (e) {
          this.showToast(`업로드 오류: ${e.message}`, 'error');
        }
      }
    },

    async selectDocument(doc) {
      this.selectedDoc = doc;
      this.currentPage = 0;
      this.totalPages = doc.page_count;
      this.parseResults = {};        // 문서 바꾸면 결과 초기화
      this.allDims = [];
      this._fitWidthScale = null;
      this.selectedElementId = null;
      this.parseProgress = 0;
      this.parseStep = '';
      this.elemPageFilter = -1;
      this.elemTypeFilter = '';
      // 페이지 범위 기본값 설정
      this.pageStart = 1;
      this.pageEnd = doc.page_count || 1;

      // 현재 선택 파서의 캐시 결과만 로드
      await this.tryLoadCachedResult(this.activeResultParser);
      await this.loadAllDims();
      // 추천/파서정보/설정/도움말 보는 중이면 그 화면 유지, 그 외엔 뷰어로
      if (this.view === 'analysis') {
        await this.goAnalysis();   // 새 문서로 추천 재분석
      } else if (!['parsers', 'settings', 'help'].includes(this.view)) {
        this.view = 'viewer';
      }
    },

    // 파서 드롭다운 변경 시 호출 (x-model이 자동으로 activeResultParser를 업데이트한 후)
    async onParserChange() {
      if (!this.selectedDoc) return;
      // 해당 파서의 기존 결과가 없으면 캐시에서 시도
      if (!this.parseResults[this.activeResultParser]) {
        await this.tryLoadCachedResult(this.activeResultParser);
      }
      this.selectedElementId = null;
      if (!this.allDims?.length) await this.loadAllDims();
    },

    async tryLoadCachedResult(parserId) {
      if (!parserId || !this.selectedDoc) return;
      // 사용자가 초기화한 문서는 서버 캐시 재로드 금지
      if (this._resetDocIds.has(this.selectedDoc.id)) return;
      try {
        const r = await fetch(`${API}/api/documents/${this.selectedDoc.id}/results/${parserId}`);
        if (r.ok) {
          const result = await r.json();
          this.parseResults[parserId] = result;
        }
      } catch (_) {}
    },

    async deleteDocument(docId) {
      if (!confirm('이 문서를 삭제하시겠습니까?')) return;
      await fetch(`${API}/api/documents/${docId}`, { method: 'DELETE' });
      this.documents = this.documents.filter(d => d.id !== docId);
      if (this.selectedDoc?.id === docId) {
        this.selectedDoc = null;
        this.parseResults = {};
        this.view = 'viewer';
      }
      this.showToast('문서 삭제 완료');
    },

    // 현재 문서의 모든 파서 분석 결과 초기화 (메모리 + 서버 캐시)
    async resetDocResults() {
      if (!this.selectedDoc) return;
      const docId = this.selectedDoc.id;
      // 서버 캐시 삭제
      try {
        const r = await fetch(`${API}/api/documents/${docId}/results`, { method: 'DELETE' });
        const data = await r.json().catch(() => ({}));
        console.log('[reset]', data.message);
      } catch (e) {
        console.warn('[reset] 서버 삭제 실패:', e);
      }
      // 이 doc_id는 이후 selectDocument 복귀 시에도 캐시 로드 금지
      this._resetDocIds.add(docId);
      // 프론트 메모리 초기화
      this.parseResults = {};
      this.selectedElementId = null;
      this.parseProgress = 0;
      this.parseStep = '';
      this.parseETA = '';
      this.showToast('현재 문서의 분석 결과를 모두 초기화했습니다.');
    },

    async confirmDeleteAll() {
      if (!confirm('모든 문서를 삭제하시겠습니까?')) return;
      await fetch(`${API}/api/documents`, { method: 'DELETE' });
      this.documents = [];
      this.selectedDoc = null;
      this.parseResults = {};
      this.checkedDocs = [];
      this.selectMode = false;
      this.view = 'viewer';
      this.showToast('전체 문서 삭제 완료');
    },

    // ── 선택 삭제 ───────────────────────────────────────────────
    toggleSelectMode() {
      this.selectMode = !this.selectMode;
      if (!this.selectMode) this.checkedDocs = [];
    },

    toggleCheck(docId) {
      if (this.checkedDocs.includes(docId)) {
        this.checkedDocs = this.checkedDocs.filter(id => id !== docId);
      } else {
        this.checkedDocs.push(docId);
      }
    },

    toggleCheckAll() {
      if (this.checkedDocs.length === this.documents.length) {
        this.checkedDocs = [];
      } else {
        this.checkedDocs = this.documents.map(d => d.id);
      }
    },

    async deleteChecked() {
      const n = this.checkedDocs.length;
      if (!n) return;
      if (!confirm(`선택한 ${n}개 문서를 삭제하시겠습니까?`)) return;
      for (const id of [...this.checkedDocs]) {
        await fetch(`${API}/api/documents/${id}`, { method: 'DELETE' });
        this.documents = this.documents.filter(d => d.id !== id);
        if (this.selectedDoc?.id === id) {
          this.selectedDoc = null;
          this.parseResults = {};
        }
      }
      this.checkedDocs = [];
      this.selectMode = false;
      if (!this.selectedDoc) this.view = 'viewer';
      this.showToast(`${n}개 문서 삭제 완료`);
    },

    // ════════════════════════════════════════════════════════════
    // 파서 관리
    // ════════════════════════════════════════════════════════════
    async loadParsers() {
      try {
        const r = await fetch(`${API}/api/parsers`);
        this.parsersInfo = await r.json();
      } catch (e) { this.showToast('파서 정보 로드 실패', 'error'); }
    },

    getParserColor(pid) {
      return this.parsersInfo.find(p => p.parser_id === pid)?.color || '#3B82F6';
    },

    getParserName(pid) {
      return this.parsersInfo.find(p => p.parser_id === pid)?.parser_name || pid;
    },

    // GPU 요구사항 배지
    gpuBadge(req) {
      return ({
        none:     { label: '불필요', cls: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300' },
        optional: { label: '선택',   cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' },
        required: { label: '필수',   cls: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' },
      })[req] || { label: '-', cls: 'text-slate-400' };
    },
    // 처리 속도 배지
    speedBadge(s) {
      return ({
        fast:   { label: '빠름', cls: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' },
        medium: { label: '보통', cls: 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' },
        slow:   { label: '느림', cls: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300' },
      })[s] || { label: '-', cls: 'text-slate-400' };
    },
    // 언어 요약 (OCR 언어 개수; 없으면 텍스트 레이어 무관)
    langSummary(p) {
      const n = (p.ocr_languages || []).length;
      return n === 0 ? '—' : `${n}개`;
    },

    isParserAvailable(pid) {
      return this.parsersInfo.find(p => p.parser_id === pid)?.is_available || false;
    },

    // ── LLM 파서 헬퍼 ───────────────────────────────────────────
    isLlmParser(pid) {
      return ['openai_vision', 'claude_vision', 'gemini_vision', 'ollama_vision'].includes(pid);
    },

    // 인증 확인: API 키(또는 Ollama는 base_url) 존재 여부
    llmAuthOk(pid) {
      if (pid === 'ollama_vision') return true;  // 로컬 — 키 불필요
      const creds = this.appSettings.llm_credentials?.[pid] || {};
      const ps = this.appSettings.parser_settings?.[pid] || {};
      return !!(creds.api_key || ps.api_key);
    },

    // 파서 schema의 model 옵션 목록 [{id,label}]
    llmModels(pid) {
      const p = this.parsersInfo.find(p => p.parser_id === pid);
      const sc = p?.settings_schema?.model;
      if (!sc || !sc.options) return [];
      return sc.options.map(o => ({
        id: o,
        label: (sc.option_labels && sc.option_labels[o]) ? sc.option_labels[o] : o,
      }));
    },

    getOptionValue2(pid, key) {
      const ps = this.appSettings.parser_settings?.[pid];
      const def = this.parsersInfo.find(p => p.parser_id === pid)?.settings_schema?.[key]?.default;
      return (ps && ps[key] !== undefined) ? ps[key] : def;
    },

    setLlmModel(pid, value) {
      if (!this.appSettings.parser_settings[pid]) this.appSettings.parser_settings[pid] = {};
      this.appSettings.parser_settings[pid].model = value;
      this.saveSettings(true);
    },

    filteredParsers() {
      const q = (this.parserSearch || '').trim().toLowerCase();
      let list = this.parsersInfo.filter(p => {
        if (this.parserFilter && p.category !== this.parserFilter) return false;
        if (this.showOnlyAvailable && !p.is_available) return false;
        if (q) {
          const hay = `${p.parser_name} ${p.description} ${p.category} ${(p.ocr_languages||[]).join(' ')}`.toLowerCase();
          const caps = [p.supports_text&&'텍스트 text', p.supports_bbox&&'bbox 좌표',
                        p.supports_tables&&'표 table', p.supports_images&&'이미지 image',
                        p.supports_formulas&&'수식 formula', p.supports_ocr&&'ocr'].filter(Boolean).join(' ');
          if (!(hay + ' ' + caps).includes(q)) return false;
        }
        return true;
      });
      // 정렬
      if (this.parserSort === 'name') {
        list = [...list].sort((a, b) => a.parser_name.localeCompare(b.parser_name));
      } else if (this.parserSort === 'category') {
        list = [...list].sort((a, b) => (a.category||'').localeCompare(b.category||'') || a.parser_name.localeCompare(b.parser_name));
      } else if (this.parserSort === 'installed') {
        list = [...list].sort((a, b) => (b.is_available - a.is_available) || a.parser_name.localeCompare(b.parser_name));
      }
      return list;
    },

    // ════════════════════════════════════════════════════════════
    // 파서 옵션 팝업
    // ════════════════════════════════════════════════════════════
    openOptions() {
      if (!this.activeResultParser) return;
      const p = this.parsersInfo.find(p => p.parser_id === this.activeResultParser);
      this.activeParserSchema = p?.settings_schema || {};
      // 해당 파서 설정 객체 보장
      if (!this.appSettings.parser_settings[this.activeResultParser]) {
        this.appSettings.parser_settings[this.activeResultParser] = {};
      }
      // LLM 파서면 설정 페이지에 저장된 인증정보를 병합
      const creds = this.appSettings.llm_credentials?.[this.activeResultParser];
      if (creds) {
        for (const [k, v] of Object.entries(creds)) {
          if (v && this.appSettings.parser_settings[this.activeResultParser][k] === undefined) {
            this.appSettings.parser_settings[this.activeResultParser][k] = v;
          }
        }
      }
      this.showApiKey = {};
      this.showOptions = true;
    },

    getOptionValue(key, defaultVal) {
      const ps = this.appSettings.parser_settings[this.activeResultParser];
      return (ps && ps[key] !== undefined) ? ps[key] : defaultVal;
    },

    setOptionValue(key, value) {
      if (!this.appSettings.parser_settings[this.activeResultParser]) {
        this.appSettings.parser_settings[this.activeResultParser] = {};
      }
      this.appSettings.parser_settings[this.activeResultParser][key] = value;
      // API 키/URL은 설정 페이지에도 동기화 (영구 저장)
      if (key === 'api_key' || key === 'base_url') {
        if (!this.appSettings.llm_credentials) this.appSettings.llm_credentials = {};
        if (!this.appSettings.llm_credentials[this.activeResultParser]) {
          this.appSettings.llm_credentials[this.activeResultParser] = {};
        }
        this.appSettings.llm_credentials[this.activeResultParser][key] = value;
        this.saveSettings(true);
      }
    },

    resetOptions() {
      this.appSettings.parser_settings[this.activeResultParser] = {};
      this.showToast('기본값으로 초기화되었습니다.');
    },

    // select 옵션 레이블 — option_labels가 객체({val:label}) 또는 배열([label,...]) 모두 지원
    optLabel(schema, opt, idx) {
      const ol = schema.option_labels;
      if (!ol) return opt;
      if (Array.isArray(ol)) return ol[idx] !== undefined ? ol[idx] : opt;
      return ol[opt] !== undefined ? ol[opt] : opt;
    },

    // ── LLM 인증 (설정 페이지) ─────────────────────────────────────
    getLlmCred(parserId, key) {
      return this.appSettings.llm_credentials?.[parserId]?.[key] || '';
    },

    setLlmCred(parserId, key, value) {
      if (!this.appSettings.llm_credentials) this.appSettings.llm_credentials = {};
      if (!this.appSettings.llm_credentials[parserId]) this.appSettings.llm_credentials[parserId] = {};
      this.appSettings.llm_credentials[parserId][key] = value;
      // 파서 설정에도 즉시 반영
      if (!this.appSettings.parser_settings[parserId]) this.appSettings.parser_settings[parserId] = {};
      this.appSettings.parser_settings[parserId][key] = value;
      this.saveSettings(true);
    },

    // ════════════════════════════════════════════════════════════
    // 파싱 실행 (단일 파서)
    // ════════════════════════════════════════════════════════════
    async startParseSingle() {
      if (!this.selectedDoc || !this.activeResultParser || this.isParsingActive) return;

      if (!this.isParserAvailable(this.activeResultParser)) {
        const p = this.parsersInfo.find(p => p.parser_id === this.activeResultParser);
        this.showToast(`미설치: ${p?.install_command || ''}`, 'error');
        return;
      }

      this.isParsingActive = true;
      this.parseProgress = 0;
      this.parseStep = '파싱 시작 중...';
      this.parseStartTime = Date.now();
      this.parseETA = '';
      // 새 분석 시작 → 이 문서는 초기화 차단 해제 (결과를 다시 캐시에서 로드할 수 있게)
      this._resetDocIds.delete(this.selectedDoc.id);
      // 현재 파서 결과 초기화 — null 할당으로 Alpine.js reactive 갱신 보장
      this.parseResults = { ...this.parseResults, [this.activeResultParser]: null };
      this.selectedElementId = null;

      // 파서 설정 + LLM 인증정보(설정 페이지) 병합
      const merged = { ...(this.appSettings.parser_settings[this.activeResultParser] || {}) };
      const creds = this.appSettings.llm_credentials?.[this.activeResultParser];
      if (creds) {
        for (const [k, v] of Object.entries(creds)) {
          if (v && merged[k] === undefined) merged[k] = v;
        }
      }
      const parserSettings = { [this.activeResultParser]: merged };

      // 페이지 범위 결정: '현재페이지'는 PDF 뷰의 현재 페이지를 단일 구간으로 변환
      let reqMode = this.pageMode, reqStart = this.pageStart, reqEnd = this.pageEnd;
      if (this.pageMode === 'current') {
        reqMode = 'range';
        reqStart = this.currentPage + 1;   // 1-based
        reqEnd = this.currentPage + 1;
      }

      try {
        const r = await fetch(`${API}/api/parse`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            doc_id: this.selectedDoc.id,
            parser_ids: [this.activeResultParser],
            settings: parserSettings,
            page_mode: reqMode,
            page_start: reqStart,
            page_end: reqEnd,
          }),
        });
        if (!r.ok) throw new Error((await r.json()).detail || '파싱 요청 실패');
        const { job_id } = await r.json();
        this.activeJobId = job_id;
        await this.watchJob(job_id);
      } catch (e) {
        this.showToast(`파싱 오류: ${e.message}`, 'error');
        this.isParsingActive = false;
      }
    },

    // 분석 중지
    async cancelParse() {
      if (!this.activeJobId) { this.isParsingActive = false; return; }
      this.parseStep = '중지 중...';
      try {
        await fetch(`${API}/api/jobs/${this.activeJobId}/cancel`, { method: 'POST' });
      } catch (_) {}
      this.showToast(this.t('cancelDone'));
    },

    async watchJob(jobId) {
      const wsProto = location.protocol === 'https:' ? 'wss:' : 'ws:';
      const ws = new WebSocket(`${wsProto}//${location.host}/ws/jobs/${jobId}`);
      let wsOk = false;

      ws.onopen = () => { wsOk = true; };

      ws.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        this.parseProgress = data.progress || 0;
        this.parseStep = data.current_step || '';

        // ETA 계산
        const prog = this.parseProgress;
        if (prog > 0.03 && this.parseStartTime) {
          const elapsed = (Date.now() - this.parseStartTime) / 1000;
          const total = elapsed / prog;
          const rem = Math.max(0, total - elapsed);
          if (rem < 3) this.parseETA = '거의 완료...';
          else if (rem < 60) this.parseETA = `남은 시간 약 ${Math.round(rem)}초`;
          else this.parseETA = `남은 시간 약 ${Math.floor(rem/60)}분 ${Math.round(rem%60)}초`;
        } else {
          this.parseETA = '';
        }

        if (data.status === 'completed' || data.status === 'error' || data.status === 'cancelled') {
          ws.close();
          this.isParsingActive = false;
          this.activeJobId = null;
          this.parseETA = '';
          this.parseStartTime = null;
          await this.tryLoadCachedResult(this.activeResultParser);
          if (data.status === 'completed') {
            this.showToast(`${this.getParserName(this.activeResultParser)} ${this.t('analyzeDone')}`, 'success');
            // 레이아웃 확인을 위해 전체 페이지가 보이도록 높이맞춤
            this.$nextTick(() => { try { this.zoomFitHeight(); } catch(_) {} });
          } else if (data.status === 'cancelled') {
            this.showToast(this.t('cancelDone'));
          } else {
            this.showToast(this.t('analyzeError'), 'error');
          }
          this.parseProgress = 0;
          this.parseStep = '';
        }
      };

      ws.onerror = () => {
        if (!wsOk) this.pollJob(jobId);
      };

      ws.onclose = () => {
        if (!wsOk) this.pollJob(jobId);
      };
    },

    async pollJob(jobId) {
      const poll = async () => {
        try {
          const r = await fetch(`${API}/api/jobs/${jobId}`);
          const data = await r.json();
          this.parseProgress = data.progress || 0;
          this.parseStep = data.current_step || '';

          if (data.status === 'completed' || data.status === 'error' || data.status === 'cancelled') {
            this.isParsingActive = false;
            this.activeJobId = null;
            await this.tryLoadCachedResult(this.activeResultParser);
            if (data.status === 'completed') {
              this.showToast(`${this.getParserName(this.activeResultParser)} ${this.t('analyzeDone')}`, 'success');
            } else if (data.status === 'cancelled') {
              this.showToast(this.t('cancelDone'));
            }
            this.parseProgress = 0;
            this.parseStep = '';
            return;
          }
          setTimeout(poll, 600);
        } catch (e) {
          this.isParsingActive = false;
        }
      };
      setTimeout(poll, 300);
    },

    activeResult() {
      return this.activeResultParser ? this.parseResults[this.activeResultParser] : null;
    },

    // ════════════════════════════════════════════════════════════
    // PDF 뷰어 (연속 스크롤)
    // ════════════════════════════════════════════════════════════
    pageImageUrl(pageNum) {
      if (!this.selectedDoc) return '';
      const dpi = this.appSettings.global_settings.render_dpi || 150;
      return `${API}/api/documents/${this.selectedDoc.id}/page/${pageNum}?dpi=${dpi}`;
    },

    // 모든 페이지 치수를 한 번에 로드
    async loadAllDims() {
      if (!this.selectedDoc) return;
      try {
        const r = await fetch(`${API}/api/documents/${this.selectedDoc.id}/dimensions`);
        if (r.ok) {
          this.allDims = await r.json();
          // 첫 로드 시 폭 맞춤
          this.$nextTick(() => this.zoomFitWidth());
        }
      } catch (_) {}
    },

    // 페이지 래퍼 크기 (PDF 포인트 × 표시 스케일)
    pageWrapStyle(pageNum) {
      const d = this.allDims?.[pageNum];
      if (!d) return 'width:600px; height:800px;';
      const w = d.width * this.pdfScale;
      const h = d.height * this.pdfScale;
      return `width:${w}px; height:${h}px;`;
    },

    onPageImgLoad(pageNum, e) { /* 연속 스크롤에서는 별도 처리 불필요 */ },

    // 스크롤 시 현재 보이는 페이지 추적
    onScrollPages() {
      const scroller = document.getElementById('pdfScroller');
      if (!scroller) return;
      const wraps = scroller.querySelectorAll('.pdf-page-wrap');
      const mid = scroller.scrollTop + scroller.clientHeight / 2;
      let cur = 0;
      for (const w of wraps) {
        const top = w.offsetTop;
        const bot = top + w.offsetHeight;
        if (mid >= top && mid < bot) {
          cur = parseInt(w.dataset.page);
          break;
        }
        if (top > mid) break;
        cur = parseInt(w.dataset.page);
      }
      if (cur !== this.currentPage) {
        this.currentPage = cur;
        // 결과 패널의 요소 필터를 현재 페이지로 동기화
        const res = this.activeResult();
        if (res?.status === 'success' && (res.pages?.length || 0) > 1) {
          this.elemPageFilter = cur;
        }
      }
    },

    // 특정 페이지로 스크롤 이동
    scrollToPage(pageNum) {
      this.$nextTick(() => {
        const scroller = document.getElementById('pdfScroller');
        const wrap = scroller?.querySelector(`.pdf-page-wrap[data-page="${pageNum}"]`);
        if (wrap && scroller) {
          scroller.scrollTo({ top: wrap.offsetTop - 12, behavior: 'smooth' });
        }
      });
    },

    async prevPage() {
      if (this.currentPage > 0) { this.currentPage--; this.scrollToPage(this.currentPage); this.afterPageNav(); }
    },

    async nextPage() {
      if (this.currentPage < this.totalPages - 1) { this.currentPage++; this.scrollToPage(this.currentPage); this.afterPageNav(); }
    },

    afterPageNav() {
      this.selectedElementId = null;
      const res = this.activeResult();
      if (res?.status === 'success' && (res.pages?.length || 0) > 1) {
        this.elemPageFilter = this.currentPage;
      }
    },

    // 텍스트 탭에서 "=== 페이지 N ===" 위치로 스크롤
    scrollTextToPage(pageNum) {
      this.$nextTick(() => {
        if (this.resultTab !== 'text') return;
        const pre = document.querySelector('#resultText pre');
        if (!pre) return;
        const marker = `=== 페이지 ${pageNum + 1} ===`;
        const idx = pre.textContent.indexOf(marker);
        if (idx < 0) return;
        // 대략적 위치로 스크롤 (문자 비율 기반)
        const ratio = idx / pre.textContent.length;
        const scroller = pre.closest('.overflow-auto');
        if (scroller) scroller.scrollTop = ratio * scroller.scrollHeight;
      });
    },

    // ── PDF ↔ 결과 양방향 연동 ──────────────────────────────────
    async selectElement(elem, source) {
      this.selectedElementId = elem.id;

      if (source === 'list') {
        // 결과 목록 클릭 → PDF의 해당 페이지로 스크롤
        if (elem.bbox) {
          this.currentPage = elem.bbox.page;
          this.scrollToPage(elem.bbox.page);
        }
      } else if (source === 'overlay') {
        // PDF 오버레이 클릭 → 결과의 요소 목록 탭으로 전환 + 카드 스크롤
        this.resultTab = 'elements';
        if (elem.bbox) this.elemPageFilter = elem.bbox.page;
        this.$nextTick(() => {
          const card = document.getElementById(`elem-card-${elem.id}`);
          if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      }
    },

    // ── 줌 / 맞춤 ───────────────────────────────────────────────
    _scrollerSize() {
      const sc = document.getElementById('pdfScroller');
      // 레이아웃 전(너비 미확정)에는 폴백값 사용
      if (!sc || sc.clientWidth < 50) return { w: 600, h: 760, ready: false };
      return { w: sc.clientWidth - 28, h: sc.clientHeight - 28, ready: true };
    },

    _displayPct() {
      if (!this._fitWidthScale || this._fitWidthScale <= 0) return 100;
      const pct = Math.round(this.pdfScale / this._fitWidthScale * 100);
      return pct > 0 ? pct : 100;
    },

    zoomIn()  { this.pdfScale = Math.min(this.pdfScale * 1.2, 8.0); },
    zoomOut() { this.pdfScale = Math.max(this.pdfScale / 1.2, 0.05); },

    // 폭 맞춤: 가장 넓은 페이지 폭을 패널 너비에 맞춤
    zoomFitWidth() {
      if (!this.allDims?.length) return;
      const sz = this._scrollerSize();
      // 레이아웃이 준비될 때까지 재시도
      if (!sz.ready) { setTimeout(() => this.zoomFitWidth(), 80); return; }
      const maxW = Math.max(...this.allDims.map(d => d.width));
      const scale = sz.w / maxW;
      if (scale > 0) { this.pdfScale = scale; this._fitWidthScale = scale; }
    },

    // 높이 맞춤: 현재 페이지 높이를 패널 높이에 맞춤 (문서 비율 유지)
    zoomFitHeight() {
      if (!this.allDims?.length) return;
      const sz = this._scrollerSize();
      if (!sz.ready) { setTimeout(() => this.zoomFitHeight(), 80); return; }
      const d = this.allDims[this.currentPage] || this.allDims[0];
      const scale = sz.h / d.height;
      if (scale > 0) this.pdfScale = scale;
      if (!this._fitWidthScale || this._fitWidthScale <= 0) {
        this._fitWidthScale = sz.w / Math.max(...this.allDims.map(x => x.width));
      }
    },

    // ── 패널 리사이즈 ───────────────────────────────────────────
    startResize(e) {
      this._resizing = true;
      this._resizeStartX = e.clientX;
      this._resizeStartSplit = this.panelSplit;
      const onMove = (ev) => {
        if (!this._resizing) return;
        const container = document.querySelector('.viewer-panels');
        if (!container) return;
        const totalW = container.clientWidth;
        const dx = ev.clientX - this._resizeStartX;
        const newSplit = this._resizeStartSplit + (dx / totalW) * 100;
        this.panelSplit = Math.max(25, Math.min(75, newSplit));
      };
      const onUp = () => {
        this._resizing = false;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },

    // 특정 페이지의 오버레이 요소 (선택 파서만)
    getPageElements(parserId, pageNum) {
      const result = this.parseResults[parserId];
      if (!result?.pages) return [];
      const page = result.pages.find(p => p.page_num === pageNum);
      return (page?.elements || []).filter(e => e.bbox);
    },

    // 현재 페이지의 오버레이 요소 (범례용)
    getCurrentPageElements() {
      return this.getPageElements(this.activeResultParser, this.currentPage);
    },

    hasOverlayData() {
      return this.getCurrentPageElements().length > 0;
    },

    // 오버레이 박스 스타일 (퍼센트 기반 — 해상도/줌 독립적)
    getOverlayStylePct(elem, pageNum) {
      if (!elem.bbox) return 'display:none';
      const d = this.allDims?.[pageNum];
      if (!d || !d.width || !d.height) return 'display:none';

      const left = elem.bbox.x0 / d.width * 100;
      const top = elem.bbox.y0 / d.height * 100;
      const w = (elem.bbox.x1 - elem.bbox.x0) / d.width * 100;
      const h = (elem.bbox.y1 - elem.bbox.y0) / d.height * 100;

      const color = ELEMENT_COLORS[elem.type] || '#9CA3AF';
      const bgHex = Math.round(0.15 * 255).toString(16).padStart(2, '0');

      return `left:${left}%; top:${top}%; width:${w}%; height:${h}%; ` +
             `border-color:${color}; background:${color}${bgHex}; opacity:0.85;`;
    },

    getTooltipText(elem) {
      const typeLabel = ELEM_TYPE_LABELS[elem.type] || elem.type;
      const color = ELEMENT_COLORS[elem.type] || '';
      const bbox = elem.bbox
        ? `위치: (${Math.round(elem.bbox.x0)}, ${Math.round(elem.bbox.y0)}) → (${Math.round(elem.bbox.x1)}, ${Math.round(elem.bbox.y1)})`
        : '';
      const content = elem.content ? elem.content.substring(0, 300) : '(내용 없음)';
      return `[${typeLabel}] ${bbox}\n${content}`;
    },

    // 현재 페이지에서 사용된 요소 타입 목록 (범례용)
    usedElemTypes() {
      const elems = this.getCurrentPageElements();
      const typeSet = [...new Set(elems.map(e => e.type))];
      return typeSet.map(t => ({
        type: t,
        label: ELEM_TYPE_LABELS[t] || t,
        color: ELEMENT_COLORS[t] || '#9CA3AF',
      }));
    },

    getElemColor(type) {
      return ELEMENT_COLORS[type] || '#9CA3AF';
    },

    // ════════════════════════════════════════════════════════════
    // 요소 목록 필터
    // ════════════════════════════════════════════════════════════
    filteredElements() {
      const result = this.activeResult();
      if (!result?.elements) return [];
      return result.elements.filter(e => {
        if (this.elemPageFilter != -1 && e.bbox?.page !== parseInt(this.elemPageFilter)) return false;
        if (this.elemTypeFilter && e.type !== this.elemTypeFilter) return false;
        return true;
      });
    },

    getElemTypeLabel(type) { return ELEM_TYPE_LABELS[type] || type; },

    // ════════════════════════════════════════════════════════════
    // 레이아웃 미니맵
    // ════════════════════════════════════════════════════════════

    // bbox 데이터가 있는지 확인
    hasLayoutData() {
      const result = this.activeResult();
      return (result?.elements || []).some(e => e.bbox) ||
             (result?.pages || []).some(p => (p.elements || []).some(e => e.bbox));
    },

    // pages[] 또는 elements[]를 페이지별로 묶어 반환
    layoutPages() {
      const result = this.activeResult();
      if (!result) return [];

      // pages[]에 bbox 요소가 있으면 그대로 사용
      const fromPages = (result.pages || []).filter(p =>
        (p.elements || []).some(e => e.bbox)
      );
      if (fromPages.length) return fromPages;

      // fallback: elements[]를 bbox.page 기준으로 그룹핑
      const byPage = {};
      for (const e of (result.elements || [])) {
        if (!e.bbox) continue;
        const pn = e.bbox.page;
        if (!byPage[pn]) byPage[pn] = [];
        byPage[pn].push(e);
      }
      return Object.keys(byPage).map(Number).sort((a, b) => a - b).map(pn => ({
        page_num: pn,
        width:  this.allDims?.[pn]?.width  || 595,
        height: this.allDims?.[pn]?.height || 842,
        elements: byPage[pn],
      }));
    },

    // 사용된 요소 타입 목록 (범례용)
    layoutUsedTypes() {
      const result = this.activeResult();
      const elems = [
        ...(result?.elements || []),
        ...(result?.pages || []).flatMap(p => p.elements || []),
      ];
      const types = [...new Set(elems.filter(e => e.bbox).map(e => e.type))];
      return types.map(t => ({
        type: t,
        label: ELEM_TYPE_LABELS[t] || t,
        color: ELEMENT_COLORS[t] || '#9CA3AF',
      }));
    },

    // SVG 미니맵 문자열 생성 (x-html로 렌더링)
    layoutPageSvg(page) {
      const w = page.width  || 595;
      const h = page.height || 842;
      const escape = s => String(s).replace(/[<>&"]/g, c =>
        ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c])
      );
      const elems = (page.elements || []).filter(e => e.bbox);
      const rects = elems.map((e, i) => {
        const color = ELEMENT_COLORS[e.type] || '#9CA3AF';
        const { x0, y0, x1, y1 } = e.bbox;
        const bw = Math.max(x1 - x0, 1), bh = Math.max(y1 - y0, 1);
        const cx = x0 + bw / 2, cy = y0 + bh / 2;
        const label = escape((ELEM_TYPE_LABELS[e.type] || e.type) + ': ' + (e.content || '').substring(0, 60));
        const fs = Math.max(7, Math.min(11, bh * 0.45));
        const numTag = (bw > 18 && bh > 9)
          ? `<text x="${cx}" y="${cy + fs * 0.38}" font-size="${fs}" fill="${color}" text-anchor="middle" dominant-baseline="middle" style="font-family:sans-serif;font-weight:600;pointer-events:none">${i + 1}</text>`
          : '';
        return `<rect x="${x0}" y="${y0}" width="${bw}" height="${bh}" fill="${color}30" stroke="${color}" stroke-width="1.5" rx="2"><title>${label}</title></rect>${numTag}`;
      }).join('');
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" style="width:100%;height:100%;display:block"><rect width="${w}" height="${h}" fill="white"/>${rects}</svg>`;
    },

    // ── 미디어 ───────────────────────────────────────────────────
    filteredMedia() {
      const result = this.activeResult();
      if (!result?.media) return [];
      return result.media.filter(m => !this.mediaTypeFilter || m.type === this.mediaTypeFilter);
    },

    openMedia(m) { this.mediaPopup = m; },

    // ── 오류 표시 ───────────────────────────────────────────────
    errorPopup: null,
    openError(result) { if (result) this.errorPopup = result; },

    // 오류 한 줄 요약 (긴 트레이스백에서 핵심만)
    errorSummary(err) {
      if (!err) return '알 수 없는 오류';
      const line = String(err).split('\n').filter(l => l.trim()).pop() || String(err);
      return line.length > 120 ? line.slice(0, 120) + '…' : line;
    },

    // 오류 패턴별 추정 원인/해결 힌트
    errorHint(err) {
      const e = String(err || '').toLowerCase();
      if (e.includes('api') && e.includes('key')) return 'API 키가 없거나 잘못되었습니다. 설정 → LLM 인증에서 올바른 키를 입력하세요.';
      if (e.includes('not_installed') || e.includes('no module') || e.includes('modulenotfound')) return '필요한 라이브러리가 설치되지 않았습니다. 아래 설치 명령을 실행하세요.';
      if (e.includes('cuda') || e.includes('gpu')) return 'GPU(CUDA)가 필요한 파서입니다. CPU만 있는 환경에서는 사용할 수 없거나 매우 느립니다.';
      if (e.includes('poppler')) return 'poppler가 설치되지 않았습니다. `brew install poppler` (Mac) 또는 패키지 매니저로 설치하세요.';
      if (e.includes('tesseract')) return 'Tesseract OCR이 설치되지 않았습니다. `brew install tesseract tesseract-lang`를 실행하세요.';
      if (e.includes('ghostscript') || e.includes('gs ')) return 'Ghostscript가 필요하거나 버전이 낮습니다. `brew install ghostscript`로 최신 버전을 설치하세요.';
      if (e.includes('java') || e.includes('jvm')) return 'Java(JDK)가 필요합니다 (tabula-py). JDK를 설치하세요.';
      if (e.includes('timeout') || e.includes('connection')) return '네트워크 연결 또는 서버 응답 시간 초과입니다. (Ollama 서버 실행 여부, API 응답 확인)';
      if (e.includes('memory') || e.includes('oom')) return '메모리 부족입니다. 페이지 범위를 좁히거나 더 가벼운 파서를 사용하세요.';
      if (e.includes('password') || e.includes('encrypt')) return 'PDF가 암호화되어 있습니다. 암호를 해제한 PDF로 시도하세요.';
      return '예기치 못한 오류입니다. 아래 원본 메시지를 확인하거나 GitHub 이슈를 참고하세요.';
    },

    async copyError() {
      if (!this.errorPopup) return;
      await navigator.clipboard.writeText(this.errorPopup.error || '');
      this.showToast('오류 메시지 복사됨');
    },

    // 요소에 대응하는 미디어(썸네일) 찾기.
    // 썸네일은 '미디어 타입' 요소(그림/표/차트/수식)에만 표시 — 텍스트/제목엔 안 보임
    elemMedia(elem) {
      const result = this.activeResult();
      if (!result?.media || !elem?.bbox) return null;
      const MEDIA = ['image', 'table', 'chart', 'formula'];
      if (!MEDIA.includes(elem.type)) return null;   // 텍스트/제목 등은 제외
      // 1) id 직접 일치 (파서 감지 미디어)
      let m = result.media.find(m => m.id === elem.id);
      if (m) return m;
      // 2) 같은 페이지에서 bbox가 가장 많이 겹치는 미디어 (같은 타입 우선)
      const e = elem.bbox;
      const ea = Math.max(1, (e.x1 - e.x0) * (e.y1 - e.y0));
      let best = null, bestRatio = 0;
      for (const md of result.media) {
        if (!md.bbox || md.bbox.page !== e.page) continue;
        const ix0 = Math.max(e.x0, md.bbox.x0), iy0 = Math.max(e.y0, md.bbox.y0);
        const ix1 = Math.min(e.x1, md.bbox.x1), iy1 = Math.min(e.y1, md.bbox.y1);
        if (ix1 <= ix0 || iy1 <= iy0) continue;
        const ratio = ((ix1 - ix0) * (iy1 - iy0)) / ea;   // 요소가 미디어에 얼마나 포함되는지
        // 요소의 70% 이상이 미디어 안에 있을 때만 (큰 배경이미지에 텍스트가 걸치는 것 방지는 타입필터로 처리됨)
        if (ratio > 0.5 && ratio > bestRatio) { best = md; bestRatio = ratio; }
      }
      return best;
    },

    // ════════════════════════════════════════════════════════════
    // 마크다운 렌더링 (간이 변환)
    // ════════════════════════════════════════════════════════════
    renderMd(text) {
      if (!text) return '';
      // marked.js로 GFM(표/코드/리스트/링크) 렌더링
      if (window.marked) {
        try { return window.marked.parse(text, { gfm: true, breaks: true }); }
        catch (_) { /* 아래 간이 변환으로 폴백 */ }
      }
      // 이미지 마크다운은 HTML 이스케이프 전에 플레이스홀더로 보호
      const imgs = [];
      text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (m, alt, src) => {
        const i = imgs.length;
        imgs.push(`<img src="${src}" alt="${alt}" class="md-img" loading="lazy">`);
        return ` IMG${i} `;
      });
      let html = text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/^#{3}\s(.+)$/gm, '<h3>$1</h3>')
        .replace(/^#{2}\s(.+)$/gm, '<h2>$1</h2>')
        .replace(/^#{1}\s(.+)$/gm, '<h1>$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/^\s*[-*]\s(.+)$/gm, '<li>$1</li>')
        .replace(/\n\n+/g, '</p><p>')
        .replace(/\n/g, '<br>');
      // 플레이스홀더를 이미지 태그로 복원
      html = html.replace(/ IMG(\d+) /g, (m, i) => imgs[+i] || '');
      return html;
    },

    // ════════════════════════════════════════════════════════════
    // 결과 복사
    // ════════════════════════════════════════════════════════════
    async copyResult() {
      const result = this.activeResult();
      if (!result) return;
      const text = this.resultTab === 'markdown' ? result.markdown : result.text;
      await navigator.clipboard.writeText(text || '');
      this.showToast('클립보드에 복사됨');
    },

    // ════════════════════════════════════════════════════════════
    // 파서 추천
    // ════════════════════════════════════════════════════════════
    async goAnalysis() {
      // 문서 미선택이어도 추천 화면 진입 (문서 선택 안내 표시)
      this.view = 'analysis';
      if (!this.selectedDoc) { this.analysisReport = null; return; }
      this.analysisLoading = true;
      this.analysisReport = null;
      try {
        const r = await fetch(`${API}/api/documents/${this.selectedDoc.id}/analysis`);
        this.analysisReport = await r.json();
      } catch (e) {
        this.showToast('분석 로드 실패', 'error');
      } finally {
        this.analysisLoading = false;
      }
    },

    // 빠른/심층 분석 재실행
    async runAnalysis(deep) {
      if (!this.selectedDoc || this.analysisLoading) return;
      this.isDeepAnalysis = deep;
      this.analysisLoading = true;
      if (deep) this.showToast('심층 분석 중... 스캔 문서는 OCR로 10~30초 소요됩니다.');
      try {
        const r = await fetch(`${API}/api/documents/${this.selectedDoc.id}/analysis/refresh?deep=${deep}`, { method: 'POST' });
        this.analysisReport = await r.json();
      } catch (e) {
        this.showToast('분석 실패', 'error');
      } finally {
        this.analysisLoading = false;
      }
    },

    useRecommendedParser(parserId) {
      const p = this.parsersInfo.find(p => p.parser_id === parserId);
      if (!p?.is_available) {
        this.showToast(`미설치: ${p?.install_command}`, 'error');
        return;
      }
      this.activeResultParser = parserId;
      this.view = 'viewer';
      this.showToast(`${p.parser_name} 선택됨. ▶ 분석을 눌러주세요.`);
    },

    getTierLabel(tier) { return TIER_LABELS[tier] || tier; },

    // 추천 목록 정렬 + 필터
    sortedRecommendations() {
      let recs = [...(this.analysisReport?.recommendations || [])];
      // 능력 필터 (파서 정보와 결합)
      const cap = this.recCapFilter;
      if (cap) {
        recs = recs.filter(r => {
          const p = this.parsersInfo.find(p => p.parser_id === r.parser_id);
          if (!p) return false;
          if (cap === 'installed') return p.is_available;
          if (cap === 'tables') return p.supports_tables;
          if (cap === 'bbox') return p.supports_bbox;
          if (cap === 'ocr') return p.supports_ocr;
          if (cap === 'formulas') return p.supports_formulas;
          return true;
        });
      }
      // 정렬
      if (this.recSort === 'name') {
        recs.sort((a, b) => a.parser_name.localeCompare(b.parser_name));
      } else if (this.recSort === 'category') {
        recs.sort((a, b) => {
          const ca = this.parsersInfo.find(p => p.parser_id === a.parser_id)?.category || '';
          const cb = this.parsersInfo.find(p => p.parser_id === b.parser_id)?.category || '';
          return ca.localeCompare(cb) || b.score - a.score;
        });
      } else {
        recs.sort((a, b) => b.score - a.score);
      }
      return recs;
    },

    // 파서 정보 카드로 이동 + 강조
    gotoParserInfo(parserId) {
      this.view = 'parsers';
      this.parserSearch = '';   // 검색 초기화로 대상이 보이게
      this.highlightedParserId = parserId;
      this.$nextTick(() => {
        const el = document.getElementById(`parser-${this.parserView}-${parserId}`)
                || document.getElementById(`parser-card-${parserId}`)
                || document.getElementById(`parser-row-${parserId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      setTimeout(() => { this.highlightedParserId = null; }, 2500);
    },

    goViewer() {
      if (!this.selectedDoc) return;
      this.view = 'viewer';
    },

    // ════════════════════════════════════════════════════════════
    // 설정
    // ════════════════════════════════════════════════════════════
    async loadSettings() {
      try {
        const r = await fetch(`${API}/api/settings`);
        if (r.ok) {
          const s = await r.json();
          if (s && Object.keys(s).length > 0) {
            this.appSettings = { ...this.appSettings, ...s };
          }
        }
      } catch (_) {}
    },

    async saveSettings(silent = false) {
      try {
        await fetch(`${API}/api/settings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.appSettings),
        });
        if (!silent) this.showToast('설정 저장 완료', 'success');
      } catch (e) {
        if (!silent) this.showToast('설정 저장 실패', 'error');
      }
    },

    resetSettings() {
      this.appSettings = {
        global_settings: { default_language: 'ko', use_gpu: false, render_dpi: 150 },
        parser_settings: {},
      };
    },

    // 설정이 있는 설치된 파서 목록 (파서별 설정 탭용)
    settingsParsers() {
      return (this.parsersInfo || []).filter(p =>
        p.is_available && p.settings_schema && Object.keys(p.settings_schema).length > 0);
    },
    // 현재 선택된 파서별 설정 탭 id (없거나 유효하지 않으면 첫 파서)
    activeSettingsParserId() {
      const list = this.settingsParsers();
      if (!list.length) return '';
      if (this.settingsParserId && list.some(p => p.parser_id === this.settingsParserId))
        return this.settingsParserId;
      return list[0].parser_id;
    },

    getParserSetting(parserId, key, defaultVal) {
      return this.appSettings.parser_settings[parserId]?.[key] ?? defaultVal;
    },

    setParserSetting(parserId, key, value) {
      if (!this.appSettings.parser_settings[parserId]) {
        this.appSettings.parser_settings[parserId] = {};
      }
      this.appSettings.parser_settings[parserId][key] = value;
    },

    // ════════════════════════════════════════════════════════════
    // 유틸리티
    // ════════════════════════════════════════════════════════════
    formatSize(bytes) {
      if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + 'MB';
      if (bytes >= 1024) return (bytes / 1024).toFixed(0) + 'KB';
      return bytes + 'B';
    },

    showToast(message, type = '') {
      clearTimeout(this._toastTimer);
      this.toast = { show: true, message, type };
      this._toastTimer = setTimeout(() => { this.toast.show = false; }, 3500);
      // 하단 상태바에도 반영하되, 사용자가 인지할 시간(6초) 후 '준비됨'으로 복귀
      this.setStatus(message, true);
    },

    // 하단 상태바 메시지 설정. autoClear=true면 잠시 후 '준비됨'으로 복귀
    setStatus(message, autoClear = false) {
      this.statusMessage = message;
      clearTimeout(this._statusTimer);
      if (autoClear) {
        this._statusTimer = setTimeout(() => {
          if (!this.isParsingActive) this.statusMessage = '준비됨';
        }, 6000);
      }
    },
  };
}
