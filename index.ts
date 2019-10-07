import { tsConstructorType } from "@babel/types"

type QueueEntry = {
  dequeue(): void
}

type Queue = Array<QueueEntry>

class Semaphore {
  private value: number
  private queue: Queue

  constructor(initialValue: number) {
    this.value = initialValue
    this.queue = []
  }

  v(): void {
    this.value++
    if(this.queue.length > 0) {
      this.queue.shift().dequeue()
    }
  }
  async p(): Promise<void> {
    if (this.value <= 0) {
      const entry = <QueueEntry>{ dequeue: null}
      this.queue.push(entry)
      await new Promise<void>(resolve => {
        entry.dequeue = () => resolve()
      })
    }
    this.value--
    return Promise.resolve()
  }
}

export = (i: number) => {
  const s = new Semaphore(i)
  return {
    V: () => s.v(),
    P: () => s.p(),
    signal: () => s.v(),
    wait: () => s.p(),
    increment: () => s.v(),
    decrement: () => s.p()
  }
}
