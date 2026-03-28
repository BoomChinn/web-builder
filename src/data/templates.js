function id() {
  return Math.random().toString(36).substr(2, 9);
}

export const templates = [
  {
    id: 'corporate-1',
    category: 'Corporate / Business',
    name: 'Professional Corp',
    description: 'Clean and modern business template with strong CTAs.',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop',
    sections: [
      {
        id: id(), type: 'header',
        data: {
          logoText: 'NexaCorp',
          menuItems: ['Home', 'About', 'Services', 'Blog', 'Contact'],
          ctaLabel: 'Get Started',
        },
      },
      {
        id: id(), type: 'hero',
        data: {
          heading: 'Drive Your Business Forward',
          subheading: 'We deliver innovative solutions that help enterprises scale with confidence and clarity.',
          ctaPrimary: 'Get Started',
          ctaSecondary: 'Learn More',
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
        },
      },
      {
        id: id(), type: 'features',
        data: {
          heading: 'Why Choose Us',
          subheading: 'Everything you need to succeed in the modern market.',
          features: [
            { icon: '🚀', title: 'Fast Delivery', description: 'Ship products and features at lightning speed without sacrificing quality.' },
            { icon: '🛡️', title: 'Enterprise Security', description: 'Bank-grade encryption and compliance built into every layer.' },
            { icon: '📊', title: 'Analytics Dashboard', description: 'Real-time insights and reporting to keep you ahead.' },
            { icon: '🤝', title: 'Dedicated Support', description: '24/7 expert support for all your critical business needs.' },
            { icon: '🌐', title: 'Global Reach', description: 'Serve customers in 150+ countries with localized experiences.' },
            { icon: '⚙️', title: 'Easy Integration', description: 'Connect with 200+ tools and platforms out of the box.' },
          ],
        },
      },
      {
        id: id(), type: 'testimonials',
        data: {
          heading: 'Trusted by Industry Leaders',
          testimonials: [
            { name: 'Sarah Chen', role: 'CTO, NexaCorp', text: 'This platform transformed how we operate. Incredible results in just 3 months.', avatar: 'https://i.pravatar.cc/60?img=47' },
            { name: 'James Mitchell', role: 'CEO, Pinnacle Group', text: 'The best investment we made this year. Our team productivity doubled.', avatar: 'https://i.pravatar.cc/60?img=12' },
            { name: 'Priya Nair', role: 'VP Engineering, Axiom', text: 'Rock-solid reliability and a team that truly cares about our success.', avatar: 'https://i.pravatar.cc/60?img=32' },
          ],
        },
      },
      {
        id: id(), type: 'pricing',
        data: {
          heading: 'Simple, Transparent Pricing',
          subheading: 'Choose the plan that fits your business.',
          plans: [
            { name: 'Starter', price: '$29', period: '/mo', features: ['5 Projects', '10GB Storage', 'Email Support', 'API Access'], highlighted: false },
            { name: 'Pro', price: '$79', period: '/mo', features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'API Access', 'Analytics'], highlighted: true },
            { name: 'Enterprise', price: '$199', period: '/mo', features: ['Everything in Pro', 'SSO & SAML', 'Dedicated Manager', 'SLA Guarantee', 'Custom Integrations'], highlighted: false },
          ],
        },
      },
      {
        id: id(), type: 'footer',
        data: {
          companyName: 'NexaCorp',
          tagline: 'Building the future of enterprise software.',
          links: [
            { label: 'About', href: '#' },
            { label: 'Careers', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Privacy', href: '#' },
            { label: 'Terms', href: '#' },
          ],
          copyright: '© 2025 NexaCorp. All rights reserved.',
        },
      },
    ],
  },
  {
    id: 'ecommerce-1',
    category: 'E-commerce',
    name: 'ShopNow Store',
    description: 'High-converting e-commerce layout with featured products.',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
    sections: [
      {
        id: id(), type: 'header',
        data: {
          logoText: 'ShopNow',
          menuItems: ['New Arrivals', 'Women', 'Men', 'Sale', 'About'],
          ctaLabel: 'Shop Now',
        },
      },
      {
        id: id(), type: 'hero',
        data: {
          heading: 'Shop the Latest Trends',
          subheading: 'Discover curated collections that define modern style. Free shipping on orders over $50.',
          ctaPrimary: 'Shop Now',
          ctaSecondary: 'View Collections',
          image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=500&fit=crop',
        },
      },
      {
        id: id(), type: 'features',
        data: {
          heading: 'Why Shop With Us',
          subheading: 'The best shopping experience, guaranteed.',
          features: [
            { icon: '🚚', title: 'Free Shipping', description: 'Free delivery on all orders above $50, worldwide.' },
            { icon: '↩️', title: 'Easy Returns', description: '30-day hassle-free return policy.' },
            { icon: '🔒', title: 'Secure Checkout', description: '256-bit SSL encryption for all transactions.' },
            { icon: '⭐', title: 'Top Quality', description: 'Carefully curated products from trusted brands.' },
          ],
        },
      },
      {
        id: id(), type: 'testimonials',
        data: {
          heading: 'What Our Customers Say',
          testimonials: [
            { name: 'Emily Rogers', role: 'Verified Buyer', text: 'Amazing quality and super fast shipping. I\'m a customer for life!', avatar: 'https://i.pravatar.cc/60?img=5' },
            { name: 'Marcus Lee', role: 'Verified Buyer', text: 'The best online store I\'ve found. Great prices and incredible selection.', avatar: 'https://i.pravatar.cc/60?img=15' },
            { name: 'Olivia Park', role: 'Verified Buyer', text: 'Returns were painless and the customer service team was super helpful.', avatar: 'https://i.pravatar.cc/60?img=25' },
          ],
        },
      },
      {
        id: id(), type: 'pricing',
        data: {
          heading: 'Membership Plans',
          subheading: 'Join and save more on every order.',
          plans: [
            { name: 'Basic', price: 'Free', period: '', features: ['Standard Shipping', 'Member Discounts', 'Wishlist'], highlighted: false },
            { name: 'Premium', price: '$9.99', period: '/mo', features: ['Free Shipping Always', '15% Discount', 'Early Access', 'Priority Support'], highlighted: true },
            { name: 'VIP', price: '$24.99', period: '/mo', features: ['Everything in Premium', '25% Discount', 'Exclusive Drops', 'Personal Stylist'], highlighted: false },
          ],
        },
      },
      {
        id: id(), type: 'footer',
        data: {
          companyName: 'ShopNow',
          tagline: 'Your style, delivered.',
          links: [
            { label: 'Shop', href: '#' },
            { label: 'About', href: '#' },
            { label: 'Shipping', href: '#' },
            { label: 'Returns', href: '#' },
            { label: 'Contact', href: '#' },
          ],
          copyright: '© 2025 ShopNow. All rights reserved.',
        },
      },
    ],
  },
  {
    id: 'portfolio-1',
    category: 'Portfolio',
    name: 'Creative Portfolio',
    description: 'Minimal and elegant portfolio for designers and creatives.',
    thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop',
    sections: [
      {
        id: id(), type: 'header',
        data: {
          logoText: 'Alex Rivera',
          menuItems: ['Work', 'About', 'Skills', 'Contact'],
          ctaLabel: 'Hire Me',
        },
      },
      {
        id: id(), type: 'hero',
        data: {
          heading: 'Hi, I\'m Alex Rivera',
          subheading: 'Full-stack designer & developer crafting beautiful digital experiences that users love.',
          ctaPrimary: 'View My Work',
          ctaSecondary: 'Contact Me',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop',
        },
      },
      {
        id: id(), type: 'features',
        data: {
          heading: 'What I Do',
          subheading: 'A versatile skillset for end-to-end digital products.',
          features: [
            { icon: '🎨', title: 'UI/UX Design', description: 'Intuitive interfaces with deep user research and modern aesthetics.' },
            { icon: '💻', title: 'Web Development', description: 'React, Next.js, and Node.js applications built to perform.' },
            { icon: '📱', title: 'Mobile Apps', description: 'Cross-platform apps with React Native and Flutter.' },
            { icon: '🖼️', title: 'Brand Identity', description: 'Logos, style guides, and visual systems for lasting brands.' },
          ],
        },
      },
      {
        id: id(), type: 'testimonials',
        data: {
          heading: 'Client Testimonials',
          testimonials: [
            { name: 'Daniel Frost', role: 'Founder, Luminary', text: 'Alex redesigned our entire product and our user retention jumped 40%.', avatar: 'https://i.pravatar.cc/60?img=52' },
            { name: 'Sofia Torres', role: 'CEO, BrightWave', text: 'Exceptional talent and a pleasure to work with. Highly recommend!', avatar: 'https://i.pravatar.cc/60?img=44' },
            { name: 'Ryan Kim', role: 'Product Lead, Orbit', text: 'Delivered everything on time and the quality was beyond expectations.', avatar: 'https://i.pravatar.cc/60?img=60' },
          ],
        },
      },
      {
        id: id(), type: 'footer',
        data: {
          companyName: 'Alex Rivera',
          tagline: 'Designing the future, one pixel at a time.',
          links: [
            { label: 'Work', href: '#' },
            { label: 'About', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Contact', href: '#' },
          ],
          copyright: '© 2025 Alex Rivera. All rights reserved.',
        },
      },
    ],
  },
  {
    id: 'landing-1',
    category: 'Landing Page',
    name: 'SaaS Launch',
    description: 'High-converting SaaS product launch page.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    sections: [
      {
        id: id(), type: 'header',
        data: {
          logoText: 'LaunchKit',
          menuItems: ['Features', 'Pricing', 'Changelog', 'Blog'],
          ctaLabel: 'Start Free Trial',
        },
      },
      {
        id: id(), type: 'hero',
        data: {
          heading: 'Launch Your SaaS Faster',
          subheading: 'The all-in-one platform that helps startups go from idea to first paying customer in record time.',
          ctaPrimary: 'Start Free Trial',
          ctaSecondary: 'Watch Demo',
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop',
        },
      },
      {
        id: id(), type: 'features',
        data: {
          heading: 'Everything You Need to Launch',
          subheading: 'Stop cobbling together tools. Get everything in one place.',
          features: [
            { icon: '⚡', title: 'Instant Setup', description: 'Go live in minutes, not weeks. No coding required.' },
            { icon: '💳', title: 'Billing Built-In', description: 'Subscriptions, one-time payments, and invoices handled automatically.' },
            { icon: '📧', title: 'Email Marketing', description: 'Automated onboarding sequences and drip campaigns.' },
            { icon: '📈', title: 'Growth Analytics', description: 'Track MRR, churn, and all your key SaaS metrics in one dashboard.' },
            { icon: '🔑', title: 'Auth & Users', description: 'User management, roles, and SSO out of the box.' },
            { icon: '🌍', title: 'CDN & Performance', description: 'Global edge deployment for < 100ms load times.' },
          ],
        },
      },
      {
        id: id(), type: 'video',
        data: {
          heading: 'Watch the Launch Video',
          subheading: 'See how LaunchKit can transform your startup workflow.',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      },
      {
        id: id(), type: 'pricing',
        data: {
          heading: 'Launch Pricing',
          subheading: 'Lock in your early-adopter rate before it\'s gone.',
          plans: [
            { name: 'Indie', price: '$19', period: '/mo', features: ['1 Product', '1,000 Users', 'Basic Analytics', 'Community Support'], highlighted: false },
            { name: 'Growth', price: '$49', period: '/mo', features: ['5 Products', '10,000 Users', 'Full Analytics', 'Email Support', 'A/B Testing'], highlighted: true },
            { name: 'Scale', price: '$149', period: '/mo', features: ['Unlimited Products', 'Unlimited Users', 'Advanced Analytics', 'Priority Support', 'White-label'], highlighted: false },
          ],
        },
      },
      {
        id: id(), type: 'testimonials',
        data: {
          heading: 'Early Customers Love It',
          testimonials: [
            { name: 'Carlos Mendes', role: 'Founder, TaskFlow', text: 'We hit $10K MRR in 60 days using this platform. The analytics alone are worth it.', avatar: 'https://i.pravatar.cc/60?img=68' },
            { name: 'Aisha Okafor', role: 'CEO, DataPulse', text: 'Replaced 5 different tools with this one. Our burn rate dropped significantly.', avatar: 'https://i.pravatar.cc/60?img=49' },
            { name: 'Tom Berkley', role: 'CTO, SwiftDesk', text: 'The best SaaS starter kit I\'ve ever used. The team ships updates incredibly fast.', avatar: 'https://i.pravatar.cc/60?img=19' },
          ],
        },
      },
      {
        id: id(), type: 'footer',
        data: {
          companyName: 'LaunchKit',
          tagline: 'From zero to revenue, faster.',
          links: [
            { label: 'Product', href: '#' },
            { label: 'Pricing', href: '#' },
            { label: 'Changelog', href: '#' },
            { label: 'Privacy', href: '#' },
            { label: 'Status', href: '#' },
          ],
          copyright: '© 2025 LaunchKit. All rights reserved.',
        },
      },
    ],
  },
];

export const categories = ['All', 'Corporate / Business', 'E-commerce', 'Portfolio', 'Landing Page'];
