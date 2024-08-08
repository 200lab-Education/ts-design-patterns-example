class Job {
  constructor(readonly title: string) { }
}

interface Observer {
  receiveNotify(j: Job): void;
}

class Developer implements Observer {
  receiveNotify(j: Job): void {
    console.log(`recieved job: ${j.title}`);
  }
}

// Aka: Subject
class ITJobsCompany {
  private observers: Observer[] = [];
  private jobs: Job[] = [];

  constructor() { }

  getCurrentITJobs(): Job[] {
    return [...this.jobs];
  }

  addObserver(o: Observer) {
    this.observers = [...this.observers, o];
  }

  removeObserver(o: Observer) {
    this.observers = this.observers.filter(obsv => obsv !== o);
  }

  addNewJob(j: Job) {
    this.jobs = [...this.jobs, j];
    this.notify(j);
  }

  private notify(j: Job) {
    this.observers.forEach(o => o.receiveNotify(j));
  }
}

const itCompany = new ITJobsCompany();
const developer = new Developer();

itCompany.addObserver(developer);

itCompany.addNewJob(new Job('Senior Go backend engineer'));
itCompany.addNewJob(new Job('Junior React developer'));

itCompany.removeObserver(developer);

itCompany.addNewJob(new Job('Some boring IT job'));

// Observer hoan toan khong phai la Pub/Sub
// WHY
// 1. Observer is sub mechanism. Pub/Sub is both for publish and subscribe
// 2. Observer have two components: Observer and Subject. Pub/Sub have 3 components: Pub, Sub, Broker
// 3. Observer is referring non distributed, but pub/sub.
