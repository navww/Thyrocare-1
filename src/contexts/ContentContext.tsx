import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '@/api';

interface BannerContent {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

interface AboutSection {
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  imageUrl: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

interface ConsultationSubmission {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  description: string;
  files?: string[];
  submittedAt: string;
}

interface ContentContextType {
  bannerContent: BannerContent;
  aboutSection: AboutSection;
  testimonials: Testimonial[];
  faqs: FAQ[];
  blogPosts: BlogPost[];
  consultationSubmissions: ConsultationSubmission[];
  updateBannerContent: (content: BannerContent) => void;
  updateAboutSection: (section: AboutSection) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  addFAQ: (faq: Omit<FAQ, 'id'>) => void;
  updateFAQ: (id: string, faq: Partial<FAQ>) => void;
  deleteFAQ: (id: string) => void;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  addConsultationSubmission: (submission: Omit<ConsultationSubmission, 'id' | 'submittedAt'>) => void;
  deleteConsultationSubmission: (id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const defaultBannerContent: BannerContent = {
  title: "",
  subtitle: "Test and you can Trust",
  description: "",
  primaryButtonText: "Book a Package",
  primaryButtonLink: "/book-consultation",
  secondaryButtonText: "View Our Doctors",
  secondaryButtonLink: "/doctors"
};

const defaultAboutSection: AboutSection = {
  title: "Expert Medical Care",
  description: "",
  imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3",
  features: [
    "24/7 Available",
    "Safe & Secure",
    "Expert Doctors",
    "Quality Care"
  ]
};

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Patient',
    company: '',
    content: 'Excellent service and professional doctors. Highly recommended!',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e5?ixlib=rb-4.0.3&w=150'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Patient',
    company: '',
    content: 'Quick and convenient online consultations. Great experience!',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150'
  }
];

const defaultFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment through our website by clicking the "Book a Package" button.',
    category: 'Appointments'
  },
  {
    id: '2',
    question: 'What are your consultation hours?',
    answer: 'We offer 24/7 online consultations with our medical team.',
    category: 'General'
  }
];

const defaultBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Telemedicine',
    excerpt: 'Exploring how digital health is transforming healthcare delivery.',
    content: 'Telemedicine has revolutionized the way we deliver healthcare...',
    author: 'Dr. Smith',
    publishDate: '2024-01-15',
    category: 'Healthcare Technology',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3',
    tags: ['telemedicine', 'digital health', 'healthcare']
  }
];

const defaultConsultationSubmissions: ConsultationSubmission[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St, City, State',
    phone: '+1234567890',
    description: 'I need consultation for chronic back pain',
    files: ['medical_report.pdf', 'xray.jpg'],
    submittedAt: new Date().toISOString()
  }
];

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [bannerContent, setBannerContent] = useState<BannerContent>(defaultBannerContent);
  const [aboutSection, setAboutSection] = useState<AboutSection>(defaultAboutSection);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [faqs, setFaqs] = useState<FAQ[]>(defaultFAQs);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultBlogPosts);
  const [consultationSubmissions, setConsultationSubmissions] = useState<ConsultationSubmission[]>(defaultConsultationSubmissions);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [bannerRes, aboutRes, testimonialsRes, faqsRes, blogRes, consultationsRes] = await Promise.all([
          api.get('/content/banner'),
          api.get('/content/about'),
          api.get('/content/testimonials'),
          api.get('/content/faqs'),
          api.get('/content/blogs'),
          api.get('/content/consultations')
        ]);
        if (bannerRes.data) setBannerContent(bannerRes.data);
        if (aboutRes.data) setAboutSection(aboutRes.data);
        if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
        if (faqsRes.data) setFaqs(faqsRes.data);
        if (blogRes.data) setBlogPosts(blogRes.data);
        if (consultationsRes.data) setConsultationSubmissions(consultationsRes.data);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  const updateBannerContent = async (content: BannerContent) => {
    try {
      const response = await api.put('/content/banner', content);
      setBannerContent(response.data);
    } catch (error) {
      console.error('Error updating banner content:', error);
    }
  };

  const updateAboutSection = (section: AboutSection) => {
    setAboutSection(section);
  };

  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: Date.now().toString(),
    };
    setTestimonials(prev => [...prev, newTestimonial]);
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials(prev => 
      prev.map(testimonial => 
        testimonial.id === id ? { ...testimonial, ...updates } : testimonial
      )
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
  };

  const addFAQ = (faq: Omit<FAQ, 'id'>) => {
    const newFAQ: FAQ = {
      ...faq,
      id: Date.now().toString(),
    };
    setFaqs(prev => [...prev, newFAQ]);
  };

  const updateFAQ = (id: string, updates: Partial<FAQ>) => {
    setFaqs(prev => 
      prev.map(faq => 
        faq.id === id ? { ...faq, ...updates } : faq
      )
    );
  };

  const deleteFAQ = (id: string) => {
    setFaqs(prev => prev.filter(faq => faq.id !== id));
  };

  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
    };
    setBlogPosts(prev => [...prev, newPost]);
  };

  const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
    try {
      const response = await api.put(`/content/blogs/${id}`, updates);
      setBlogPosts(prev =>
        prev.map(post =>
          post.id === id ? response.data : post
        )
      );
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
  };

  const addConsultationSubmission = (submission: Omit<ConsultationSubmission, 'id' | 'submittedAt'>) => {
    const newSubmission: ConsultationSubmission = {
      ...submission,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };
    setConsultationSubmissions(prev => [...prev, newSubmission]);
  };

  const deleteConsultationSubmission = async (id: string) => {
    try {
      await api.delete(`/consult/consultation/${id}`);
      setConsultationSubmissions(prev => prev.filter(submission => submission.id !== id));
    } catch (error) {
      console.error('Error deleting consultation submission:', error);
    }
  };

  return (
    <ContentContext.Provider value={{
      bannerContent,
      aboutSection,
      testimonials,
      faqs,
      blogPosts,
      consultationSubmissions,
      updateBannerContent,
      updateAboutSection,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      addFAQ,
      updateFAQ,
      deleteFAQ,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      addConsultationSubmission,
      deleteConsultationSubmission,
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
