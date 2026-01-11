import Image from 'next/image'
import Link from 'next/link'

const Logo: React.FC<{ sticky: boolean }> = ({ sticky }) => {
  return (
    <Link href='/' className='flex items-center gap-2 md:gap-3'>
      <div className='relative flex-shrink-0 logo-container'>
        <Image
          src='/images/Logo/logo.png'
          alt='logo'
          width={117}
          height={34}
          className='logo-image'
          quality={100}
          priority
          sizes='(max-width: 768px) 100px, 117px'
        />
      </div>
      <p className={`text-lg md:text-xl font-semibold transition-colors duration-300 whitespace-nowrap ${
        sticky ? 'text-primary' : 'text-white'
      }`}>Freddys Tacos</p>
    </Link>
  )
}

export default Logo
