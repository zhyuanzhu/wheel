# React Hookes

- Q: 为什么只能在函数最外层调用 Hooks？为什么不要在循环、条件判断或者子函数中调用

  - A: React 内部存储所有 Hooks 的是一个单链表，有固定位置；所以如果位置发生改变，存储状态的链表无法感知到；Hooks 执行时，通过 链表的 next 确保执行顺序；每次执行时都会比对 Hooks 的依赖，如果依赖未发生改变，则不需要执行

- Q: useEffect 的执行时机

  - A: 依赖项改变后 render 之后执行，如果依赖项是一个空数组，相当于 componentDidMount 钩子函数，只会执行一次；每次执行的时候都会生成一个新的 effect (回调函数)，在这个之前会先执行上一次 return 返回的函数
  ```js
    useEffect(() => {
      const fn = () => {}
      window.addEventListener('click', fn)
      return () => {
        window.removeListener('click', fn)
      }
    })

    // 每次 render 之后，都会先执行 return 出来的函数，先解绑事件。然后生成一个新的 effect ，即一个新的 回调函数，重新执行这个回调函数，声明函数，绑定事件，return 出来一个函数

    // 会在组件销毁之前，类似于 componentWillUnmount 钩子函数的时机，清楚所有返回了的副作用函数

  ```

- Q: 利用 Hooks 调用子组件的方法

  - A: 通过 useRef, forwardRef, useImperativeHandle 实现
  ```js
    const Child = forwardRef((ref) => {
      const iptRef = useRef()
      const focusFn = () => {
        iptRef.current.focus();
        return 'focus Event'
      }

      useImperativeHandle(ref, () => ({
        focus: focusFn
      }))
      return <input type="text" ref={iptRef} />
    })

    const Parent = () => {
      const child = useRef()

      const handleClick = () => {
        console.log(child.current)
        // 返回一个对象，包含 useImperativeHandle 的第二个参数  函数的返回值
        child.current.focus() 
        // 调用该方法，执行 子组件的 focusFn 函数，该函数的 返回值就是此方法的返回值
      }

      return (
        <>
          <button onClick={handleClick}>click btn</button>
          <Child ref={child} />
        </>
      )
    }

  ```

- Q: React 的 Hooks 和 Class 组件的区别

  - A: 

    - 1 解决组件之间状态逻辑的复用问题 （利用自定义 hooks ）

    - 2 Hooks 将组件中相互关联的部分拆分成更小的函数，并非强制按照生命周期划分 （例如一些副作用函数或者全局绑定事件销毁问题）

    - 3 Class 组件内部 this 指向问题

    - ~~4 没有 Hooks 之前，函数组件没有自身的状态，只能从 props 中传入一些数据；引入 Hooks 之后函数式组件也有可以维护自己的状态(和函数组件等区别)~~

    - 5 componentDidCatch, getSnapshotBeforeUpdate, getDerivedStateFromError 生命周期的 Hook 函数还未实现
    

      