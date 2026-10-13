import { Link } from 'react-router-dom'
import { Home, Building2, Star, Package } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import resImg from '../assets/res.png'
import comImg from '../assets/com.png'
import airImg from '../assets/air.png'
import moveImg from '../assets/move.png'

const services = [
  {
    Icon: Home,
    image: resImg,
    title: 'Residential Cleaning',
    desc: 'Your home deserves to be a sanctuary. Our residential cleaning service covers every room, every corner, and every surface — leaving your space fresh, organized, and truly clean.',
    includes: [
      'Kitchen deep clean (counters, appliances, sink)',
      'Bathroom scrubbing and sanitizing',
      'Vacuuming and mopping all floors',
      'Dusting surfaces, blinds, and fans',
      'Bedroom tidying and linen change (on request)',
      'Trash removal throughout',
    ],
  },
  {
    Icon: Building2,
    image: comImg,
    title: 'Commercial Cleaning',
    desc: 'A clean workplace boosts productivity and leaves a lasting impression on clients and visitors. We offer flexible scheduling — including after-hours — to keep your business spotless without disruption.',
    includes: [
      'Common areas, lobbies, and hallways',
      'Restroom deep cleaning and restocking',
      'Workstation and desk sanitizing',
      'Break rooms and kitchen areas',
      'Window sill and glass cleaning',
      'Trash collection and liner replacement',
    ],
  },
  {
    Icon: Star,
    image: airImg,
    title: 'Airbnb Cleaning',
    desc: 'Impress every guest with a hotel-quality clean. We specialize in fast, thorough turnovers timed to your check-in and check-out windows — so your listing always looks 5-star ready.',
    includes: [
      'Full linen change and bed making',
      'Kitchen and dishes cleaned and reset',
      'Bathroom scrubbed and restocked',
      'Floors vacuumed and mopped',
      'Amenities checked and restocked',
      'Listing inspection walkthrough',
    ],
  },
  {
    Icon: Package,
    image: moveImg,
    title: 'Move In / Move Out',
    desc: "Moving is stressful enough. Let us handle the cleaning so you can focus on your next chapter. Whether you're leaving a place behind or starting fresh in a new one, we'll make sure every inch is spotless.",
    includes: [
      'Interior cabinet and drawer cleaning',
      'Appliance deep clean inside and out',
      'Baseboards, trim, and windowsills wiped',
      'Walls spot-cleaned where needed',
      'All floors scrubbed and polished',
      'Final walkthrough to ensure nothing is missed',
    ],
  },
]

export default function Services() {
  return (
    <main className="page-wrapper">
      <section className="page-hero">
        <h1>Our Services</h1>
        <p>Professional cleaning for homes, businesses, rentals, and everything in between.</p>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="services-full-grid">
            {services.map(({ Icon, image, title, desc, includes }, i) => (
              <FadeIn key={title} delay={i * 100}>
              <div className="service-card-full">
                {image
                  ? <img src={image} alt={title} className="service-card-img" />
                  : <div className="service-icon" style={{ width: 64, height: 64 }}>
                      <Icon size={30} color="var(--green)" strokeWidth={1.75} />
                    </div>
                }
                <h2>{title}</h2>
                <p>{desc}</p>
                <div className="service-includes">
                  <h4>What's Included</h4>
                  <ul>
                    {includes.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


<section className="cta-banner">
        <div className="section-inner">
          <h2>Not Sure Which Service You Need?</h2>
          <p>Reach out and we'll help you figure out the best fit for your situation.</p>
          <Link to="/contact" className="btn-primary">Get In Touch</Link>
        </div>
      </section>
    </main>
  )
}
