import TestimonialBox from './TestimonialBox';
import CardLayout from '../../../common/CardLayout';

const testimonials = [
  { 
    id: 1, 
    name: 'Sarah Johnson', 
    role: 'Fashion Blogger',
    comment: 'The quality of products is amazing! Fast delivery and excellent customer service.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  { 
    id: 2, 
    name: 'Michael Chen', 
    role: 'Tech Enthusiast',
    comment: 'Best place to buy electronics. Competitive prices and genuine products.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  { 
    id: 3, 
    name: 'Emma Davis', 
    role: 'Home Decor Expert',
    comment: 'Love their home collection. Unique items you won\'t find elsewhere.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-400">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <CardLayout key={testimonial.id}>
              <TestimonialBox {...testimonial} />
            </CardLayout>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
