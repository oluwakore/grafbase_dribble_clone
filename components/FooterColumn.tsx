import Link from 'next/link';
import React from 'react'

type Props = {
  title: string;
  links: Array<string>;
}

const FooterColumn = ({title, links}: Props) => {
  return (
    <div className='footer_column'>
      <h4 className='font-semibold'>{title}</h4>
      <ul className='flex flex-col gap-2 font-normal'>
        {links.map((item: string, index: number) => (
          <Link href={"/"} key={index}> {item} </Link>
        ))}
      </ul>
    </div>
  )
}

export default FooterColumn