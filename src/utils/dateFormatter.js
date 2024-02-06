export const formattedDate = (date) => {
    const now=Date.now();
    const givenDate=new Date(date).getTime();
    let diff=(now-givenDate)/1000;
    diff=Math.abs(Math.round(diff));
    if(diff<60){
      return `${diff} sec`
    }
    diff=Math.abs(Math.round(diff/60));
    if(diff<60){
      return `${diff} min`
    }
    diff=Math.abs(Math.round(diff/60));
    if(diff<24){
      return `${diff} hour`
    }
    else{
      return `${Math.abs(Math.round(diff/24))} day`
    }
};
