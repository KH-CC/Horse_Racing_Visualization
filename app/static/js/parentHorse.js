function parentDisplay() //Display parent infomation of all horse, should be call first
{

    /* Reingold-Tilford Tree */

    var diameter = 960;
    var padding = 210;

    var tree = d3.layout.tree()
        .size([360, diameter / 2 - padding])
        .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

    var diagonal = d3.svg.diagonal.radial()
        .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

    var svg = d3.select("#parentHorse").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
      .append("g")
        .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

    d3.selection.prototype.moveToFront = function() {
      return this.each(function() {
        this.parentNode.appendChild(this);
      });
    };

    d3.csv("static/dataset/parentHorse/treeFile.csv", function(data) {
      var nested1 = processData(data);
      svg.append("text")
        .attr("id", "version")
        .attr("x", -diameter*0.4)
        .attr("y", -diameter*0.4)
        .style("font-size", "32px");
      treemap(nested1);

    });

    function processData(files) {
      files.forEach(function(d) {
        d.score = parseInt(d.score);
        d.keys = d.relation.split("/");
        d.keys.forEach(function(sect,i) {
          d["section" + i] = sect;
        });
      });

      f = burrow(files);
      return f;
    }


    function treemap(root) {
      sl = getSireList(root);

      var nodes = tree.nodes(root),
          links = tree.links(nodes);

      var link = svg.selectAll(".parent_link")
        .data(links, function(d) { return d.source.name + "-" + d.target.name;})

      link
        .transition()
          .delay(400)
          .duration(600)
          .attr("d", diagonal);

      link
        .enter().append("path")
          .attr("class", "parent_link")
          .attr("d", diagonal)
          .style("opacity", 0)
          .transition()
          .duration(300)
          .delay(function(d,i) {
            return 24*i;
          })
          .style("opacity", 1);

      link.exit()
        .transition()
          .duration(400)
          .style("opacity", 0)
          .delay(400)
          .remove();

      var node = svg.selectAll(".parent_node")
          .moveToFront()
          .data(nodes, function(d) { return d.name + "-" + (d.parent ? d.parent.name : "root");})

       node.exit()
        .transition()
          .duration(400)
          .style("opacity", 0)
          .delay(400)
          .remove();

      node
        .transition()
          .delay(400)
          .duration(800)
          .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

      node.selectAll("text")
        .transition()
          .duration(800)
          .attr("font-weight", null)
          .attr("fill", "#555")
          .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
          .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
          .text(function(d) { return d.name; });

      var g = node
        .enter().append("g")
          .attr("class", "parent_node")
          .attr("id", function(d) { return d.id; })
          .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
          ;


      var radio =  d3.scale.linear()
        .domain([0, 123])
        .range([3, 15]);

      console.log("sl",sl)
      // var col = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a"]
      // var col = ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#1f78b4","#bc80bd"];
        var col = ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#a6cee3","#bc80bd"];

      // var col = ["#a50026","#d73027","#f46d43","#fdae61","#fee090","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"];
      g.append("circle")
        .attr("r", function(d) {
          if (d.score==undefined) {
              return 10;
          } else{
            return radio(d.score);
          }})
        .style("opacity", 0)
        .transition()
        .duration(300)
        .delay(function(d,i) {
            return 24*i;
          })
        .style("opacity", 1)
        .style("fill",function(d) {
                if (d.parent==undefined) {
                  return "#000";
              } else if(d.parent.name=="Sire"){
                  inq = sl.indexOf(d.name)
                  color = col[inq]
                  return color;
                }
              else{
                inq = sl.indexOf(d.parent.name)
                color = col[inq];
                d3.select(this)
                  .attr("ordColor",color);
                a = d3.select(this)
                  .attr("ordColor")
                return color;
              }
          })
      ;

      g.append("text")
        .attr("dy", ".31em")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return d.x < 180 ? "translate(15)" : "rotate(180)translate(-15)"; })
        .text(function(d) { return d.name; })
        .style("opacity", 0)
        .transition()
          .duration(300)
          .delay(function(d,i) {
            return 24*i;
          })
          .style("opacity", 1);



      g.on("click", function(){
          a = d3.select(this).attr("id")
          if (a != null){
              if (SelectedHorseId != a ) {
                  d3.select(this)
                      .select("circle")
                      .style("stroke","#aaa")
                      .style("fill","FireBrick")
                  ;
                  d3.select(this)
                      .select("text")
                      .style("font-weight","900")
                      .style("fill","FireBrick")
                      .style("font-size","13px")

                  s = "g[id=" + SelectedHorseId + "]"
                  d3.select(s)
                      .select("circle")
                      .style("stroke","#fff")
                      .style("fill", function(d){
                          return d3.select(this).attr("ordColor")
                  })
                  d3.select(s)
                      .select("text")
                      .style("font-weight", "bold")
                      .style("fill","black")
                      .style("font-size","10px");

                  SelectedHorseId = a;

              ;}

              recordDisplay(a);
          // personDisplay(horseID)
          }
      })
        .on("mouseover",function(d,i){
              if (d.parent==undefined || d.parent.name=="Sire") {
                  return 0;
              }else if(d3.select(this).attr("id") == SelectedHorseId){
                return 0
            }else{
              d3.select(this)
                  .select("circle")
                  .style("fill","red")
              ;
              d3.select(this)
                  .select("text")
                  .style("fill","red")
              ;}
        })
        .on("mouseout",function(d,i){
            if (d.parent==undefined || d.parent.name=="Sire") {
                  return 0;
              }else if(d3.select(this).attr("id") == SelectedHorseId){
                return 0
            }else{
              ordColor = d3.select(this)
                  .select("circle")
                  .attr("ordColor")
              d3.select(this)
                  .select("circle")
                  .style("fill",ordColor)
              ;
              d3.select(this)
                  .select("text")
                  .style("fill","black")
              ;}
        })

    };

    d3.select(self.frameElement).style("height", diameter + "px");
}

// nest rows with keys array, requires Underscore.js
function burrow(table) {
  sire = {name: "Sire", maxDepth: 3, children: []}
  // parent =  {name: , depth: 1, children: Array(10), size:}
  // chi = {name: , depth: 2, id:}
  dieList = [];
  for (var i in table) {
    die = table[i]["section1"];
    chiName = table[i]["section2"]
    if (dieList.indexOf(die) == -1) {
        dieNode = {name: die, depth: 1, children: []}
        sire["children"].push(dieNode);
        chiNode = {name: chiName, depth: 2, id:table[i]["id"], score:table[i]["score"]}
        dieNode["children"].push(chiNode)
        dieList.push(die)
      } else {
        siresJl = sire["children"]
        for (var j in siresJl) {
           if (siresJl[j]["name"] == die) {
             chiNode = {name: chiName, depth: 2, id:table[i]["id"], score:table[i]["score"]}
             siresJl[j]["children"].push(chiNode)
           }
        }
    }
  }

  function newSort(x,y)
  {
  return x.score-y.score;
  }

  for (var i in sire) {
    siresJl = sire["children"]
        for (var j in siresJl) {
            siresJl[j]["children"].sort(newSort);

        }
  }

  console.log("sire: ",sire);
  return sire;
}

function getSireList(sire){
  sirelist = []
  for (var i in sire["children"]) {
    sireName = sire["children"][i]["name"];
    sirelist.push(sireName)
  }
  return sirelist
}