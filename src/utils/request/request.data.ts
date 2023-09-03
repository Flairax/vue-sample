import { Observable, BehaviorSubject } from 'rxjs';

export interface IReadonlyObservable<T>
  extends Omit<
    Observable<T>,
    `lift` | `operator` | `toPromise` | `source` | `forEach`
  > {}

export interface IReadonlySubject<T> extends IReadonlyObservable<T> {
  readonly value: T;
}

export interface IReadonlyArraySubject<T> extends IReadonlyObservable<readonly T[] | null> {
  readonly value: readonly T[];
}


export class ArraySubject<T> extends BehaviorSubject<readonly T[] | null> {
  public override get value() {
    return super.value ?? [];
  }

  constructor(initial: T[] = []) {
    super(Object.freeze([...initial]));
  }

  public add(value: T, index = this.value.length) {
    const copy = [...this.value];
    copy.splice(index, 0, value);
    this.next(Object.freeze(copy));
    return value;
  }

  public delete(fn: (value: T, index: number) => boolean) {
    const copy = this.value.filter((v, i) => !fn(v, i));
    this.next(Object.freeze(copy));
  }

  public override next(value: readonly T[] | null) {
    if (value === null) return super.next(Object.freeze([]));
    super.next(Object.freeze(value));
  }
}


/** Redirects stream into readonly subject
 * ! C */ 
export function wrapSubject<T>(observable: Observable<T>): IReadonlySubject<T> {
  const subject = new BehaviorSubject<T>(null as any);
  observable.subscribe(v => subject.next(v));
  return subject;
}
