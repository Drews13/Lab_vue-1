export default function debounce<T extends(...params: any[]) => void>(func: T, delay: number) {
  let timerId: number;
  return function (...args: any) {
    clearTimeout(timerId);
    timerId = setTimeout(() => { 
      func(...args) 
    }, delay);
  };
}
