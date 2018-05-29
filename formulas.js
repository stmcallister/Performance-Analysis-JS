let i = 0;

exports.checkPerformance = (posts) => {
    console.log("Performing analysis on "+ posts.length +" elements.");

    return Promise.all([
        reducePerformance(posts),
        mapPerformance(posts),
        filterPerformance(posts)
    ])
}
 
// find the avg. of all downvotes, upvotes, commentCounts -> reduce
function reducePerformance(posts) {
    console.log('*************** Reduce performance check ***************')
    const length = posts.length;
    let avg = 0;
    
    console.time('js reduce');
    avg = posts.reduce((acc, p) => acc+= (+p.downvotes+ +p.upvotes+ +p.commentCount)/3,0);
    avg = avg/length;
    console.timeEnd('js reduce')

    avg = 0;
    console.time('for loop');
    for(i=0; i<length; i++) {
        avg += (+posts[i].upvotes + +posts[i].downvotes + +posts[i].commentCount)/3;
    }
    avg = avg/length;
    console.timeEnd('for loop');

    avg = 0;
    console.time('for each');
    posts.forEach(element => {
        avg += (+element.upvotes + +element.downvotes + +element.commentCount)/3;
    });
    avg = avg/length;
    console.timeEnd('for each');
}

// modified all upvotes, add commentCounts to upvotes and divde by random number -> map
function mapPerformance(posts) {
    console.log('*************** Map performance check ***************')
    const divider = Math.random(1,300);
    const length = posts.length;
    let newData = [];
    
    console.time('js map');
    newData = posts.map(p => {
        return {
            id: p.id,
            upvotes: (+p.upvotes + +p.commentCount)/divider,
            downvotes: p.downvotes,
            commentCount: p.commentCount
        };
    });
    console.timeEnd('js map')
    
    newData=[];
    console.time('for loop');
    for(i=0; i<length; i++) {
        newData.push({
            id: posts[i].id,
            upvotes: (+posts[i].upvotes + +posts[i].commentCount)/divider,
            downvotes: posts[i].downvotes,
            commentCount: posts[i].commentCount
        });
    }
    console.timeEnd('for loop');

    newData=[];
    console.time('for each');
    posts.forEach(element => {
        newData.push({
            id: element.id,
            upvotes: (+element.upvotes + +element.commentCount)/divider,
            downvotes: element.downvotes,
            commentCount: element.commentCount
        });
    });
    console.timeEnd('for each');
}


// filter array with object that has an avg of (downvotes * 0.3, upvotes * 0.2,
// commentCounts*0.1) multiple by a weight and return  -> filter
function filterPerformance(posts) {
    console.log('*************** Filter performance check ***************')
    const fitlerValue = Math.random(1,50);
    const length = posts.length;
    let newData = [];
    
    console.time('js filter');
    newData = posts.filter(p => (+p.upvotes*0.2 + +p.downvotes*0.3 +p.commentCount*0.1)/3 > fitlerValue);
    console.timeEnd('js filter')
    
    newData = [];
    console.time('for loop');
    for(i=0; i<length; i++) {
        if((+posts[i].upvotes*0.2 + +posts[i].downvotes*0.3 + +posts[i].commentCount*0.1)/3 > fitlerValue) {
            newData.push(posts[i]);
        }
    }
    console.timeEnd('for loop');

    newData = [];
    console.time('for each');
    posts.forEach(element => {
        if((+element.upvotes*0.2 + +element.downvotes*0.3 + +element.commentCount*0.1)/3 > fitlerValue) {
            newData.push(element);
        }
    });
    console.timeEnd('for each');