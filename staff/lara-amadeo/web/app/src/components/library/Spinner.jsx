import './Spinner.css'

export default function Spinner({ overlay, background }){
{overlay && <div className='modal-overlay'></div>}
{background && <div className='modal-solid-overlay'></div>}
    return <>
    {overlay && <div className='modal-overlay'>
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>}
    
    {background && <div className='modal-solid-overlay'>
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
  </div>}
    </>
}