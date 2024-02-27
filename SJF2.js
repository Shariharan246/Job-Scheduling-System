let jobs = [];
let job2 = [];
let job3 = [];
let fc=0;
let rc=0;
let sc=0;
let pc=0;
let FCFSTime=0;
let RRTime=0;
let SJFTime=0;
let PRTime=0;
function addJob() {
  const jobName = document.getElementById("jobName").value;
  const jobTime = parseInt(document.getElementById("jobTime").value);
  const jobPriority = parseInt(document.getElementById("jobPriority").value);

  if (jobName && !isNaN(jobTime) && jobTime > 0 && !isNaN(jobPriority)) {
    jobs.push({ name: jobName, time: jobTime, priority: jobPriority });
    job2.push({ name: jobName, time: jobTime, priority: jobPriority });
    job3.push({ name: jobName, time: jobTime, priority: jobPriority });
    displayJobs();
  } else {
    alert("Please enter valid job details.");
  }
}

function displayJobs() {
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "<h3>Jobs List:</h3>";
  jobs.forEach(job => {
    outputDiv.innerHTML += `<p>${job.name} - ${job.time} units - Priority: ${job.priority}</p>`;
  });
}


function startFCFS() {
  if(jobs.length==0){
    return alert("Fields Cannot be Empty");
  }
  document.getElementById("output").innerHTML += `<h3>First Come First Serve Scheduling:</h3>`;
    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
  
      document.getElementById("output").innerHTML += `Running ${job.name} for ${job.time} units<br>`;
      if(i!=jobs.length-1){
      FCFSTime += job.time;
      }
  
      document.getElementById("output").innerHTML += `${job.name} completed!<br>`;
      fc++;
    }
  
    document.getElementById("output").innerHTML += `<p><br>Total Time Taken By FCFS Scheduling: ${FCFSTime} units</p>`;
    startRR();
  }



  function startRR() {
    const quantum = 3; // Round Robin time quantum
    //let Time = 0;
    document.getElementById("output").innerHTML += `<h3>Round Robin Scheduling:</h3>`;
    while (jobs.length > 0) {
     
      for (let i = 0; i < jobs.length; i++) {
       rc++;
        const job = jobs[i];
        const timeSlice = Math.min(quantum, job.time);
  
        if (timeSlice > 0) {
          document.getElementById("output").innerHTML += `Running ${job.name} for ${timeSlice} units<br>`;
          job.time -= timeSlice;
          if(i!=jobs.length-1){
            RRTime+= timeSlice;
          }
  
          if (job.time === 0) {
            document.getElementById("output").innerHTML += `${job.name} completed!<br>`;
            jobs.splice(i, 1);
            i--;
          }
        }
      }
    }
  
    document.getElementById("output").innerHTML += `<p><br>Total Time Taken By Round Robin Scheduling: ${RRTime} units</p>`;
    startSJF();  
}


function startSJF() {
  //let totalTime = 0;
  document.getElementById("output").innerHTML += `<h3>Shortest Job First Scheduling:</h3>`;
  // Sort jobs by time (shortest time first)
  job2.sort((a, b) => a.time - b.time);

  for (let i = 0; i < job2.length; i++) {
    const job = job2[i];

    document.getElementById("output").innerHTML += `Running ${job.name} for ${job.time} units<br>`;
    if(i!=job2.length-1){
        SJFTime += job.time;
    }

    document.getElementById("output").innerHTML += `${job.name} completed!<br>`;
    sc++;
  }

  document.getElementById("output").innerHTML += `<p><br>Total Time Taken By SJF Scheduling: ${SJFTime} units</p>`;
startPriority();
}



function startPriority() {
    //let ttime = 0;
    document.getElementById("output").innerHTML += `<h3>Priority Scheduling</h3>`;
    // Sort jobs by priority (higher priority first) and then by arrival order (FCFS tiebreaker)
    job3.sort((a, b) => a.priority - b.priority);
  
    for (let i = 0; i < job3.length; i++) {
      const job = job3[i];
  
      document.getElementById("output").innerHTML += `Running ${job.name} for ${job.time} units (Priority: ${job.priority})<br>`;
      if(i!=job3.length-1){
      PRTime += job.time;}
  
      document.getElementById("output").innerHTML += `${job.name} completed!<br>`;
      pc++;
    }
  
    document.getElementById("output").innerHTML += `<p><br>Total Time Taken By Priority Scheduling: ${PRTime} units</p>`;
    DisplaySteps();
  }




  function DisplaySteps(){
    document.getElementById("output").innerHTML += `<b><h3> Steps Taken</h3></b>`;
    document.getElementById("output").innerHTML += `<h4>-> FCFS Scheduling takes ${fc} Steps</h4>`;
    document.getElementById("output").innerHTML += `<h4>-> Round Robin Scheduling takes ${rc} Steps</h4>`;
    document.getElementById("output").innerHTML += `<h4>-> SJF Scheduling takes ${sc} Steps</h4>`;
    document.getElementById("output").innerHTML += `<h4>-> Priority Scheduling takes ${pc} Steps</h4>`;
    displayConclusion();
  }



  function displayConclusion(){
    document.getElementById("output").innerHTML += `<b><h3> Efficient Algorithm:</h3></b>`;
    document.getElementById("output").innerHTML += `<h4>-> FCFS Scheduling Completes in ${FCFSTime} units</h4>`;
    document.getElementById("output").innerHTML += `<h4>-> Round Robin Scheduling Completes in ${RRTime} units</h4>`;
    document.getElementById("output").innerHTML += `<h4>-> SJF Scheduling Completes in ${SJFTime} units</h4>`;
    document.getElementById("output").innerHTML += `<h4>-> Priority Scheduling Completes in ${PRTime} units</h4>`;

    if(FCFSTime<=RRTime && FCFSTime<=SJFTime && FCFSTime<=PRTime){
      document.getElementById("output").innerHTML += `<h5> FCFS Scheduling is Efficient to Use</h5>`;
    }
    else if(RRTime<=FCFSTime && RRTime<=SJFTime && RRTime<=PRTime){
      document.getElementById("output").innerHTML += `<h5> Round Robin Scheduling is Efficient to Use</h5>`;
    }
    else if(SJFTime<=FCFSTime && SJFTime<=RRTime && SJFTime<=PRTimeTime){
    document.getElementById("output").innerHTML += `<h5> Shortest Job First Scheduling is Efficient to Use</h5>`;
    }
    else if(PRTime<=FCFSTime && PRTime<=RRTime&& PRTime<=SJFTime){
    document.getElementById("output").innerHTML += `<h5> Priority Scheduling is Efficient to Use</h5>`;
    }
  }