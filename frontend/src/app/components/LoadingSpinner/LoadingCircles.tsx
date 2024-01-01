import style from './loading-circles.module.css';


export const LoadingCircles = () => {
  return <div className={style.container}>
    <span className={ style.loadingCircles }></span>
  </div>
}
