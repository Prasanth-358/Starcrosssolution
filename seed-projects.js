require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const demoProjects = [
  {
    title: 'Enterprise Management System',
    slug: 'enterprise-management',
    client: 'ILLUSTRATIVE PROJECT / NOT CLIENT WORK',
    description: 'A centralized digital platform that connects business operations, reporting, workflows and decision-making in one place.',
    tech_stack: ['ERP', 'DASHBOARD', 'AUTOMATION'],
    testimonial: "Working with Procomets felt like having an internal team rather than an external agency. They were proactive, detail-oriented, and genuinely invested in our outcome.",
    metrics: {
      testimonial_author: "Daniel Morgan",
      testimonial_role: "Product Director at TechPulse",
      testimonial_logo_url: "https://i.pravatar.cc/150?u=daniel"
    },
    images: ['window-wireframe'],
    featured: true
  },
  {
    title: 'Mobile Product Experience',
    slug: 'mobile-product',
    client: 'ILLUSTRATIVE PROJECT / NOT CLIENT WORK',
    description: 'A clean mobile experience focused on simple navigation, fast interactions and a scalable product foundation.',
    tech_stack: ['MOBILE', 'UI/UX', 'API'],
    testimonial: "The team delivered a beautiful, highly performant mobile app that perfectly captured our brand's essence. Their attention to detail is unmatched.",
    metrics: {
      testimonial_author: "Sarah Jenkins",
      testimonial_role: "CEO of BloomTech",
      testimonial_logo_url: "https://i.pravatar.cc/150?u=sarah"
    },
    images: ['phone-wireframe'],
    featured: true
  },
  {
    title: 'Intelligent Analytics Dashboard',
    slug: 'intelligent-analytics',
    client: 'ILLUSTRATIVE PROJECT / NOT CLIENT WORK',
    description: 'A unified data visualization suite leveraging AI to transform raw metrics into actionable business intelligence.',
    tech_stack: ['DATA', 'VISUALIZATION', 'AI'],
    testimonial: "They took our complex data requirements and turned them into an intuitive, blazing-fast dashboard. It completely transformed how we operate.",
    metrics: {
      testimonial_author: "Marcus Chen",
      testimonial_role: "Head of Data at FinServe",
      testimonial_logo_url: "https://i.pravatar.cc/150?u=marcus"
    },
    images: ['dashboard-wireframe'],
    featured: true
  },
  {
    title: 'Fintech Banking App',
    slug: 'fintech-banking-app',
    client: 'ILLUSTRATIVE PROJECT / NOT CLIENT WORK',
    description: 'A modern consumer banking application featuring real-time peer-to-peer transfers, investment tracking, and a dynamic rewards system.',
    tech_stack: ['REACT NATIVE', 'NODE', 'FINTECH'],
    testimonial: "Security and speed were our top priorities. The final product exceeded all our expectations and gave our users a flawless banking experience.",
    metrics: {
      testimonial_author: "Elena Rodriguez",
      testimonial_role: "VP of Product at NexusBank",
      testimonial_logo_url: "https://i.pravatar.cc/150?u=elena"
    },
    images: ['phone-wireframe'],
    featured: true
  },
  {
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    client: 'ILLUSTRATIVE PROJECT / NOT CLIENT WORK',
    description: 'A high-performance headless commerce ecosystem built to handle extreme traffic spikes with sub-second page loads and seamless checkout.',
    tech_stack: ['NEXT.JS', 'COMMERCE', 'STRIPE'],
    testimonial: "Our conversion rates skyrocketed by 40% after the redesign. The headless architecture is incredibly fast and easy for our team to manage.",
    metrics: {
      testimonial_author: "James Wilson",
      testimonial_role: "Founder of StyleBrand",
      testimonial_logo_url: "https://i.pravatar.cc/150?u=james"
    },
    images: ['window-wireframe'],
    featured: true
  }
];

async function seed() {
  console.log('Seeding demo projects...');
  const { error: deleteError } = await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  if (deleteError) {
    console.error('Error clearing old projects:', deleteError.message);
  }

  const { data, error } = await supabase.from('projects').insert(demoProjects).select();

  if (error) {
    console.error('Error inserting demo projects:', error.message);
  } else {
    console.log('Successfully inserted', data.length, 'demo projects!');
  }
}

seed();
