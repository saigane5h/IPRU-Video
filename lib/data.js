const GCC_POOL = [
  'gcc-3048f3df-f2d0-419c-a8c1-c84a660f8897',
  'gcc-a97a3c26-7011-4312-85a3-f0724dad58e5',
  'gcc-5ef75afa-e47b-4863-bb23-09c5234b4dda',
  'gcc-6d7af790-a531-4f15-8754-0f20f6b9ed16',
  'gcc-82d391a1-3f49-49d2-b48d-06eabd01a95d',
  'gcc-54b5a773-f6df-4b1b-a23d-ab77cf1a2a3a',
]

const pickGcc = (i) => GCC_POOL[i % GCC_POOL.length]

export const featuredVideos = [
  {
    id: 'v1', gccId: pickGcc(0),
    title: 'What is life insurance and why do you need it?',
    seriesId: 'life-basics', duration: '3:24',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    tag: 'Basics', tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'v2', gccId: pickGcc(1),
    title: 'Term vs ULIP — what\'s the real difference?',
    seriesId: 'choosing-plan', duration: '4:10',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    tag: 'Planning', tagColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'v3', gccId: pickGcc(2),
    title: 'How the life insurance claim process works',
    seriesId: 'claims-guide', duration: '3:55',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80',
    tag: 'Claims', tagColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'v4', gccId: pickGcc(3),
    title: 'How much life cover does your family actually need?',
    seriesId: 'life-basics', duration: '4:22',
    thumbnail: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&q=80',
    tag: 'Must know', tagColor: 'bg-red-100 text-red-700',
  },
  {
    id: 'v5', gccId: pickGcc(4),
    title: 'Understanding fund performance in ULIPs',
    seriesId: 'investments', duration: '2:58',
    thumbnail: 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=600&q=80',
    tag: 'Investments', tagColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'v6', gccId: pickGcc(5),
    title: 'Pre-existing conditions & waiting periods — know your rights',
    seriesId: 'life-basics', duration: '3:55',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    tag: 'Must know', tagColor: 'bg-red-100 text-red-700',
  },
  {
    id: 'v7', gccId: pickGcc(0),
    title: 'Critical illness cover — cancer, heart attack, stroke explained',
    seriesId: 'critical-illness', duration: '4:05',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    tag: 'Critical illness', tagColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'v8', gccId: pickGcc(1),
    title: 'How 80C & 10(10D) tax benefits work on life insurance',
    seriesId: 'tax-cover', duration: '3:30',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    tag: 'Tax & cover', tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'm1', gccId: pickGcc(2),
    title: 'Do life insurance companies actually pay claims?',
    seriesId: 'myths', duration: '2:45',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    tag: 'Myth busted', tagColor: 'bg-red-100 text-red-700',
  },
  {
    id: 'm2', gccId: pickGcc(3),
    title: 'Is term insurance really a waste if you don\'t die?',
    seriesId: 'myths', duration: '3:10',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    tag: 'Myth busted', tagColor: 'bg-red-100 text-red-700',
  },
  {
    id: 'm3', gccId: pickGcc(4),
    title: 'Can I have more than one life insurance policy?',
    seriesId: 'myths', duration: '2:20',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    tag: 'FAQ', tagColor: 'bg-gray-100 text-gray-600',
  },
  {
    id: 'm4', gccId: pickGcc(5),
    title: 'What happens to my policy if I stop paying premiums?',
    seriesId: 'myths', duration: '3:05',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80',
    tag: 'FAQ', tagColor: 'bg-gray-100 text-gray-600',
  },
]

export const videoSeries = [
  { id: 'life-basics', title: 'Life Insurance Basics', subtitle: 'What every Indian family needs to know', thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80', videos: 5, tag: 'Start Here', tagColor: 'bg-ipru-maroon text-white' },
  { id: 'claims-guide', title: 'How Claims Work', subtitle: 'Process, documents, timelines', thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80', videos: 4, tag: 'Claims', tagColor: 'bg-green-600 text-white' },
  { id: 'choosing-plan', title: 'Choosing the Right Plan', subtitle: 'Term, ULIP, savings, pension', thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80', videos: 4, tag: 'Planning', tagColor: 'bg-purple-600 text-white' },
  { id: 'critical-illness', title: 'Critical Illness Cover', subtitle: 'Cancer, heart attack, stroke and more', thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80', videos: 3, tag: 'Important', tagColor: 'bg-amber-500 text-white' },
  { id: 'investments', title: 'ULIPs & Fund Performance', subtitle: 'Market-linked returns explained', thumbnail: 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=600&q=80', videos: 3, tag: 'Investments', tagColor: 'bg-green-600 text-white' },
  { id: 'tax-cover', title: 'Tax & Life Insurance', subtitle: '80C, 10(10D), GST exemption', thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80', videos: 3, tag: 'Tax', tagColor: 'bg-blue-600 text-white' },
  { id: 'retirement', title: 'Retirement Planning', subtitle: 'Annuity, pension, guaranteed income', thumbnail: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&q=80', videos: 3, tag: 'Retirement', tagColor: 'bg-ipru-orange text-white' },
  { id: 'myths', title: 'Myths & FAQs', subtitle: 'Real questions, no sales pitch', thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', videos: 4, tag: 'Myth busted', tagColor: 'bg-ipru-red text-white' },
]

export const policyVideos = [
  {
    id: 'policy-1', gccId: pickGcc(0),
    title: 'GST on life insurance removed — what it means for your premium',
    date: 'May 2025', duration: '4:30',
    tag: 'Regulatory Update', tagColor: 'bg-red-50 text-red-700',
    summary: 'The GST exemption on life insurance premiums has been extended. Here\'s exactly how much you save.',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
  },
  {
    id: 'policy-2', gccId: pickGcc(1),
    title: 'IRDAI\'s new claim settlement rules — your rights explained',
    date: 'April 2025', duration: '5:00',
    tag: 'Policy Change', tagColor: 'bg-amber-50 text-amber-700',
    summary: 'New IRDAI rules require claim settlement within 30 days. What this means for nominees.',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80',
  },
  {
    id: 'policy-3', gccId: pickGcc(2),
    title: 'Budget 2026 — how the new 80C changes affect life insurance',
    date: 'Feb 2026', duration: '3:50',
    tag: 'Budget Update', tagColor: 'bg-blue-50 text-blue-700',
    summary: 'The Union Budget revised Section 80C limits. Here\'s how the changes affect your deductions.',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
  },
  {
    id: 'policy-4', gccId: pickGcc(3),
    title: 'Insurance for All by 2047 — what the government\'s plan means',
    date: 'March 2025', duration: '4:15',
    tag: 'Government Scheme', tagColor: 'bg-green-50 text-green-700',
    summary: 'The government\'s universal insurance programme — what it means for coverage and pricing.',
    thumbnail: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&q=80',
  },
]

export const shortReels = [
  { id: 'gcc-b95dd34d-81ca-424a-b9a4-05fe1df79a3c', title: 'What is Term Insurance?', duration: '0:32' },
  { id: 'gcc-cf479c95-9a01-4a71-8f2e-69a5da14833d', title: 'How to File a Claim in 3 Steps', duration: '0:45' },
  { id: 'gcc-b7ac4612-c863-4fe4-a12d-d6e034d1857a', title: 'ULIP vs Term — Which is Better?', duration: '0:28' },
  { id: 'gcc-6991f4ee-e383-4826-b6d8-92b3afbb20d9', title: 'Critical Illness — Are You Covered?', duration: '0:38' },
  { id: 'gcc-7ed6a23c-5420-4cbf-861c-93f61c018aef', title: 'Tax Savings on Life Insurance', duration: '0:41' },
]

export const categories = ['All', 'Basics', 'Claims', 'Planning', 'Critical illness', 'Investments', 'Must know', 'Tax & cover', 'Myth busted']

export const portalPolicies = [
  {
    id: 'pol-iprotect',
    policyNo: '20616674',
    planName: 'ICICI Pru iProtect Smart',
    type: 'TERM',
    status: 'Premium Paying',
    insuredName: 'Amit Verma',
    sumAssured: '₹1,00,00,000',
    premium: '₹9,200',
    premiumCadence: 'year',
    endDate: 'Ends: 20 Mar 2062',
    gccId: GCC_POOL[0],
  },
  {
    id: 'pol-wealth',
    policyNo: '20891245',
    planName: 'ICICI Pru Signature',
    type: 'ULIP',
    status: 'Premium Paying',
    insuredName: 'Amit Verma',
    sumAssured: '₹25,00,000',
    premium: '₹15,000',
    premiumCadence: 'month',
    premiumDue: 'Premium due',
    nudge: 'Your fund value has grown 18.2% this year',
    gccId: GCC_POOL[1],
  },
]

export const portalUser = {
  totalSumAssured: '₹1,25,00,000',
  activeCount: 2,
  ulip: 1,
  term: 1,
}

export const personalisedShorts = [
  { id: 'gcc-b95dd34d-81ca-424a-b9a4-05fe1df79a3c', title: 'Why your term cover needs review', duration: '0:58' },
  { id: 'gcc-cf479c95-9a01-4a71-8f2e-69a5da14833d', title: 'ULIP fund switching strategies', duration: '1:12' },
  { id: 'gcc-b7ac4612-c863-4fe4-a12d-d6e034d1857a', title: 'Add critical illness rider now', duration: '0:45' },
  { id: 'gcc-6991f4ee-e383-4826-b6d8-92b3afbb20d9', title: 'Retirement planning with annuity', duration: '1:30' },
  { id: 'gcc-7ed6a23c-5420-4cbf-861c-93f61c018aef', title: 'Tax savings with your ICICI Pru plan', duration: '0:52' },
]

export const coverageGaps = [
  { category: 'Health Insurance', covered: false, icon: '🏥',
    gccId: GCC_POOL[2], title: 'Why Health Insurance is non-negotiable',
    desc: 'Medical inflation is 14% per year. Without cover, one hospitalisation can wipe out years of savings.',
    product: 'ICICI Pru Health Protect', premium: 'from ₹450/month' },
  { category: 'Savings Plan', covered: false, icon: '💰',
    gccId: GCC_POOL[3], title: 'Guaranteed savings — secure your future',
    desc: 'Disciplined savings with guaranteed returns. Perfect for medium-term goals.',
    product: 'ICICI Pru Guaranteed Income', premium: 'from ₹5,000/month' },
  { category: 'Annuity/Pension', covered: false, icon: '🏡',
    gccId: GCC_POOL[4], title: 'Guaranteed pension — never run out of money',
    desc: 'A monthly income for life after retirement. Start early, retire rich.',
    product: 'ICICI Pru Easy Retirement', premium: 'from ₹3,000/month' },
]

export const othersAlsoBought = [
  { id: 'rec-1', gccId: GCC_POOL[0], title: 'Critical Illness Rider', desc: '68% of iProtect Smart holders added this rider within 6 months', tag: 'Most Popular', premium: '₹1,500/yr extra' },
  { id: 'rec-2', gccId: GCC_POOL[1], title: 'Accidental Death Benefit', desc: '₹50 lakh additional cover for just ₹700/year', tag: 'Best Value', premium: '₹700/yr extra' },
  { id: 'rec-3', gccId: GCC_POOL[2], title: 'Waiver of Premium Rider', desc: 'Premiums waived if you become disabled — your family stays protected', tag: 'Recommended', premium: '₹1,100/yr extra' },
  { id: 'rec-4', gccId: GCC_POOL[3], title: 'Income Benefit on Death', desc: 'Monthly income to your family on top of lump sum — 42% added this', tag: 'Trending', premium: '₹2,400/yr extra' },
]

export const userOffers = [
  { id: 'offer-1', title: 'Increase your term cover to ₹2 Cr', desc: 'Your income has grown 40% since you bought. Your cover should too.', gccId: GCC_POOL[0], tag: 'Cover Review', cta: 'Watch & Decide' },
  { id: 'offer-2', title: 'Tax deadline approaching — save ₹46,800', desc: 'Max out Section 80C before March 31. Here\'s exactly how much more you can invest.', gccId: GCC_POOL[1], tag: 'Tax Saving', cta: 'See How' },
  { id: 'offer-3', title: 'Birthday special: 10% off new policies', desc: 'Valid for 30 days from your birthday. Add a savings plan at a discount.', gccId: GCC_POOL[2], tag: 'Special Offer', cta: 'Explore' },
]

export const supportVideos = [
  { id: 'sup-1', gccId: GCC_POOL[0], title: 'How to update your nominee in 2 minutes', duration: '2:15', tag: 'Quick Guide' },
  { id: 'sup-2', gccId: GCC_POOL[1], title: 'How to download your premium certificate', duration: '1:45', tag: 'Quick Guide' },
  { id: 'sup-3', gccId: GCC_POOL[2], title: 'Understanding your policy document', duration: '4:30', tag: 'Deep Dive' },
  { id: 'sup-4', gccId: GCC_POOL[3], title: 'How to file a claim — step by step', duration: '5:00', tag: 'Must Watch' },
  { id: 'sup-5', gccId: GCC_POOL[4], title: 'Checking your ULIP fund value online', duration: '1:30', tag: 'Quick Guide' },
]

export const userLevels = [
  { id: 'new', label: 'New to Insurance', desc: 'Just bought your first policy', icon: '🌱', videos: ['v1', 'v3', 'm1'] },
  { id: 'moderate', label: 'Growing Your Cover', desc: 'Have 1-2 policies, exploring more', icon: '📊', videos: ['v2', 'v4', 'v7'] },
  { id: 'advanced', label: 'Advanced Planning', desc: 'Optimising cover, tax, and riders', icon: '🎯', videos: ['v8', 'v5', 'v6'] },
]
