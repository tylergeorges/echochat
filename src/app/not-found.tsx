import { redirect } from 'next/navigation';

export default function NotFoundCatchAll() {
  redirect('/login');


  return(
    <div>
      
    </div>
  )
}
