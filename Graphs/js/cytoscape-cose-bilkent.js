(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.cytoscapeCoseBilkent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ns = {
	List: require('./src/List'),
	Node: require('./src/Node'),
};

if (typeof module !== 'undefined') {
	module.exports = ns;
} else if (typeof define !== 'undefined') {
	define('LinkedListJS', function () {
		return ns;
	});
} else if (typeof window !== 'undefined') {
	window.LinkedListJS = ns;
}
},{"./src/List":2,"./src/Node":3}],2:[function(require,module,exports){
var Node = require('./Node');

var List = function () {
	this._count = 0;
	this._head = null;
	this._tail = null;
};

List.prototype.head = function () {
	return this._head;
};

List.prototype.tail = function () {
	return this._tail;
};

List.prototype.count = function () {
	return this._count;
};

List.prototype.get = function (index) {
	var node = this._head;

	for (var i = 0; i < index; i++) {
		node = node.next();
	}

	return node;
};

List.prototype.set = function (index, value) {
	var node = this.get(index);
	node.set(value);
};

List.prototype.push = function (value) {
	var node = new Node(value, this._tail, null);

	if (this._tail !== null) {
		this._tail.setNext(node);
	}

	if (this._head === null) {
		this._head = node;
	}

	this._tail = node;
	this._count++;

	return node;
};

List.prototype.pop = function () {
	var node = this._tail;

	var new_tail = null;
	if (this._tail.previous() !== null) {
		new_tail = this._tail.previous();
		new_tail.setNext(null);
	}
	
	this._tail = new_tail;

	this._count--;

	if (this._count === 0) {
		this._head = null;
	}

	return node;
};

List.prototype.unshift = function (value) {
	var node = new Node(value, null, this._head);

	if (this._head !== null) {
		this._head.setPrevious(node);
	}

	if (this._tail === null) {
		this._tail = node;
	}
	
	this._head = node;

	this._count++;

	return node;
};

List.prototype.shift = function () {
	var node = this._head;

	var new_head = null;
	if (this._head.next() !== null) {
		new_head = this._head.next();
		new_head.setPrevious(null);
	}

	this._head = new_head;

	this._count--;

	if (this._count === 0) {
		this._tail = null;
	}

	return node;
};

List.prototype.asArray = function () {
	var arr = [];
	var node = this._head;

	while (node) {
		arr.push(node.value());
		node = node.next();
	}

	return arr;
};

List.prototype.truncateTo = function (length) {
	this._count = length;

	if (length === 0) {
		this._head = null;
		this._tail = null;

		return;
	}

	var node = this.get(length-1);
	node.setNext(null);
	this._tail = node;
};

List.prototype.empty = function () {
	this.truncateTo(0);
};

List.prototype.isEmpty = function () {
	return this._head === null;
};

List.prototype.find = function (value) {
	var node = this._head;

	while (node !== null) {
		if (node.value() === value) {
			return node;
		}

		node = node.next();
	}

	return null;
};

List.prototype.each = function (callback) {
	var node = this._head;
	var i = 0;
	while (node !== null) {
		callback(i, node);
		node = node.next();
		i++;
	}
}

module.exports = List;
},{"./Node":3}],3:[function(require,module,exports){
var Node = function (value, previous, next) {
	this._value = value === undefined ? null : value;
	
	this._previous = previous === undefined ? null : previous;
	this._next = next === undefined ? null : next;
};

Node.prototype.value = function () {
	return this._value;
};

Node.prototype.previous = function () {
	return this._previous;
};

Node.prototype.next = function () {
	return this._next;
};

Node.prototype.set = function (value) {
	this._value = value;
};

Node.prototype.setPrevious = function (node) {
	this._previous = node;
};

Node.prototype.setNext = function (node) {
	this._next = node;
};

Node.prototype.isHead = function () {
	return this._previous === null;
};

Node.prototype.isTail = function () {
	return this._next === null;
};

module.exports = Node;
},{}],4:[function(require,module,exports){
'use strict';

var FDLayoutConstants = require('./FDLayoutConstants');

function CoSEConstants() {}

//CoSEConstants inherits static props in FDLayoutConstants
for (var prop in FDLayoutConstants) {
  CoSEConstants[prop] = FDLayoutConstants[prop];
}

CoSEConstants.DEFAULT_USE_MULTI_LEVEL_SCALING = false;
CoSEConstants.DEFAULT_RADIAL_SEPARATION = FDLayoutConstants.DEFAULT_EDGE_LENGTH;
CoSEConstants.DEFAULT_COMPONENT_SEPERATION = 60;
CoSEConstants.TILE = true;
CoSEConstants.TILING_PADDING_VERTICAL = 10;
CoSEConstants.TILING_PADDING_HORIZONTAL = 10;

module.exports = CoSEConstants;

},{"./FDLayoutConstants":13}],5:[function(require,module,exports){
'use strict';

var FDLayoutEdge = require('./FDLayoutEdge');

function CoSEEdge(source, target, vEdge) {
  FDLayoutEdge.call(this, source, target, vEdge);
}

CoSEEdge.prototype = Object.create(FDLayoutEdge.prototype);
for (var prop in FDLayoutEdge) {
  CoSEEdge[prop] = FDLayoutEdge[prop];
}

module.exports = CoSEEdge;

},{"./FDLayoutEdge":14}],6:[function(require,module,exports){
'use strict';

var LGraph = require('./LGraph');

function CoSEGraph(parent, graphMgr, vGraph) {
  LGraph.call(this, parent, graphMgr, vGraph);
}

CoSEGraph.prototype = Object.create(LGraph.prototype);
for (var prop in LGraph) {
  CoSEGraph[prop] = LGraph[prop];
}

module.exports = CoSEGraph;

},{"./LGraph":22}],7:[function(require,module,exports){
'use strict';

var LGraphManager = require('./LGraphManager');

function CoSEGraphManager(layout) {
  LGraphManager.call(this, layout);
}

CoSEGraphManager.prototype = Object.create(LGraphManager.prototype);
for (var prop in LGraphManager) {
  CoSEGraphManager[prop] = LGraphManager[prop];
}

module.exports = CoSEGraphManager;

},{"./LGraphManager":23}],8:[function(require,module,exports){
'use strict';

var FDLayout = require('./FDLayout');
var CoSEGraphManager = require('./CoSEGraphManager');
var CoSEGraph = require('./CoSEGraph');
var CoSENode = require('./CoSENode');
var CoSEEdge = require('./CoSEEdge');
var CoSEConstants = require('./CoSEConstants');
var FDLayoutConstants = require('./FDLayoutConstants');
var LayoutConstants = require('./LayoutConstants');
var Point = require('./Point');
var PointD = require('./PointD');
var Layout = require('./Layout');
var Integer = require('./Integer');
var IGeometry = require('./IGeometry');
var LGraph = require('./LGraph');
var Transform = require('./Transform');

function CoSELayout() {
  FDLayout.call(this);

  this.toBeTiled = {}; // Memorize if a node is to be tiled or is tiled
}

CoSELayout.prototype = Object.create(FDLayout.prototype);

for (var prop in FDLayout) {
  CoSELayout[prop] = FDLayout[prop];
}

CoSELayout.prototype.newGraphManager = function () {
  var gm = new CoSEGraphManager(this);
  this.graphManager = gm;
  return gm;
};

CoSELayout.prototype.newGraph = function (vGraph) {
  return new CoSEGraph(null, this.graphManager, vGraph);
};

CoSELayout.prototype.newNode = function (vNode) {
  return new CoSENode(this.graphManager, vNode);
};

CoSELayout.prototype.newEdge = function (vEdge) {
  return new CoSEEdge(null, null, vEdge);
};

CoSELayout.prototype.initParameters = function () {
  FDLayout.prototype.initParameters.call(this, arguments);
  if (!this.isSubLayout) {
    if (CoSEConstants.DEFAULT_EDGE_LENGTH < 10) {
      this.idealEdgeLength = 10;
    } else {
      this.idealEdgeLength = CoSEConstants.DEFAULT_EDGE_LENGTH;
    }

    this.useSmartIdealEdgeLengthCalculation = CoSEConstants.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION;
    this.springConstant = FDLayoutConstants.DEFAULT_SPRING_STRENGTH;
    this.repulsionConstant = FDLayoutConstants.DEFAULT_REPULSION_STRENGTH;
    this.gravityConstant = FDLayoutConstants.DEFAULT_GRAVITY_STRENGTH;
    this.compoundGravityConstant = FDLayoutConstants.DEFAULT_COMPOUND_GRAVITY_STRENGTH;
    this.gravityRangeFactor = FDLayoutConstants.DEFAULT_GRAVITY_RANGE_FACTOR;
    this.compoundGravityRangeFactor = FDLayoutConstants.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR;
  }
};

CoSELayout.prototype.layout = function () {
  var createBendsAsNeeded = LayoutConstants.DEFAULT_CREATE_BENDS_AS_NEEDED;
  if (createBendsAsNeeded) {
    this.createBendpoints();
    this.graphManager.resetAllEdges();
  }

  this.level = 0;
  return this.classicLayout();
};

CoSELayout.prototype.classicLayout = function () {
  this.calculateNodesToApplyGravitationTo();
  this.calcNoOfChildrenForAllNodes();
  this.graphManager.calcLowestCommonAncestors();
  this.graphManager.calcInclusionTreeDepths();
  this.graphManager.getRoot().calcEstimatedSize();
  this.calcIdealEdgeLengths();

  if (!this.incremental) {
    var forest = this.getFlatForest();

    // The graph associated with this layout is flat and a forest
    if (forest.length > 0) {
      this.positionNodesRadially(forest);
    }
    // The graph associated with this layout is not flat or a forest
    else {
        // Reduce the trees when incremental mode is not enabled and graph is not a forest 
        this.reduceTrees();
        this.positionNodesRandomly();
      }
  }

  this.initSpringEmbedder();
  this.runSpringEmbedder();

  return true;
};

CoSELayout.prototype.tick = function () {
  this.totalIterations++;

  if (this.totalIterations === this.maxIterations && !this.isTreeGrowing && !this.isGrowthFinished) {
    if (this.prunedNodesAll.length > 0) {
      this.isTreeGrowing = true;
    } else {
      return true;
    }
  }

  if (this.totalIterations % FDLayoutConstants.CONVERGENCE_CHECK_PERIOD == 0 && !this.isTreeGrowing && !this.isGrowthFinished) {
    if (this.isConverged()) {
      if (this.prunedNodesAll.length > 0) {
        this.isTreeGrowing = true;
      } else {
        return true;
      }
    }

    this.coolingFactor = this.initialCoolingFactor * ((this.maxIterations - this.totalIterations) / this.maxIterations);
    this.animationPeriod = Math.ceil(this.initialAnimationPeriod * Math.sqrt(this.coolingFactor));
  }
  // Operations while tree is growing again 
  if (this.isTreeGrowing) {
    if (this.growTreeIterations % 10 == 0) {
      if (this.prunedNodesAll.length > 0) {
        this.graphManager.updateBounds();
        this.updateGrid();
        this.growTree(this.prunedNodesAll, this.isFirstGrowth);
        this.graphManager.updateBounds();
        this.updateGrid();
        this.coolingFactor = FDLayoutConstants.DEFAULT_COOLING_FACTOR_INCREMENTAL;
      } else {
        this.isTreeGrowing = false;
        this.isGrowthFinished = true;
      }
    }
    this.growTreeIterations++;
  }
  // Operations after growth is finished
  if (this.isGrowthFinished) {
    if (this.isConverged()) {
      return true;
    }
    if (this.afterGrowthIterations % 10 == 0) {
      this.graphManager.updateBounds();
      this.updateGrid();
    }
    this.coolingFactor = FDLayoutConstants.DEFAULT_COOLING_FACTOR_INCREMENTAL * ((100 - this.afterGrowthIterations) / 100);
    this.afterGrowthIterations++;
  }

  this.totalDisplacement = 0;
  this.graphManager.updateBounds();
  this.calcSpringForces();
  this.calcRepulsionForces();
  this.calcGravitationalForces();
  this.moveNodes();
  this.animate();

  return false; // Layout is not ended yet return false
};

CoSELayout.prototype.getPositionsData = function () {
  var allNodes = this.graphManager.getAllNodes();
  var pData = {};
  for (var i = 0; i < allNodes.length; i++) {
    var rect = allNodes[i].rect;
    var id = allNodes[i].id;
    pData[id] = {
      id: id,
      x: rect.getCenterX(),
      y: rect.getCenterY(),
      w: rect.width,
      h: rect.height
    };
  }

  return pData;
};

CoSELayout.prototype.runSpringEmbedder = function () {
  this.initialAnimationPeriod = 25;
  this.animationPeriod = this.initialAnimationPeriod;
  var layoutEnded = false;

  // If aminate option is 'during' signal that layout is supposed to start iterating
  if (FDLayoutConstants.ANIMATE === 'during') {
    this.emit('layoutstarted');
  } else {
    // If aminate option is 'during' tick() function will be called on index.js
    while (!layoutEnded) {
      layoutEnded = this.tick();
    }

    this.graphManager.updateBounds();
  }
};

CoSELayout.prototype.calculateNodesToApplyGravitationTo = function () {
  var nodeList = [];
  var graph;

  var graphs = this.graphManager.getGraphs();
  var size = graphs.length;
  var i;
  for (i = 0; i < size; i++) {
    graph = graphs[i];

    graph.updateConnected();

    if (!graph.isConnected) {
      nodeList = nodeList.concat(graph.getNodes());
    }
  }

  this.graphManager.setAllNodesToApplyGravitation(nodeList);
};

CoSELayout.prototype.calcNoOfChildrenForAllNodes = function () {
  var node;
  var allNodes = this.graphManager.getAllNodes();

  for (var i = 0; i < allNodes.length; i++) {
    node = allNodes[i];
    node.noOfChildren = node.getNoOfChildren();
  }
};

CoSELayout.prototype.createBendpoints = function () {
  var edges = [];
  edges = edges.concat(this.graphManager.getAllEdges());
  var visited = new HashSet();
  var i;
  for (i = 0; i < edges.length; i++) {
    var edge = edges[i];

    if (!visited.contains(edge)) {
      var source = edge.getSource();
      var target = edge.getTarget();

      if (source == target) {
        edge.getBendpoints().push(new PointD());
        edge.getBendpoints().push(new PointD());
        this.createDummyNodesForBendpoints(edge);
        visited.add(edge);
      } else {
        var edgeList = [];

        edgeList = edgeList.concat(source.getEdgeListToNode(target));
        edgeList = edgeList.concat(target.getEdgeListToNode(source));

        if (!visited.contains(edgeList[0])) {
          if (edgeList.length > 1) {
            var k;
            for (k = 0; k < edgeList.length; k++) {
              var multiEdge = edgeList[k];
              multiEdge.getBendpoints().push(new PointD());
              this.createDummyNodesForBendpoints(multiEdge);
            }
          }
          visited.addAll(list);
        }
      }
    }

    if (visited.size() == edges.length) {
      break;
    }
  }
};

CoSELayout.prototype.positionNodesRadially = function (forest) {
  // We tile the trees to a grid row by row; first tree starts at (0,0)
  var currentStartingPoint = new Point(0, 0);
  var numberOfColumns = Math.ceil(Math.sqrt(forest.length));
  var height = 0;
  var currentY = 0;
  var currentX = 0;
  var point = new PointD(0, 0);

  for (var i = 0; i < forest.length; i++) {
    if (i % numberOfColumns == 0) {
      // Start of a new row, make the x coordinate 0, increment the
      // y coordinate with the max height of the previous row
      currentX = 0;
      currentY = height;

      if (i != 0) {
        currentY += CoSEConstants.DEFAULT_COMPONENT_SEPERATION;
      }

      height = 0;
    }

    var tree = forest[i];

    // Find the center of the tree
    var centerNode = Layout.findCenterOfTree(tree);

    // Set the staring point of the next tree
    currentStartingPoint.x = currentX;
    currentStartingPoint.y = currentY;

    // Do a radial layout starting with the center
    point = CoSELayout.radialLayout(tree, centerNode, currentStartingPoint);

    if (point.y > height) {
      height = Math.floor(point.y);
    }

    currentX = Math.floor(point.x + CoSEConstants.DEFAULT_COMPONENT_SEPERATION);
  }

  this.transform(new PointD(LayoutConstants.WORLD_CENTER_X - point.x / 2, LayoutConstants.WORLD_CENTER_Y - point.y / 2));
};

CoSELayout.radialLayout = function (tree, centerNode, startingPoint) {
  var radialSep = Math.max(this.maxDiagonalInTree(tree), CoSEConstants.DEFAULT_RADIAL_SEPARATION);
  CoSELayout.branchRadialLayout(centerNode, null, 0, 359, 0, radialSep);
  var bounds = LGraph.calculateBounds(tree);

  var transform = new Transform();
  transform.setDeviceOrgX(bounds.getMinX());
  transform.setDeviceOrgY(bounds.getMinY());
  transform.setWorldOrgX(startingPoint.x);
  transform.setWorldOrgY(startingPoint.y);

  for (var i = 0; i < tree.length; i++) {
    var node = tree[i];
    node.transform(transform);
  }

  var bottomRight = new PointD(bounds.getMaxX(), bounds.getMaxY());

  return transform.inverseTransformPoint(bottomRight);
};

CoSELayout.branchRadialLayout = function (node, parentOfNode, startAngle, endAngle, distance, radialSeparation) {
  // First, position this node by finding its angle.
  var halfInterval = (endAngle - startAngle + 1) / 2;

  if (halfInterval < 0) {
    halfInterval += 180;
  }

  var nodeAngle = (halfInterval + startAngle) % 360;
  var teta = nodeAngle * IGeometry.TWO_PI / 360;

  // Make polar to java cordinate conversion.
  var cos_teta = Math.cos(teta);
  var x_ = distance * Math.cos(teta);
  var y_ = distance * Math.sin(teta);

  node.setCenter(x_, y_);

  // Traverse all neighbors of this node and recursively call this
  // function.
  var neighborEdges = [];
  neighborEdges = neighborEdges.concat(node.getEdges());
  var childCount = neighborEdges.length;

  if (parentOfNode != null) {
    childCount--;
  }

  var branchCount = 0;

  var incEdgesCount = neighborEdges.length;
  var startIndex;

  var edges = node.getEdgesBetween(parentOfNode);

  // If there are multiple edges, prune them until there remains only one
  // edge.
  while (edges.length > 1) {
    //neighborEdges.remove(edges.remove(0));
    var temp = edges[0];
    edges.splice(0, 1);
    var index = neighborEdges.indexOf(temp);
    if (index >= 0) {
      neighborEdges.splice(index, 1);
    }
    incEdgesCount--;
    childCount--;
  }

  if (parentOfNode != null) {
    //assert edges.length == 1;
    startIndex = (neighborEdges.indexOf(edges[0]) + 1) % incEdgesCount;
  } else {
    startIndex = 0;
  }

  var stepAngle = Math.abs(endAngle - startAngle) / childCount;

  for (var i = startIndex; branchCount != childCount; i = ++i % incEdgesCount) {
    var currentNeighbor = neighborEdges[i].getOtherEnd(node);

    // Don't back traverse to root node in current tree.
    if (currentNeighbor == parentOfNode) {
      continue;
    }

    var childStartAngle = (startAngle + branchCount * stepAngle) % 360;
    var childEndAngle = (childStartAngle + stepAngle) % 360;

    CoSELayout.branchRadialLayout(currentNeighbor, node, childStartAngle, childEndAngle, distance + radialSeparation, radialSeparation);

    branchCount++;
  }
};

CoSELayout.maxDiagonalInTree = function (tree) {
  var maxDiagonal = Integer.MIN_VALUE;

  for (var i = 0; i < tree.length; i++) {
    var node = tree[i];
    var diagonal = node.getDiagonal();

    if (diagonal > maxDiagonal) {
      maxDiagonal = diagonal;
    }
  }

  return maxDiagonal;
};

CoSELayout.prototype.calcRepulsionRange = function () {
  // formula is 2 x (level + 1) x idealEdgeLength
  return 2 * (this.level + 1) * this.idealEdgeLength;
};

// Tiling methods

// Group zero degree members whose parents are not to be tiled, create dummy parents where needed and fill memberGroups by their dummp parent id's
CoSELayout.prototype.groupZeroDegreeMembers = function () {
  var self = this;
  // array of [parent_id x oneDegreeNode_id]
  var tempMemberGroups = {}; // A temporary map of parent node and its zero degree members
  this.memberGroups = {}; // A map of dummy parent node and its zero degree members whose parents are not to be tiled
  this.idToDummyNode = {}; // A map of id to dummy node 

  var zeroDegree = []; // List of zero degree nodes whose parents are not to be tiled
  var allNodes = this.graphManager.getAllNodes();

  // Fill zero degree list
  for (var i = 0; i < allNodes.length; i++) {
    var node = allNodes[i];
    var parent = node.getParent();
    // If a node has zero degree and its parent is not to be tiled if exists add that node to zeroDegres list
    if (this.getNodeDegreeWithChildren(node) === 0 && (parent.id == undefined || !this.getToBeTiled(parent))) {
      zeroDegree.push(node);
    }
  }

  // Create a map of parent node and its zero degree members
  for (var i = 0; i < zeroDegree.length; i++) {
    var node = zeroDegree[i]; // Zero degree node itself
    var p_id = node.getParent().id; // Parent id

    if (typeof tempMemberGroups[p_id] === "undefined") tempMemberGroups[p_id] = [];

    tempMemberGroups[p_id] = tempMemberGroups[p_id].concat(node); // Push node to the list belongs to its parent in tempMemberGroups
  }

  // If there are at least two nodes at a level, create a dummy compound for them
  Object.keys(tempMemberGroups).forEach(function (p_id) {
    if (tempMemberGroups[p_id].length > 1) {
      var dummyCompoundId = "DummyCompound_" + p_id; // The id of dummy compound which will be created soon
      self.memberGroups[dummyCompoundId] = tempMemberGroups[p_id]; // Add dummy compound to memberGroups

      var parent = tempMemberGroups[p_id][0].getParent(); // The parent of zero degree nodes will be the parent of new dummy compound

      // Create a dummy compound with calculated id
      var dummyCompound = new CoSENode(self.graphManager);
      dummyCompound.id = dummyCompoundId;
      dummyCompound.paddingLeft = parent.paddingLeft || 0;
      dummyCompound.paddingRight = parent.paddingRight || 0;
      dummyCompound.paddingBottom = parent.paddingBottom || 0;
      dummyCompound.paddingTop = parent.paddingTop || 0;

      self.idToDummyNode[dummyCompoundId] = dummyCompound;

      var dummyParentGraph = self.getGraphManager().add(self.newGraph(), dummyCompound);
      var parentGraph = parent.getChild();

      // Add dummy compound to parent the graph
      parentGraph.add(dummyCompound);

      // For each zero degree node in this level remove it from its parent graph and add it to the graph of dummy parent
      for (var i = 0; i < tempMemberGroups[p_id].length; i++) {
        var node = tempMemberGroups[p_id][i];

        parentGraph.remove(node);
        dummyParentGraph.add(node);
      }
    }
  });
};

CoSELayout.prototype.clearCompounds = function () {
  var childGraphMap = {};
  var idToNode = {};

  // Get compound ordering by finding the inner one first
  this.performDFSOnCompounds();

  for (var i = 0; i < this.compoundOrder.length; i++) {

    idToNode[this.compoundOrder[i].id] = this.compoundOrder[i];
    childGraphMap[this.compoundOrder[i].id] = [].concat(this.compoundOrder[i].getChild().getNodes());

    // Remove children of compounds
    this.graphManager.remove(this.compoundOrder[i].getChild());
    this.compoundOrder[i].child = null;
  }

  this.graphManager.resetAllNodes();

  // Tile the removed children
  this.tileCompoundMembers(childGraphMap, idToNode);
};

CoSELayout.prototype.clearZeroDegreeMembers = function () {
  var self = this;
  var tiledZeroDegreePack = this.tiledZeroDegreePack = [];

  Object.keys(this.memberGroups).forEach(function (id) {
    var compoundNode = self.idToDummyNode[id]; // Get the dummy compound

    tiledZeroDegreePack[id] = self.tileNodes(self.memberGroups[id], compoundNode.paddingLeft + compoundNode.paddingRight);

    // Set the width and height of the dummy compound as calculated
    compoundNode.rect.width = tiledZeroDegreePack[id].width;
    compoundNode.rect.height = tiledZeroDegreePack[id].height;
  });
};

CoSELayout.prototype.repopulateCompounds = function () {
  for (var i = this.compoundOrder.length - 1; i >= 0; i--) {
    var lCompoundNode = this.compoundOrder[i];
    var id = lCompoundNode.id;
    var horizontalMargin = lCompoundNode.paddingLeft;
    var verticalMargin = lCompoundNode.paddingTop;

    this.adjustLocations(this.tiledMemberPack[id], lCompoundNode.rect.x, lCompoundNode.rect.y, horizontalMargin, verticalMargin);
  }
};

CoSELayout.prototype.repopulateZeroDegreeMembers = function () {
  var self = this;
  var tiledPack = this.tiledZeroDegreePack;

  Object.keys(tiledPack).forEach(function (id) {
    var compoundNode = self.idToDummyNode[id]; // Get the dummy compound by its id
    var horizontalMargin = compoundNode.paddingLeft;
    var verticalMargin = compoundNode.paddingTop;

    // Adjust the positions of nodes wrt its compound
    self.adjustLocations(tiledPack[id], compoundNode.rect.x, compoundNode.rect.y, horizontalMargin, verticalMargin);
  });
};

CoSELayout.prototype.getToBeTiled = function (node) {
  var id = node.id;
  //firstly check the previous results
  if (this.toBeTiled[id] != null) {
    return this.toBeTiled[id];
  }

  //only compound nodes are to be tiled
  var childGraph = node.getChild();
  if (childGraph == null) {
    this.toBeTiled[id] = false;
    return false;
  }

  var children = childGraph.getNodes(); // Get the children nodes

  //a compound node is not to be tiled if all of its compound children are not to be tiled
  for (var i = 0; i < children.length; i++) {
    var theChild = children[i];

    if (this.getNodeDegree(theChild) > 0) {
      this.toBeTiled[id] = false;
      return false;
    }

    //pass the children not having the compound structure
    if (theChild.getChild() == null) {
      this.toBeTiled[theChild.id] = false;
      continue;
    }

    if (!this.getToBeTiled(theChild)) {
      this.toBeTiled[id] = false;
      return false;
    }
  }
  this.toBeTiled[id] = true;
  return true;
};

// Get degree of a node depending of its edges and independent of its children
CoSELayout.prototype.getNodeDegree = function (node) {
  var id = node.id;
  var edges = node.getEdges();
  var degree = 0;

  // For the edges connected
  for (var i = 0; i < edges.length; i++) {
    var edge = edges[i];
    if (edge.getSource().id !== edge.getTarget().id) {
      degree = degree + 1;
    }
  }
  return degree;
};

// Get degree of a node with its children
CoSELayout.prototype.getNodeDegreeWithChildren = function (node) {
  var degree = this.getNodeDegree(node);
  if (node.getChild() == null) {
    return degree;
  }
  var children = node.getChild().getNodes();
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    degree += this.getNodeDegreeWithChildren(child);
  }
  return degree;
};

CoSELayout.prototype.performDFSOnCompounds = function () {
  this.compoundOrder = [];
  this.fillCompexOrderByDFS(this.graphManager.getRoot().getNodes());
};

CoSELayout.prototype.fillCompexOrderByDFS = function (children) {
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    if (child.getChild() != null) {
      this.fillCompexOrderByDFS(child.getChild().getNodes());
    }
    if (this.getToBeTiled(child)) {
      this.compoundOrder.push(child);
    }
  }
};

/**
* This method places each zero degree member wrt given (x,y) coordinates (top left).
*/
CoSELayout.prototype.adjustLocations = function (organization, x, y, compoundHorizontalMargin, compoundVerticalMargin) {
  x += compoundHorizontalMargin;
  y += compoundVerticalMargin;

  var left = x;

  for (var i = 0; i < organization.rows.length; i++) {
    var row = organization.rows[i];
    x = left;
    var maxHeight = 0;

    for (var j = 0; j < row.length; j++) {
      var lnode = row[j];

      lnode.rect.x = x; // + lnode.rect.width / 2;
      lnode.rect.y = y; // + lnode.rect.height / 2;

      x += lnode.rect.width + organization.horizontalPadding;

      if (lnode.rect.height > maxHeight) maxHeight = lnode.rect.height;
    }

    y += maxHeight + organization.verticalPadding;
  }
};

CoSELayout.prototype.tileCompoundMembers = function (childGraphMap, idToNode) {
  var self = this;
  this.tiledMemberPack = [];

  Object.keys(childGraphMap).forEach(function (id) {
    // Get the compound node
    var compoundNode = idToNode[id];

    self.tiledMemberPack[id] = self.tileNodes(childGraphMap[id], compoundNode.paddingLeft + compoundNode.paddingRight);

    compoundNode.rect.width = self.tiledMemberPack[id].width + 20;
    compoundNode.rect.height = self.tiledMemberPack[id].height + 20;
  });
};

CoSELayout.prototype.tileNodes = function (nodes, minWidth) {
  var verticalPadding = CoSEConstants.TILING_PADDING_VERTICAL;
  var horizontalPadding = CoSEConstants.TILING_PADDING_HORIZONTAL;
  var organization = {
    rows: [],
    rowWidth: [],
    rowHeight: [],
    width: 20,
    height: 20,
    verticalPadding: verticalPadding,
    horizontalPadding: horizontalPadding
  };

  // Sort the nodes in ascending order of their areas
  nodes.sort(function (n1, n2) {
    if (n1.rect.width * n1.rect.height > n2.rect.width * n2.rect.height) return -1;
    if (n1.rect.width * n1.rect.height < n2.rect.width * n2.rect.height) return 1;
    return 0;
  });

  // Create the organization -> tile members
  for (var i = 0; i < nodes.length; i++) {
    var lNode = nodes[i];

    if (organization.rows.length == 0) {
      this.insertNodeToRow(organization, lNode, 0, minWidth);
    } else if (this.canAddHorizontal(organization, lNode.rect.width, lNode.rect.height)) {
      this.insertNodeToRow(organization, lNode, this.getShortestRowIndex(organization), minWidth);
    } else {
      this.insertNodeToRow(organization, lNode, organization.rows.length, minWidth);
    }

    this.shiftToLastRow(organization);
  }

  return organization;
};

CoSELayout.prototype.insertNodeToRow = function (organization, node, rowIndex, minWidth) {
  var minCompoundSize = minWidth;

  // Add new row if needed
  if (rowIndex == organization.rows.length) {
    var secondDimension = [];

    organization.rows.push(secondDimension);
    organization.rowWidth.push(minCompoundSize);
    organization.rowHeight.push(0);
  }

  // Update row width
  var w = organization.rowWidth[rowIndex] + node.rect.width;

  if (organization.rows[rowIndex].length > 0) {
    w += organization.horizontalPadding;
  }

  organization.rowWidth[rowIndex] = w;
  // Update compound width
  if (organization.width < w) {
    organization.width = w;
  }

  // Update height
  var h = node.rect.height;
  if (rowIndex > 0) h += organization.verticalPadding;

  var extraHeight = 0;
  if (h > organization.rowHeight[rowIndex]) {
    extraHeight = organization.rowHeight[rowIndex];
    organization.rowHeight[rowIndex] = h;
    extraHeight = organization.rowHeight[rowIndex] - extraHeight;
  }

  organization.height += extraHeight;

  // Insert node
  organization.rows[rowIndex].push(node);
};

//Scans the rows of an organization and returns the one with the min width
CoSELayout.prototype.getShortestRowIndex = function (organization) {
  var r = -1;
  var min = Number.MAX_VALUE;

  for (var i = 0; i < organization.rows.length; i++) {
    if (organization.rowWidth[i] < min) {
      r = i;
      min = organization.rowWidth[i];
    }
  }
  return r;
};

//Scans the rows of an organization and returns the one with the max width
CoSELayout.prototype.getLongestRowIndex = function (organization) {
  var r = -1;
  var max = Number.MIN_VALUE;

  for (var i = 0; i < organization.rows.length; i++) {

    if (organization.rowWidth[i] > max) {
      r = i;
      max = organization.rowWidth[i];
    }
  }

  return r;
};

/**
* This method checks whether adding extra width to the organization violates
* the aspect ratio(1) or not.
*/
CoSELayout.prototype.canAddHorizontal = function (organization, extraWidth, extraHeight) {

  var sri = this.getShortestRowIndex(organization);

  if (sri < 0) {
    return true;
  }

  var min = organization.rowWidth[sri];

  if (min + organization.horizontalPadding + extraWidth <= organization.width) return true;

  var hDiff = 0;

  // Adding to an existing row
  if (organization.rowHeight[sri] < extraHeight) {
    if (sri > 0) hDiff = extraHeight + organization.verticalPadding - organization.rowHeight[sri];
  }

  var add_to_row_ratio;
  if (organization.width - min >= extraWidth + organization.horizontalPadding) {
    add_to_row_ratio = (organization.height + hDiff) / (min + extraWidth + organization.horizontalPadding);
  } else {
    add_to_row_ratio = (organization.height + hDiff) / organization.width;
  }

  // Adding a new row for this node
  hDiff = extraHeight + organization.verticalPadding;
  var add_new_row_ratio;
  if (organization.width < extraWidth) {
    add_new_row_ratio = (organization.height + hDiff) / extraWidth;
  } else {
    add_new_row_ratio = (organization.height + hDiff) / organization.width;
  }

  if (add_new_row_ratio < 1) add_new_row_ratio = 1 / add_new_row_ratio;

  if (add_to_row_ratio < 1) add_to_row_ratio = 1 / add_to_row_ratio;

  return add_to_row_ratio < add_new_row_ratio;
};

//If moving the last node from the longest row and adding it to the last
//row makes the bounding box smaller, do it.
CoSELayout.prototype.shiftToLastRow = function (organization) {
  var longest = this.getLongestRowIndex(organization);
  var last = organization.rowWidth.length - 1;
  var row = organization.rows[longest];
  var node = row[row.length - 1];

  var diff = node.width + organization.horizontalPadding;

  // Check if there is enough space on the last row
  if (organization.width - organization.rowWidth[last] > diff && longest != last) {
    // Remove the last element of the longest row
    row.splice(-1, 1);

    // Push it to the last row
    organization.rows[last].push(node);

    organization.rowWidth[longest] = organization.rowWidth[longest] - diff;
    organization.rowWidth[last] = organization.rowWidth[last] + diff;
    organization.width = organization.rowWidth[instance.getLongestRowIndex(organization)];

    // Update heights of the organization
    var maxHeight = Number.MIN_VALUE;
    for (var i = 0; i < row.length; i++) {
      if (row[i].height > maxHeight) maxHeight = row[i].height;
    }
    if (longest > 0) maxHeight += organization.verticalPadding;

    var prevTotal = organization.rowHeight[longest] + organization.rowHeight[last];

    organization.rowHeight[longest] = maxHeight;
    if (organization.rowHeight[last] < node.height + organization.verticalPadding) organization.rowHeight[last] = node.height + organization.verticalPadding;

    var finalTotal = organization.rowHeight[longest] + organization.rowHeight[last];
    organization.height += finalTotal - prevTotal;

    this.shiftToLastRow(organization);
  }
};

CoSELayout.prototype.tilingPreLayout = function () {
  if (CoSEConstants.TILE) {
    // Find zero degree nodes and create a compound for each level
    this.groupZeroDegreeMembers();
    // Tile and clear children of each compound
    this.clearCompounds();
    // Separately tile and clear zero degree nodes for each level
    this.clearZeroDegreeMembers();
  }
};

CoSELayout.prototype.tilingPostLayout = function () {
  if (CoSEConstants.TILE) {
    this.repopulateZeroDegreeMembers();
    this.repopulateCompounds();
  }
};

module.exports = CoSELayout;

},{"./CoSEConstants":4,"./CoSEEdge":5,"./CoSEGraph":6,"./CoSEGraphManager":7,"./CoSENode":9,"./FDLayout":12,"./FDLayoutConstants":13,"./IGeometry":18,"./Integer":20,"./LGraph":22,"./Layout":26,"./LayoutConstants":27,"./Point":28,"./PointD":29,"./Transform":32}],9:[function(require,module,exports){
'use strict';

var FDLayoutNode = require('./FDLayoutNode');
var IMath = require('./IMath');

function CoSENode(gm, loc, size, vNode) {
  FDLayoutNode.call(this, gm, loc, size, vNode);
}

CoSENode.prototype = Object.create(FDLayoutNode.prototype);
for (var prop in FDLayoutNode) {
  CoSENode[prop] = FDLayoutNode[prop];
}

CoSENode.prototype.move = function () {
  var layout = this.graphManager.getLayout();
  this.displacementX = layout.coolingFactor * (this.springForceX + this.repulsionForceX + this.gravitationForceX) / this.noOfChildren;
  this.displacementY = layout.coolingFactor * (this.springForceY + this.repulsionForceY + this.gravitationForceY) / this.noOfChildren;

  if (Math.abs(this.displacementX) > layout.coolingFactor * layout.maxNodeDisplacement) {
    this.displacementX = layout.coolingFactor * layout.maxNodeDisplacement * IMath.sign(this.displacementX);
  }

  if (Math.abs(this.displacementY) > layout.coolingFactor * layout.maxNodeDisplacement) {
    this.displacementY = layout.coolingFactor * layout.maxNodeDisplacement * IMath.sign(this.displacementY);
  }

  // a simple node, just move it
  if (this.child == null) {
    this.moveBy(this.displacementX, this.displacementY);
  }
  // an empty compound node, again just move it
  else if (this.child.getNodes().length == 0) {
      this.moveBy(this.displacementX, this.displacementY);
    }
    // non-empty compound node, propogate movement to children as well
    else {
        this.propogateDisplacementToChildren(this.displacementX, this.displacementY);
      }

  layout.totalDisplacement += Math.abs(this.displacementX) + Math.abs(this.displacementY);

  this.springForceX = 0;
  this.springForceY = 0;
  this.repulsionForceX = 0;
  this.repulsionForceY = 0;
  this.gravitationForceX = 0;
  this.gravitationForceY = 0;
  this.displacementX = 0;
  this.displacementY = 0;
};

CoSENode.prototype.propogateDisplacementToChildren = function (dX, dY) {
  var nodes = this.getChild().getNodes();
  var node;
  for (var i = 0; i < nodes.length; i++) {
    node = nodes[i];
    if (node.getChild() == null) {
      node.moveBy(dX, dY);
      node.displacementX += dX;
      node.displacementY += dY;
    } else {
      node.propogateDisplacementToChildren(dX, dY);
    }
  }
};

CoSENode.prototype.setPred1 = function (pred1) {
  this.pred1 = pred1;
};

CoSENode.prototype.getPred1 = function () {
  return pred1;
};

CoSENode.prototype.getPred2 = function () {
  return pred2;
};

CoSENode.prototype.setNext = function (next) {
  this.next = next;
};

CoSENode.prototype.getNext = function () {
  return next;
};

CoSENode.prototype.setProcessed = function (processed) {
  this.processed = processed;
};

CoSENode.prototype.isProcessed = function () {
  return processed;
};

module.exports = CoSENode;

},{"./FDLayoutNode":15,"./IMath":19}],10:[function(require,module,exports){
"use strict";

function DimensionD(width, height) {
  this.width = 0;
  this.height = 0;
  if (width !== null && height !== null) {
    this.height = height;
    this.width = width;
  }
}

DimensionD.prototype.getWidth = function () {
  return this.width;
};

DimensionD.prototype.setWidth = function (width) {
  this.width = width;
};

DimensionD.prototype.getHeight = function () {
  return this.height;
};

DimensionD.prototype.setHeight = function (height) {
  this.height = height;
};

module.exports = DimensionD;

},{}],11:[function(require,module,exports){
"use strict";

function Emitter() {
  this.listeners = [];
}

var p = Emitter.prototype;

p.addListener = function (event, callback) {
  this.listeners.push({
    event: event,
    callback: callback
  });
};

p.removeListener = function (event, callback) {
  for (var i = this.listeners.length; i >= 0; i--) {
    var l = this.listeners[i];

    if (l.event === event && l.callback === callback) {
      this.listeners.splice(i, 1);
    }
  }
};

p.emit = function (event, data) {
  for (var i = 0; i < this.listeners.length; i++) {
    var l = this.listeners[i];

    if (event === l.event) {
      l.callback(data);
    }
  }
};

module.exports = Emitter;

},{}],12:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Layout = require('./Layout');
var FDLayoutConstants = require('./FDLayoutConstants');
var LayoutConstants = require('./LayoutConstants');
var IGeometry = require('./IGeometry');
var IMath = require('./IMath');
var Integer = require('./Integer');

function FDLayout() {
  Layout.call(this);

  this.useSmartIdealEdgeLengthCalculation = FDLayoutConstants.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION;
  this.idealEdgeLength = FDLayoutConstants.DEFAULT_EDGE_LENGTH;
  this.springConstant = FDLayoutConstants.DEFAULT_SPRING_STRENGTH;
  this.repulsionConstant = FDLayoutConstants.DEFAULT_REPULSION_STRENGTH;
  this.gravityConstant = FDLayoutConstants.DEFAULT_GRAVITY_STRENGTH;
  this.compoundGravityConstant = FDLayoutConstants.DEFAULT_COMPOUND_GRAVITY_STRENGTH;
  this.gravityRangeFactor = FDLayoutConstants.DEFAULT_GRAVITY_RANGE_FACTOR;
  this.compoundGravityRangeFactor = FDLayoutConstants.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR;
  this.displacementThresholdPerNode = 3.0 * FDLayoutConstants.DEFAULT_EDGE_LENGTH / 100;
  this.coolingFactor = FDLayoutConstants.DEFAULT_COOLING_FACTOR_INCREMENTAL;
  this.initialCoolingFactor = FDLayoutConstants.DEFAULT_COOLING_FACTOR_INCREMENTAL;
  this.totalDisplacement = 0.0;
  this.oldTotalDisplacement = 0.0;
  this.maxIterations = FDLayoutConstants.MAX_ITERATIONS;
}

FDLayout.prototype = Object.create(Layout.prototype);

for (var prop in Layout) {
  FDLayout[prop] = Layout[prop];
}

FDLayout.prototype.initParameters = function () {
  Layout.prototype.initParameters.call(this, arguments);

  if (this.layoutQuality == LayoutConstants.DRAFT_QUALITY) {
    this.displacementThresholdPerNode += 0.30;
    this.maxIterations *= 0.8;
  } else if (this.layoutQuality == LayoutConstants.PROOF_QUALITY) {
    this.displacementThresholdPerNode -= 0.30;
    this.maxIterations *= 1.2;
  }

  this.totalIterations = 0;
  this.notAnimatedIterations = 0;

  this.useFRGridVariant = FDLayoutConstants.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION;

  this.grid = [];
  // variables for tree reduction support
  this.prunedNodesAll = [];
  this.growTreeIterations = 0;
  this.afterGrowthIterations = 0;
  this.isTreeGrowing = false;
  this.isGrowthFinished = false;
};

FDLayout.prototype.calcIdealEdgeLengths = function () {
  var edge;
  var lcaDepth;
  var source;
  var target;
  var sizeOfSourceInLca;
  var sizeOfTargetInLca;

  var allEdges = this.getGraphManager().getAllEdges();
  for (var i = 0; i < allEdges.length; i++) {
    edge = allEdges[i];

    edge.idealLength = this.idealEdgeLength;

    if (edge.isInterGraph) {
      source = edge.getSource();
      target = edge.getTarget();

      sizeOfSourceInLca = edge.getSourceInLca().getEstimatedSize();
      sizeOfTargetInLca = edge.getTargetInLca().getEstimatedSize();

      if (this.useSmartIdealEdgeLengthCalculation) {
        edge.idealLength += sizeOfSourceInLca + sizeOfTargetInLca - 2 * LayoutConstants.SIMPLE_NODE_SIZE;
      }

      lcaDepth = edge.getLca().getInclusionTreeDepth();

      edge.idealLength += FDLayoutConstants.DEFAULT_EDGE_LENGTH * FDLayoutConstants.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR * (source.getInclusionTreeDepth() + target.getInclusionTreeDepth() - 2 * lcaDepth);
    }
  }
};

FDLayout.prototype.initSpringEmbedder = function () {

  if (this.incremental) {
    this.maxNodeDisplacement = FDLayoutConstants.MAX_NODE_DISPLACEMENT_INCREMENTAL;
  } else {
    this.coolingFactor = 1.0;
    this.initialCoolingFactor = 1.0;
    this.maxNodeDisplacement = FDLayoutConstants.MAX_NODE_DISPLACEMENT;
  }

  this.maxIterations = Math.max(this.getAllNodes().length * 5, this.maxIterations);

  this.totalDisplacementThreshold = this.displacementThresholdPerNode * this.getAllNodes().length;

  this.repulsionRange = this.calcRepulsionRange();
};

FDLayout.prototype.calcSpringForces = function () {
  var lEdges = this.getAllEdges();
  var edge;

  for (var i = 0; i < lEdges.length; i++) {
    edge = lEdges[i];

    this.calcSpringForce(edge, edge.idealLength);
  }
};

FDLayout.prototype.calcRepulsionForces = function () {
  var i, j;
  var nodeA, nodeB;
  var lNodes = this.getAllNodes();
  var processedNodeSet;

  if (this.useFRGridVariant) {
    if (this.totalIterations % FDLayoutConstants.GRID_CALCULATION_CHECK_PERIOD == 1 && !this.isTreeGrowing && !this.isGrowthFinished) {
      this.updateGrid();
    }

    processedNodeSet = new Set();

    // calculate repulsion forces between each nodes and its surrounding
    for (i = 0; i < lNodes.length; i++) {
      nodeA = lNodes[i];
      this.calculateRepulsionForceOfANode(nodeA, processedNodeSet);
      processedNodeSet.add(nodeA);
    }
  } else {
    for (i = 0; i < lNodes.length; i++) {
      nodeA = lNodes[i];

      for (j = i + 1; j < lNodes.length; j++) {
        nodeB = lNodes[j];

        // If both nodes are not members of the same graph, skip.
        if (nodeA.getOwner() != nodeB.getOwner()) {
          continue;
        }

        this.calcRepulsionForce(nodeA, nodeB);
      }
    }
  }
};

FDLayout.prototype.calcGravitationalForces = function () {
  var node;
  var allNodes = new Set(this.getAllNodes());
  var lNodes = this.getAllNodesToApplyGravitation();

  var intersection = lNodes.filter(function (x) {
    return allNodes.has(x);
  });

  for (var i = 0; i < intersection.length; i++) {
    node = intersection[i];
    this.calcGravitationalForce(node);
  }
};

FDLayout.prototype.moveNodes = function () {
  var lNodes = this.getAllNodes();
  var node;

  for (var i = 0; i < lNodes.length; i++) {
    node = lNodes[i];
    node.move();
  }
};

FDLayout.prototype.calcSpringForce = function (edge, idealLength) {
  var sourceNode = edge.getSource();
  var targetNode = edge.getTarget();

  var length;
  var springForce;
  var springForceX;
  var springForceY;

  // Update edge length
  if (this.uniformLeafNodeSizes && sourceNode.getChild() == null && targetNode.getChild() == null) {
    edge.updateLengthSimple();
  } else {
    edge.updateLength();

    if (edge.isOverlapingSourceAndTarget) {
      return;
    }
  }

  length = edge.getLength();

  // Calculate spring forces
  springForce = this.springConstant * (length - idealLength);

  // Project force onto x and y axes
  springForceX = springForce * (edge.lengthX / length);
  springForceY = springForce * (edge.lengthY / length);

  // Apply forces on the end nodes
  sourceNode.springForceX += springForceX;
  sourceNode.springForceY += springForceY;
  targetNode.springForceX -= springForceX;
  targetNode.springForceY -= springForceY;
};

FDLayout.prototype.calcRepulsionForce = function (nodeA, nodeB) {
  var rectA = nodeA.getRect();
  var rectB = nodeB.getRect();
  var overlapAmount = new Array(2);
  var clipPoints = new Array(4);
  var distanceX;
  var distanceY;
  var distanceSquared;
  var distance;
  var repulsionForce;
  var repulsionForceX;
  var repulsionForceY;

  if (rectA.intersects(rectB)) // two nodes overlap
    {
      // calculate separation amount in x and y directions
      IGeometry.calcSeparationAmount(rectA, rectB, overlapAmount, FDLayoutConstants.DEFAULT_EDGE_LENGTH / 2.0);

      repulsionForceX = 2 * overlapAmount[0];
      repulsionForceY = 2 * overlapAmount[1];

      var childrenConstant = nodeA.noOfChildren * nodeB.noOfChildren / (nodeA.noOfChildren + nodeB.noOfChildren);

      // Apply forces on the two nodes
      nodeA.repulsionForceX -= childrenConstant * repulsionForceX;
      nodeA.repulsionForceY -= childrenConstant * repulsionForceY;
      nodeB.repulsionForceX += childrenConstant * repulsionForceX;
      nodeB.repulsionForceY += childrenConstant * repulsionForceY;
    } else // no overlap
    {
      // calculate distance

      if (this.uniformLeafNodeSizes && nodeA.getChild() == null && nodeB.getChild() == null) // simply base repulsion on distance of node centers
        {
          distanceX = rectB.getCenterX() - rectA.getCenterX();
          distanceY = rectB.getCenterY() - rectA.getCenterY();
        } else // use clipping points
        {
          IGeometry.getIntersection(rectA, rectB, clipPoints);

          distanceX = clipPoints[2] - clipPoints[0];
          distanceY = clipPoints[3] - clipPoints[1];
        }

      // No repulsion range. FR grid variant should take care of this.
      if (Math.abs(distanceX) < FDLayoutConstants.MIN_REPULSION_DIST) {
        distanceX = IMath.sign(distanceX) * FDLayoutConstants.MIN_REPULSION_DIST;
      }

      if (Math.abs(distanceY) < FDLayoutConstants.MIN_REPULSION_DIST) {
        distanceY = IMath.sign(distanceY) * FDLayoutConstants.MIN_REPULSION_DIST;
      }

      distanceSquared = distanceX * distanceX + distanceY * distanceY;
      distance = Math.sqrt(distanceSquared);

      repulsionForce = this.repulsionConstant * nodeA.noOfChildren * nodeB.noOfChildren / distanceSquared;

      // Project force onto x and y axes
      repulsionForceX = repulsionForce * distanceX / distance;
      repulsionForceY = repulsionForce * distanceY / distance;

      // Apply forces on the two nodes    
      nodeA.repulsionForceX -= repulsionForceX;
      nodeA.repulsionForceY -= repulsionForceY;
      nodeB.repulsionForceX += repulsionForceX;
      nodeB.repulsionForceY += repulsionForceY;
    }
};

FDLayout.prototype.calcGravitationalForce = function (node) {
  var ownerGraph;
  var ownerCenterX;
  var ownerCenterY;
  var distanceX;
  var distanceY;
  var absDistanceX;
  var absDistanceY;
  var estimatedSize;
  ownerGraph = node.getOwner();

  ownerCenterX = (ownerGraph.getRight() + ownerGraph.getLeft()) / 2;
  ownerCenterY = (ownerGraph.getTop() + ownerGraph.getBottom()) / 2;
  distanceX = node.getCenterX() - ownerCenterX;
  distanceY = node.getCenterY() - ownerCenterY;
  absDistanceX = Math.abs(distanceX) + node.getWidth() / 2;
  absDistanceY = Math.abs(distanceY) + node.getHeight() / 2;

  if (node.getOwner() == this.graphManager.getRoot()) // in the root graph
    {
      estimatedSize = ownerGraph.getEstimatedSize() * this.gravityRangeFactor;

      if (absDistanceX > estimatedSize || absDistanceY > estimatedSize) {
        node.gravitationForceX = -this.gravityConstant * distanceX;
        node.gravitationForceY = -this.gravityConstant * distanceY;
      }
    } else // inside a compound
    {
      estimatedSize = ownerGraph.getEstimatedSize() * this.compoundGravityRangeFactor;

      if (absDistanceX > estimatedSize || absDistanceY > estimatedSize) {
        node.gravitationForceX = -this.gravityConstant * distanceX * this.compoundGravityConstant;
        node.gravitationForceY = -this.gravityConstant * distanceY * this.compoundGravityConstant;
      }
    }
};

FDLayout.prototype.isConverged = function () {
  var converged;
  var oscilating = false;

  if (this.totalIterations > this.maxIterations / 3) {
    oscilating = Math.abs(this.totalDisplacement - this.oldTotalDisplacement) < 2;
  }

  converged = this.totalDisplacement < this.totalDisplacementThreshold;

  this.oldTotalDisplacement = this.totalDisplacement;

  return converged || oscilating;
};

FDLayout.prototype.animate = function () {
  if (this.animationDuringLayout && !this.isSubLayout) {
    if (this.notAnimatedIterations == this.animationPeriod) {
      this.update();
      this.notAnimatedIterations = 0;
    } else {
      this.notAnimatedIterations++;
    }
  }
};

// -----------------------------------------------------------------------------
// Section: FR-Grid Variant Repulsion Force Calculation
// -----------------------------------------------------------------------------

FDLayout.prototype.calcGrid = function (graph) {

  var sizeX = 0;
  var sizeY = 0;

  sizeX = parseInt(Math.ceil((graph.getRight() - graph.getLeft()) / this.repulsionRange));
  sizeY = parseInt(Math.ceil((graph.getBottom() - graph.getTop()) / this.repulsionRange));

  var grid = new Array(sizeX);

  for (var i = 0; i < sizeX; i++) {
    grid[i] = new Array(sizeY);
  }

  for (var i = 0; i < sizeX; i++) {
    for (var j = 0; j < sizeY; j++) {
      grid[i][j] = new Array();
    }
  }

  return grid;
};

FDLayout.prototype.addNodeToGrid = function (v, left, top) {

  var startX = 0;
  var finishX = 0;
  var startY = 0;
  var finishY = 0;

  startX = parseInt(Math.floor((v.getRect().x - left) / this.repulsionRange));
  finishX = parseInt(Math.floor((v.getRect().width + v.getRect().x - left) / this.repulsionRange));
  startY = parseInt(Math.floor((v.getRect().y - top) / this.repulsionRange));
  finishY = parseInt(Math.floor((v.getRect().height + v.getRect().y - top) / this.repulsionRange));

  for (var i = startX; i <= finishX; i++) {
    for (var j = startY; j <= finishY; j++) {
      this.grid[i][j].push(v);
      v.setGridCoordinates(startX, finishX, startY, finishY);
    }
  }
};

FDLayout.prototype.updateGrid = function () {
  var i;
  var nodeA;
  var lNodes = this.getAllNodes();

  this.grid = this.calcGrid(this.graphManager.getRoot());

  // put all nodes to proper grid cells
  for (i = 0; i < lNodes.length; i++) {
    nodeA = lNodes[i];
    this.addNodeToGrid(nodeA, this.graphManager.getRoot().getLeft(), this.graphManager.getRoot().getTop());
  }
};

FDLayout.prototype.calculateRepulsionForceOfANode = function (nodeA, processedNodeSet) {

  if (this.totalIterations % FDLayoutConstants.GRID_CALCULATION_CHECK_PERIOD == 1 && !this.isTreeGrowing && !this.isGrowthFinished || this.growTreeIterations % 10 == 1 && this.isTreeGrowing || this.afterGrowthIterations % 10 == 1 && this.isGrowthFinished) {
    var surrounding = new Set();
    nodeA.surrounding = new Array();
    var nodeB;
    var grid = this.grid;

    for (var i = nodeA.startX - 1; i < nodeA.finishX + 2; i++) {
      for (var j = nodeA.startY - 1; j < nodeA.finishY + 2; j++) {
        if (!(i < 0 || j < 0 || i >= grid.length || j >= grid[0].length)) {
          for (var k = 0; k < grid[i][j].length; k++) {
            nodeB = grid[i][j][k];

            // If both nodes are not members of the same graph, 
            // or both nodes are the same, skip.
            if (nodeA.getOwner() != nodeB.getOwner() || nodeA == nodeB) {
              continue;
            }

            // check if the repulsion force between
            // nodeA and nodeB has already been calculated
            if (!processedNodeSet.has(nodeB) && !surrounding.has(nodeB)) {
              var distanceX = Math.abs(nodeA.getCenterX() - nodeB.getCenterX()) - (nodeA.getWidth() / 2 + nodeB.getWidth() / 2);
              var distanceY = Math.abs(nodeA.getCenterY() - nodeB.getCenterY()) - (nodeA.getHeight() / 2 + nodeB.getHeight() / 2);

              // if the distance between nodeA and nodeB 
              // is less then calculation range
              if (distanceX <= this.repulsionRange && distanceY <= this.repulsionRange) {
                //then add nodeB to surrounding of nodeA
                surrounding.add(nodeB);
              }
            }
          }
        }
      }
    }

    nodeA.surrounding = [].concat(_toConsumableArray(surrounding));
  }
  for (i = 0; i < nodeA.surrounding.length; i++) {
    this.calcRepulsionForce(nodeA, nodeA.surrounding[i]);
  }
};

FDLayout.prototype.calcRepulsionRange = function () {
  return 0.0;
};

// -----------------------------------------------------------------------------
// Section: Tree Reduction methods
// -----------------------------------------------------------------------------
// Reduce trees 
FDLayout.prototype.reduceTrees = function () {
  var prunedNodesAll = [];
  var containsLeaf = true;
  var node;

  while (containsLeaf) {
    var allNodes = this.graphManager.getAllNodes();
    var prunedNodesInStepTemp = [];
    containsLeaf = false;

    for (var i = 0; i < allNodes.length; i++) {
      node = allNodes[i];
      if (node.getEdges().length == 1 && !node.getEdges()[0].isInterGraph && node.getChild() == null) {
        prunedNodesInStepTemp.push([node, node.getEdges()[0], node.getOwner()]);
        containsLeaf = true;
      }
    }
    if (containsLeaf == true) {
      var prunedNodesInStep = [];
      for (var j = 0; j < prunedNodesInStepTemp.length; j++) {
        if (prunedNodesInStepTemp[j][0].getEdges().length == 1) {
          prunedNodesInStep.push(prunedNodesInStepTemp[j]);
          prunedNodesInStepTemp[j][0].getOwner().remove(prunedNodesInStepTemp[j][0]);
        }
      }
      prunedNodesAll.push(prunedNodesInStep);
      this.graphManager.resetAllNodes();
      this.graphManager.resetAllEdges();
    }
  }
  this.prunedNodesAll = prunedNodesAll;
};

// Grow tree one step 
FDLayout.prototype.growTree = function (prunedNodesAll, isFirstGrowth) {
  var lengthOfPrunedNodesInStep = prunedNodesAll.length;
  var prunedNodesInStep = prunedNodesAll[lengthOfPrunedNodesInStep - 1];

  var nodeData;
  for (var i = 0; i < prunedNodesInStep.length; i++) {
    nodeData = prunedNodesInStep[i];

    this.findPlaceforPrunedNode(nodeData);

    nodeData[2].add(nodeData[0]);
    nodeData[2].add(nodeData[1], nodeData[1].source, nodeData[1].target);
  }

  prunedNodesAll.splice(prunedNodesAll.length - 1, 1);
  this.graphManager.resetAllNodes();
  this.graphManager.resetAllEdges();
};

// Find an appropriate position to replace pruned node, this method can be improved
FDLayout.prototype.findPlaceforPrunedNode = function (nodeData) {

  var gridForPrunedNode;
  var nodeToConnect;
  var prunedNode = nodeData[0];
  if (prunedNode == nodeData[1].source) {
    nodeToConnect = nodeData[1].target;
  } else {
    nodeToConnect = nodeData[1].source;
  }
  var startGridX = nodeToConnect.startX;
  var finishGridX = nodeToConnect.finishX;
  var startGridY = nodeToConnect.startY;
  var finishGridY = nodeToConnect.finishY;

  var upNodeCount = 0;
  var downNodeCount = 0;
  var rightNodeCount = 0;
  var leftNodeCount = 0;
  var controlRegions = [upNodeCount, rightNodeCount, downNodeCount, leftNodeCount];

  if (startGridY > 0) {
    for (var i = startGridX; i <= finishGridX; i++) {
      controlRegions[0] += this.grid[i][startGridY - 1].length + this.grid[i][startGridY].length - 1;
    }
  }
  if (finishGridX < this.grid.length - 1) {
    for (var i = startGridY; i <= finishGridY; i++) {
      controlRegions[1] += this.grid[finishGridX + 1][i].length + this.grid[finishGridX][i].length - 1;
    }
  }
  if (finishGridY < this.grid[0].length - 1) {
    for (var i = startGridX; i <= finishGridX; i++) {
      controlRegions[2] += this.grid[i][finishGridY + 1].length + this.grid[i][finishGridY].length - 1;
    }
  }
  if (startGridX > 0) {
    for (var i = startGridY; i <= finishGridY; i++) {
      controlRegions[3] += this.grid[startGridX - 1][i].length + this.grid[startGridX][i].length - 1;
    }
  }
  var min = Integer.MAX_VALUE;
  var minCount;
  var minIndex;
  for (var j = 0; j < controlRegions.length; j++) {
    if (controlRegions[j] < min) {
      min = controlRegions[j];
      minCount = 1;
      minIndex = j;
    } else if (controlRegions[j] == min) {
      minCount++;
    }
  }

  if (minCount == 3 && min == 0) {
    if (controlRegions[0] == 0 && controlRegions[1] == 0 && controlRegions[2] == 0) {
      gridForPrunedNode = 1;
    } else if (controlRegions[0] == 0 && controlRegions[1] == 0 && controlRegions[3] == 0) {
      gridForPrunedNode = 0;
    } else if (controlRegions[0] == 0 && controlRegions[2] == 0 && controlRegions[3] == 0) {
      gridForPrunedNode = 3;
    } else if (controlRegions[1] == 0 && controlRegions[2] == 0 && controlRegions[3] == 0) {
      gridForPrunedNode = 2;
    }
  } else if (minCount == 2 && min == 0) {
    var random = Math.floor(Math.random() * 2);
    if (controlRegions[0] == 0 && controlRegions[1] == 0) {
      ;
      if (random == 0) {
        gridForPrunedNode = 0;
      } else {
        gridForPrunedNode = 1;
      }
    } else if (controlRegions[0] == 0 && controlRegions[2] == 0) {
      if (random == 0) {
        gridForPrunedNode = 0;
      } else {
        gridForPrunedNode = 2;
      }
    } else if (controlRegions[0] == 0 && controlRegions[3] == 0) {
      if (random == 0) {
        gridForPrunedNode = 0;
      } else {
        gridForPrunedNode = 3;
      }
    } else if (controlRegions[1] == 0 && controlRegions[2] == 0) {
      if (random == 0) {
        gridForPrunedNode = 1;
      } else {
        gridForPrunedNode = 2;
      }
    } else if (controlRegions[1] == 0 && controlRegions[3] == 0) {
      if (random == 0) {
        gridForPrunedNode = 1;
      } else {
        gridForPrunedNode = 3;
      }
    } else {
      if (random == 0) {
        gridForPrunedNode = 2;
      } else {
        gridForPrunedNode = 3;
      }
    }
  } else if (minCount == 4 && min == 0) {
    var random = Math.floor(Math.random() * 4);
    gridForPrunedNode = random;
  } else {
    gridForPrunedNode = minIndex;
  }

  if (gridForPrunedNode == 0) {
    prunedNode.setCenter(nodeToConnect.getCenterX(), nodeToConnect.getCenterY() - nodeToConnect.getHeight() / 2 - FDLayoutConstants.DEFAULT_EDGE_LENGTH - prunedNode.getHeight() / 2);
  } else if (gridForPrunedNode == 1) {
    prunedNode.setCenter(nodeToConnect.getCenterX() + nodeToConnect.getWidth() / 2 + FDLayoutConstants.DEFAULT_EDGE_LENGTH + prunedNode.getWidth() / 2, nodeToConnect.getCenterY());
  } else if (gridForPrunedNode == 2) {
    prunedNode.setCenter(nodeToConnect.getCenterX(), nodeToConnect.getCenterY() + nodeToConnect.getHeight() / 2 + FDLayoutConstants.DEFAULT_EDGE_LENGTH + prunedNode.getHeight() / 2);
  } else {
    prunedNode.setCenter(nodeToConnect.getCenterX() - nodeToConnect.getWidth() / 2 - FDLayoutConstants.DEFAULT_EDGE_LENGTH - prunedNode.getWidth() / 2, nodeToConnect.getCenterY());
  }
};

module.exports = FDLayout;

},{"./FDLayoutConstants":13,"./IGeometry":18,"./IMath":19,"./Integer":20,"./Layout":26,"./LayoutConstants":27}],13:[function(require,module,exports){
'use strict';

var LayoutConstants = require('./LayoutConstants');

function FDLayoutConstants() {}

//FDLayoutConstants inherits static props in LayoutConstants
for (var prop in LayoutConstants) {
  FDLayoutConstants[prop] = LayoutConstants[prop];
}

FDLayoutConstants.MAX_ITERATIONS = 2500;

FDLayoutConstants.DEFAULT_EDGE_LENGTH = 50;
FDLayoutConstants.DEFAULT_SPRING_STRENGTH = 0.45;
FDLayoutConstants.DEFAULT_REPULSION_STRENGTH = 4500.0;
FDLayoutConstants.DEFAULT_GRAVITY_STRENGTH = 0.4;
FDLayoutConstants.DEFAULT_COMPOUND_GRAVITY_STRENGTH = 1.0;
FDLayoutConstants.DEFAULT_GRAVITY_RANGE_FACTOR = 3.8;
FDLayoutConstants.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = 1.5;
FDLayoutConstants.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION = true;
FDLayoutConstants.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION = true;
FDLayoutConstants.DEFAULT_COOLING_FACTOR_INCREMENTAL = 0.5;
FDLayoutConstants.MAX_NODE_DISPLACEMENT_INCREMENTAL = 100.0;
FDLayoutConstants.MAX_NODE_DISPLACEMENT = FDLayoutConstants.MAX_NODE_DISPLACEMENT_INCREMENTAL * 3;
FDLayoutConstants.MIN_REPULSION_DIST = FDLayoutConstants.DEFAULT_EDGE_LENGTH / 10.0;
FDLayoutConstants.CONVERGENCE_CHECK_PERIOD = 100;
FDLayoutConstants.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = 0.1;
FDLayoutConstants.MIN_EDGE_LENGTH = 1;
FDLayoutConstants.GRID_CALCULATION_CHECK_PERIOD = 10;

module.exports = FDLayoutConstants;

},{"./LayoutConstants":27}],14:[function(require,module,exports){
'use strict';

var LEdge = require('./LEdge');
var FDLayoutConstants = require('./FDLayoutConstants');

function FDLayoutEdge(source, target, vEdge) {
  LEdge.call(this, source, target, vEdge);
  this.idealLength = FDLayoutConstants.DEFAULT_EDGE_LENGTH;
}

FDLayoutEdge.prototype = Object.create(LEdge.prototype);

for (var prop in LEdge) {
  FDLayoutEdge[prop] = LEdge[prop];
}

module.exports = FDLayoutEdge;

},{"./FDLayoutConstants":13,"./LEdge":21}],15:[function(require,module,exports){
'use strict';

var LNode = require('./LNode');

function FDLayoutNode(gm, loc, size, vNode) {
  // alternative constructor is handled inside LNode
  LNode.call(this, gm, loc, size, vNode);
  //Spring, repulsion and gravitational forces acting on this node
  this.springForceX = 0;
  this.springForceY = 0;
  this.repulsionForceX = 0;
  this.repulsionForceY = 0;
  this.gravitationForceX = 0;
  this.gravitationForceY = 0;
  //Amount by which this node is to be moved in this iteration
  this.displacementX = 0;
  this.displacementY = 0;

  //Start and finish grid coordinates that this node is fallen into
  this.startX = 0;
  this.finishX = 0;
  this.startY = 0;
  this.finishY = 0;

  //Geometric neighbors of this node
  this.surrounding = [];
}

FDLayoutNode.prototype = Object.create(LNode.prototype);

for (var prop in LNode) {
  FDLayoutNode[prop] = LNode[prop];
}

FDLayoutNode.prototype.setGridCoordinates = function (_startX, _finishX, _startY, _finishY) {
  this.startX = _startX;
  this.finishX = _finishX;
  this.startY = _startY;
  this.finishY = _finishY;
};

module.exports = FDLayoutNode;

},{"./LNode":25}],16:[function(require,module,exports){
'use strict';

var UniqueIDGeneretor = require('./UniqueIDGeneretor');

function HashMap() {
  this.map = {};
  this.keys = [];
}

HashMap.prototype.put = function (key, value) {
  var theId = UniqueIDGeneretor.createID(key);
  if (!this.contains(theId)) {
    this.map[theId] = value;
    this.keys.push(key);
  }
};

HashMap.prototype.contains = function (key) {
  var theId = UniqueIDGeneretor.createID(key);
  return this.map[key] != null;
};

HashMap.prototype.get = function (key) {
  var theId = UniqueIDGeneretor.createID(key);
  return this.map[theId];
};

HashMap.prototype.keySet = function () {
  return this.keys;
};

module.exports = HashMap;

},{"./UniqueIDGeneretor":33}],17:[function(require,module,exports){
'use strict';

var UniqueIDGeneretor = require('./UniqueIDGeneretor');

function HashSet() {
  this.set = {};
}
;

HashSet.prototype.add = function (obj) {
  var theId = UniqueIDGeneretor.createID(obj);
  if (!this.contains(theId)) this.set[theId] = obj;
};

HashSet.prototype.remove = function (obj) {
  delete this.set[UniqueIDGeneretor.createID(obj)];
};

HashSet.prototype.clear = function () {
  this.set = {};
};

HashSet.prototype.contains = function (obj) {
  return this.set[UniqueIDGeneretor.createID(obj)] == obj;
};

HashSet.prototype.isEmpty = function () {
  return this.size() === 0;
};

HashSet.prototype.size = function () {
  return Object.keys(this.set).length;
};

//concats this.set to the given list
HashSet.prototype.addAllTo = function (list) {
  var keys = Object.keys(this.set);
  var length = keys.length;
  for (var i = 0; i < length; i++) {
    list.push(this.set[keys[i]]);
  }
};

HashSet.prototype.size = function () {
  return Object.keys(this.set).length;
};

HashSet.prototype.addAll = function (list) {
  var s = list.length;
  for (var i = 0; i < s; i++) {
    var v = list[i];
    this.add(v);
  }
};

module.exports = HashSet;

},{"./UniqueIDGeneretor":33}],18:[function(require,module,exports){
"use strict";

function IGeometry() {}

IGeometry.calcSeparationAmount = function (rectA, rectB, overlapAmount, separationBuffer) {
  if (!rectA.intersects(rectB)) {
    throw "assert failed";
  }
  var directions = new Array(2);
  IGeometry.decideDirectionsForOverlappingNodes(rectA, rectB, directions);
  overlapAmount[0] = Math.min(rectA.getRight(), rectB.getRight()) - Math.max(rectA.x, rectB.x);
  overlapAmount[1] = Math.min(rectA.getBottom(), rectB.getBottom()) - Math.max(rectA.y, rectB.y);
  // update the overlapping amounts for the following cases:
  if (rectA.getX() <= rectB.getX() && rectA.getRight() >= rectB.getRight()) {
    overlapAmount[0] += Math.min(rectB.getX() - rectA.getX(), rectA.getRight() - rectB.getRight());
  } else if (rectB.getX() <= rectA.getX() && rectB.getRight() >= rectA.getRight()) {
    overlapAmount[0] += Math.min(rectA.getX() - rectB.getX(), rectB.getRight() - rectA.getRight());
  }
  if (rectA.getY() <= rectB.getY() && rectA.getBottom() >= rectB.getBottom()) {
    overlapAmount[1] += Math.min(rectB.getY() - rectA.getY(), rectA.getBottom() - rectB.getBottom());
  } else if (rectB.getY() <= rectA.getY() && rectB.getBottom() >= rectA.getBottom()) {
    overlapAmount[1] += Math.min(rectA.getY() - rectB.getY(), rectB.getBottom() - rectA.getBottom());
  }

  // find slope of the line passes two centers
  var slope = Math.abs((rectB.getCenterY() - rectA.getCenterY()) / (rectB.getCenterX() - rectA.getCenterX()));
  // if centers are overlapped
  if (rectB.getCenterY() == rectA.getCenterY() && rectB.getCenterX() == rectA.getCenterX()) {
    // assume the slope is 1 (45 degree)
    slope = 1.0;
  }

  var moveByY = slope * overlapAmount[0];
  var moveByX = overlapAmount[1] / slope;
  if (overlapAmount[0] < moveByX) {
    moveByX = overlapAmount[0];
  } else {
    moveByY = overlapAmount[1];
  }
  // return half the amount so that if each rectangle is moved by these
  // amounts in opposite directions, overlap will be resolved
  overlapAmount[0] = -1 * directions[0] * (moveByX / 2 + separationBuffer);
  overlapAmount[1] = -1 * directions[1] * (moveByY / 2 + separationBuffer);
};

IGeometry.decideDirectionsForOverlappingNodes = function (rectA, rectB, directions) {
  if (rectA.getCenterX() < rectB.getCenterX()) {
    directions[0] = -1;
  } else {
    directions[0] = 1;
  }

  if (rectA.getCenterY() < rectB.getCenterY()) {
    directions[1] = -1;
  } else {
    directions[1] = 1;
  }
};

IGeometry.getIntersection2 = function (rectA, rectB, result) {
  //result[0-1] will contain clipPoint of rectA, result[2-3] will contain clipPoint of rectB
  var p1x = rectA.getCenterX();
  var p1y = rectA.getCenterY();
  var p2x = rectB.getCenterX();
  var p2y = rectB.getCenterY();

  //if two rectangles intersect, then clipping points are centers
  if (rectA.intersects(rectB)) {
    result[0] = p1x;
    result[1] = p1y;
    result[2] = p2x;
    result[3] = p2y;
    return true;
  }
  //variables for rectA
  var topLeftAx = rectA.getX();
  var topLeftAy = rectA.getY();
  var topRightAx = rectA.getRight();
  var bottomLeftAx = rectA.getX();
  var bottomLeftAy = rectA.getBottom();
  var bottomRightAx = rectA.getRight();
  var halfWidthA = rectA.getWidthHalf();
  var halfHeightA = rectA.getHeightHalf();
  //variables for rectB
  var topLeftBx = rectB.getX();
  var topLeftBy = rectB.getY();
  var topRightBx = rectB.getRight();
  var bottomLeftBx = rectB.getX();
  var bottomLeftBy = rectB.getBottom();
  var bottomRightBx = rectB.getRight();
  var halfWidthB = rectB.getWidthHalf();
  var halfHeightB = rectB.getHeightHalf();
  //flag whether clipping points are found
  var clipPointAFound = false;
  var clipPointBFound = false;

  // line is vertical
  if (p1x == p2x) {
    if (p1y > p2y) {
      result[0] = p1x;
      result[1] = topLeftAy;
      result[2] = p2x;
      result[3] = bottomLeftBy;
      return false;
    } else if (p1y < p2y) {
      result[0] = p1x;
      result[1] = bottomLeftAy;
      result[2] = p2x;
      result[3] = topLeftBy;
      return false;
    } else {
      //not line, return null;
    }
  }
  // line is horizontal
  else if (p1y == p2y) {
      if (p1x > p2x) {
        result[0] = topLeftAx;
        result[1] = p1y;
        result[2] = topRightBx;
        result[3] = p2y;
        return false;
      } else if (p1x < p2x) {
        result[0] = topRightAx;
        result[1] = p1y;
        result[2] = topLeftBx;
        result[3] = p2y;
        return false;
      } else {
        //not valid line, return null;
      }
    } else {
      //slopes of rectA's and rectB's diagonals
      var slopeA = rectA.height / rectA.width;
      var slopeB = rectB.height / rectB.width;

      //slope of line between center of rectA and center of rectB
      var slopePrime = (p2y - p1y) / (p2x - p1x);
      var cardinalDirectionA;
      var cardinalDirectionB;
      var tempPointAx;
      var tempPointAy;
      var tempPointBx;
      var tempPointBy;

      //determine whether clipping point is the corner of nodeA
      if (-slopeA == slopePrime) {
        if (p1x > p2x) {
          result[0] = bottomLeftAx;
          result[1] = bottomLeftAy;
          clipPointAFound = true;
        } else {
          result[0] = topRightAx;
          result[1] = topLeftAy;
          clipPointAFound = true;
        }
      } else if (slopeA == slopePrime) {
        if (p1x > p2x) {
          result[0] = topLeftAx;
          result[1] = topLeftAy;
          clipPointAFound = true;
        } else {
          result[0] = bottomRightAx;
          result[1] = bottomLeftAy;
          clipPointAFound = true;
        }
      }

      //determine whether clipping point is the corner of nodeB
      if (-slopeB == slopePrime) {
        if (p2x > p1x) {
          result[2] = bottomLeftBx;
          result[3] = bottomLeftBy;
          clipPointBFound = true;
        } else {
          result[2] = topRightBx;
          result[3] = topLeftBy;
          clipPointBFound = true;
        }
      } else if (slopeB == slopePrime) {
        if (p2x > p1x) {
          result[2] = topLeftBx;
          result[3] = topLeftBy;
          clipPointBFound = true;
        } else {
          result[2] = bottomRightBx;
          result[3] = bottomLeftBy;
          clipPointBFound = true;
        }
      }

      //if both clipping points are corners
      if (clipPointAFound && clipPointBFound) {
        return false;
      }

      //determine Cardinal Direction of rectangles
      if (p1x > p2x) {
        if (p1y > p2y) {
          cardinalDirectionA = IGeometry.getCardinalDirection(slopeA, slopePrime, 4);
          cardinalDirectionB = IGeometry.getCardinalDirection(slopeB, slopePrime, 2);
        } else {
          cardinalDirectionA = IGeometry.getCardinalDirection(-slopeA, slopePrime, 3);
          cardinalDirectionB = IGeometry.getCardinalDirection(-slopeB, slopePrime, 1);
        }
      } else {
        if (p1y > p2y) {
          cardinalDirectionA = IGeometry.getCardinalDirection(-slopeA, slopePrime, 1);
          cardinalDirectionB = IGeometry.getCardinalDirection(-slopeB, slopePrime, 3);
        } else {
          cardinalDirectionA = IGeometry.getCardinalDirection(slopeA, slopePrime, 2);
          cardinalDirectionB = IGeometry.getCardinalDirection(slopeB, slopePrime, 4);
        }
      }
      //calculate clipping Point if it is not found before
      if (!clipPointAFound) {
        switch (cardinalDirectionA) {
          case 1:
            tempPointAy = topLeftAy;
            tempPointAx = p1x + -halfHeightA / slopePrime;
            result[0] = tempPointAx;
            result[1] = tempPointAy;
            break;
          case 2:
            tempPointAx = bottomRightAx;
            tempPointAy = p1y + halfWidthA * slopePrime;
            result[0] = tempPointAx;
            result[1] = tempPointAy;
            break;
          case 3:
            tempPointAy = bottomLeftAy;
            tempPointAx = p1x + halfHeightA / slopePrime;
            result[0] = tempPointAx;
            result[1] = tempPointAy;
            break;
          case 4:
            tempPointAx = bottomLeftAx;
            tempPointAy = p1y + -halfWidthA * slopePrime;
            result[0] = tempPointAx;
            result[1] = tempPointAy;
            break;
        }
      }
      if (!clipPointBFound) {
        switch (cardinalDirectionB) {
          case 1:
            tempPointBy = topLeftBy;
            tempPointBx = p2x + -halfHeightB / slopePrime;
            result[2] = tempPointBx;
            result[3] = tempPointBy;
            break;
          case 2:
            tempPointBx = bottomRightBx;
            tempPointBy = p2y + halfWidthB * slopePrime;
            result[2] = tempPointBx;
            result[3] = tempPointBy;
            break;
          case 3:
            tempPointBy = bottomLeftBy;
            tempPointBx = p2x + halfHeightB / slopePrime;
            result[2] = tempPointBx;
            result[3] = tempPointBy;
            break;
          case 4:
            tempPointBx = bottomLeftBx;
            tempPointBy = p2y + -halfWidthB * slopePrime;
            result[2] = tempPointBx;
            result[3] = tempPointBy;
            break;
        }
      }
    }
  return false;
};

IGeometry.getCardinalDirection = function (slope, slopePrime, line) {
  if (slope > slopePrime) {
    return line;
  } else {
    return 1 + line % 4;
  }
};

IGeometry.getIntersection = function (s1, s2, f1, f2) {
  if (f2 == null) {
    return IGeometry.getIntersection2(s1, s2, f1);
  }
  var x1 = s1.x;
  var y1 = s1.y;
  var x2 = s2.x;
  var y2 = s2.y;
  var x3 = f1.x;
  var y3 = f1.y;
  var x4 = f2.x;
  var y4 = f2.y;
  var x, y; // intersection point
  var a1, a2, b1, b2, c1, c2; // coefficients of line eqns.
  var denom;

  a1 = y2 - y1;
  b1 = x1 - x2;
  c1 = x2 * y1 - x1 * y2; // { a1*x + b1*y + c1 = 0 is line 1 }

  a2 = y4 - y3;
  b2 = x3 - x4;
  c2 = x4 * y3 - x3 * y4; // { a2*x + b2*y + c2 = 0 is line 2 }

  denom = a1 * b2 - a2 * b1;

  if (denom == 0) {
    return null;
  }

  x = (b1 * c2 - b2 * c1) / denom;
  y = (a2 * c1 - a1 * c2) / denom;

  return new Point(x, y);
};

// -----------------------------------------------------------------------------
// Section: Class Constants
// -----------------------------------------------------------------------------
/**
 * Some useful pre-calculated constants
 */
IGeometry.HALF_PI = 0.5 * Math.PI;
IGeometry.ONE_AND_HALF_PI = 1.5 * Math.PI;
IGeometry.TWO_PI = 2.0 * Math.PI;
IGeometry.THREE_PI = 3.0 * Math.PI;

module.exports = IGeometry;

},{}],19:[function(require,module,exports){
"use strict";

function IMath() {}

/**
 * This method returns the sign of the input value.
 */
IMath.sign = function (value) {
  if (value > 0) {
    return 1;
  } else if (value < 0) {
    return -1;
  } else {
    return 0;
  }
};

IMath.floor = function (value) {
  return value < 0 ? Math.ceil(value) : Math.floor(value);
};

IMath.ceil = function (value) {
  return value < 0 ? Math.floor(value) : Math.ceil(value);
};

module.exports = IMath;

},{}],20:[function(require,module,exports){
"use strict";

function Integer() {}

Integer.MAX_VALUE = 2147483647;
Integer.MIN_VALUE = -2147483648;

module.exports = Integer;

},{}],21:[function(require,module,exports){
'use strict';

var LGraphObject = require('./LGraphObject');
var IGeometry = require('./IGeometry');
var IMath = require('./IMath');

function LEdge(source, target, vEdge) {
  LGraphObject.call(this, vEdge);

  this.isOverlapingSourceAndTarget = false;
  this.vGraphObject = vEdge;
  this.bendpoints = [];
  this.source = source;
  this.target = target;
}

LEdge.prototype = Object.create(LGraphObject.prototype);

for (var prop in LGraphObject) {
  LEdge[prop] = LGraphObject[prop];
}

LEdge.prototype.getSource = function () {
  return this.source;
};

LEdge.prototype.getTarget = function () {
  return this.target;
};

LEdge.prototype.isInterGraph = function () {
  return this.isInterGraph;
};

LEdge.prototype.getLength = function () {
  return this.length;
};

LEdge.prototype.isOverlapingSourceAndTarget = function () {
  return this.isOverlapingSourceAndTarget;
};

LEdge.prototype.getBendpoints = function () {
  return this.bendpoints;
};

LEdge.prototype.getLca = function () {
  return this.lca;
};

LEdge.prototype.getSourceInLca = function () {
  return this.sourceInLca;
};

LEdge.prototype.getTargetInLca = function () {
  return this.targetInLca;
};

LEdge.prototype.getOtherEnd = function (node) {
  if (this.source === node) {
    return this.target;
  } else if (this.target === node) {
    return this.source;
  } else {
    throw "Node is not incident with this edge";
  }
};

LEdge.prototype.getOtherEndInGraph = function (node, graph) {
  var otherEnd = this.getOtherEnd(node);
  var root = graph.getGraphManager().getRoot();

  while (true) {
    if (otherEnd.getOwner() == graph) {
      return otherEnd;
    }

    if (otherEnd.getOwner() == root) {
      break;
    }

    otherEnd = otherEnd.getOwner().getParent();
  }

  return null;
};

LEdge.prototype.updateLength = function () {
  var clipPointCoordinates = new Array(4);

  this.isOverlapingSourceAndTarget = IGeometry.getIntersection(this.target.getRect(), this.source.getRect(), clipPointCoordinates);

  if (!this.isOverlapingSourceAndTarget) {
    this.lengthX = clipPointCoordinates[0] - clipPointCoordinates[2];
    this.lengthY = clipPointCoordinates[1] - clipPointCoordinates[3];

    if (Math.abs(this.lengthX) < 1.0) {
      this.lengthX = IMath.sign(this.lengthX);
    }

    if (Math.abs(this.lengthY) < 1.0) {
      this.lengthY = IMath.sign(this.lengthY);
    }

    this.length = Math.sqrt(this.lengthX * this.lengthX + this.lengthY * this.lengthY);
  }
};

LEdge.prototype.updateLengthSimple = function () {
  this.lengthX = this.target.getCenterX() - this.source.getCenterX();
  this.lengthY = this.target.getCenterY() - this.source.getCenterY();

  if (Math.abs(this.lengthX) < 1.0) {
    this.lengthX = IMath.sign(this.lengthX);
  }

  if (Math.abs(this.lengthY) < 1.0) {
    this.lengthY = IMath.sign(this.lengthY);
  }

  this.length = Math.sqrt(this.lengthX * this.lengthX + this.lengthY * this.lengthY);
};

module.exports = LEdge;

},{"./IGeometry":18,"./IMath":19,"./LGraphObject":24}],22:[function(require,module,exports){
'use strict';

var LGraphObject = require('./LGraphObject');
var Integer = require('./Integer');
var LayoutConstants = require('./LayoutConstants');
var LGraphManager = require('./LGraphManager');
var LNode = require('./LNode');
var LEdge = require('./LEdge');
var HashSet = require('./HashSet');
var RectangleD = require('./RectangleD');
var Point = require('./Point');
var List = require('linkedlist-js').List;

function LGraph(parent, obj2, vGraph) {
  LGraphObject.call(this, vGraph);
  this.estimatedSize = Integer.MIN_VALUE;
  this.margin = LayoutConstants.DEFAULT_GRAPH_MARGIN;
  this.edges = [];
  this.nodes = [];
  this.isConnected = false;
  this.parent = parent;

  if (obj2 != null && obj2 instanceof LGraphManager) {
    this.graphManager = obj2;
  } else if (obj2 != null && obj2 instanceof Layout) {
    this.graphManager = obj2.graphManager;
  }
}

LGraph.prototype = Object.create(LGraphObject.prototype);
for (var prop in LGraphObject) {
  LGraph[prop] = LGraphObject[prop];
}

LGraph.prototype.getNodes = function () {
  return this.nodes;
};

LGraph.prototype.getEdges = function () {
  return this.edges;
};

LGraph.prototype.getGraphManager = function () {
  return this.graphManager;
};

LGraph.prototype.getParent = function () {
  return this.parent;
};

LGraph.prototype.getLeft = function () {
  return this.left;
};

LGraph.prototype.getRight = function () {
  return this.right;
};

LGraph.prototype.getTop = function () {
  return this.top;
};

LGraph.prototype.getBottom = function () {
  return this.bottom;
};

LGraph.prototype.isConnected = function () {
  return this.isConnected;
};

LGraph.prototype.add = function (obj1, sourceNode, targetNode) {
  if (sourceNode == null && targetNode == null) {
    var newNode = obj1;
    if (this.graphManager == null) {
      throw "Graph has no graph mgr!";
    }
    if (this.getNodes().indexOf(newNode) > -1) {
      throw "Node already in graph!";
    }
    newNode.owner = this;
    this.getNodes().push(newNode);

    return newNode;
  } else {
    var newEdge = obj1;
    if (!(this.getNodes().indexOf(sourceNode) > -1 && this.getNodes().indexOf(targetNode) > -1)) {
      throw "Source or target not in graph!";
    }

    if (!(sourceNode.owner == targetNode.owner && sourceNode.owner == this)) {
      throw "Both owners must be this graph!";
    }

    if (sourceNode.owner != targetNode.owner) {
      return null;
    }

    // set source and target
    newEdge.source = sourceNode;
    newEdge.target = targetNode;

    // set as intra-graph edge
    newEdge.isInterGraph = false;

    // add to graph edge list
    this.getEdges().push(newEdge);

    // add to incidency lists
    sourceNode.edges.push(newEdge);

    if (targetNode != sourceNode) {
      targetNode.edges.push(newEdge);
    }

    return newEdge;
  }
};

LGraph.prototype.remove = function (obj) {
  var node = obj;
  if (obj instanceof LNode) {
    if (node == null) {
      throw "Node is null!";
    }
    if (!(node.owner != null && node.owner == this)) {
      throw "Owner graph is invalid!";
    }
    if (this.graphManager == null) {
      throw "Owner graph manager is invalid!";
    }
    // remove incident edges first (make a copy to do it safely)
    var edgesToBeRemoved = node.edges.slice();
    var edge;
    var s = edgesToBeRemoved.length;
    for (var i = 0; i < s; i++) {
      edge = edgesToBeRemoved[i];

      if (edge.isInterGraph) {
        this.graphManager.remove(edge);
      } else {
        edge.source.owner.remove(edge);
      }
    }

    // now the node itself
    var index = this.nodes.indexOf(node);
    if (index == -1) {
      throw "Node not in owner node list!";
    }

    this.nodes.splice(index, 1);
  } else if (obj instanceof LEdge) {
    var edge = obj;
    if (edge == null) {
      throw "Edge is null!";
    }
    if (!(edge.source != null && edge.target != null)) {
      throw "Source and/or target is null!";
    }
    if (!(edge.source.owner != null && edge.target.owner != null && edge.source.owner == this && edge.target.owner == this)) {
      throw "Source and/or target owner is invalid!";
    }

    var sourceIndex = edge.source.edges.indexOf(edge);
    var targetIndex = edge.target.edges.indexOf(edge);
    if (!(sourceIndex > -1 && targetIndex > -1)) {
      throw "Source and/or target doesn't know this edge!";
    }

    edge.source.edges.splice(sourceIndex, 1);

    if (edge.target != edge.source) {
      edge.target.edges.splice(targetIndex, 1);
    }

    var index = edge.source.owner.getEdges().indexOf(edge);
    if (index == -1) {
      throw "Not in owner's edge list!";
    }

    edge.source.owner.getEdges().splice(index, 1);
  }
};

LGraph.prototype.updateLeftTop = function () {
  var top = Integer.MAX_VALUE;
  var left = Integer.MAX_VALUE;
  var nodeTop;
  var nodeLeft;
  var margin;

  var nodes = this.getNodes();
  var s = nodes.length;

  for (var i = 0; i < s; i++) {
    var lNode = nodes[i];
    nodeTop = lNode.getTop();
    nodeLeft = lNode.getLeft();

    if (top > nodeTop) {
      top = nodeTop;
    }

    if (left > nodeLeft) {
      left = nodeLeft;
    }
  }

  // Do we have any nodes in this graph?
  if (top == Integer.MAX_VALUE) {
    return null;
  }

  if (nodes[0].getParent().paddingLeft != undefined) {
    margin = nodes[0].getParent().paddingLeft;
  } else {
    margin = this.margin;
  }

  this.left = left - margin;
  this.top = top - margin;

  // Apply the margins and return the result
  return new Point(this.left, this.top);
};

LGraph.prototype.updateBounds = function (recursive) {
  // calculate bounds
  var left = Integer.MAX_VALUE;
  var right = -Integer.MAX_VALUE;
  var top = Integer.MAX_VALUE;
  var bottom = -Integer.MAX_VALUE;
  var nodeLeft;
  var nodeRight;
  var nodeTop;
  var nodeBottom;
  var margin;

  var nodes = this.nodes;
  var s = nodes.length;
  for (var i = 0; i < s; i++) {
    var lNode = nodes[i];

    if (recursive && lNode.child != null) {
      lNode.updateBounds();
    }
    nodeLeft = lNode.getLeft();
    nodeRight = lNode.getRight();
    nodeTop = lNode.getTop();
    nodeBottom = lNode.getBottom();

    if (left > nodeLeft) {
      left = nodeLeft;
    }

    if (right < nodeRight) {
      right = nodeRight;
    }

    if (top > nodeTop) {
      top = nodeTop;
    }

    if (bottom < nodeBottom) {
      bottom = nodeBottom;
    }
  }

  var boundingRect = new RectangleD(left, top, right - left, bottom - top);
  if (left == Integer.MAX_VALUE) {
    this.left = this.parent.getLeft();
    this.right = this.parent.getRight();
    this.top = this.parent.getTop();
    this.bottom = this.parent.getBottom();
  }

  if (nodes[0].getParent().paddingLeft != undefined) {
    margin = nodes[0].getParent().paddingLeft;
  } else {
    margin = this.margin;
  }

  this.left = boundingRect.x - margin;
  this.right = boundingRect.x + boundingRect.width + margin;
  this.top = boundingRect.y - margin;
  this.bottom = boundingRect.y + boundingRect.height + margin;
};

LGraph.calculateBounds = function (nodes) {
  var left = Integer.MAX_VALUE;
  var right = -Integer.MAX_VALUE;
  var top = Integer.MAX_VALUE;
  var bottom = -Integer.MAX_VALUE;
  var nodeLeft;
  var nodeRight;
  var nodeTop;
  var nodeBottom;

  var s = nodes.length;

  for (var i = 0; i < s; i++) {
    var lNode = nodes[i];
    nodeLeft = lNode.getLeft();
    nodeRight = lNode.getRight();
    nodeTop = lNode.getTop();
    nodeBottom = lNode.getBottom();

    if (left > nodeLeft) {
      left = nodeLeft;
    }

    if (right < nodeRight) {
      right = nodeRight;
    }

    if (top > nodeTop) {
      top = nodeTop;
    }

    if (bottom < nodeBottom) {
      bottom = nodeBottom;
    }
  }

  var boundingRect = new RectangleD(left, top, right - left, bottom - top);

  return boundingRect;
};

LGraph.prototype.getInclusionTreeDepth = function () {
  if (this == this.graphManager.getRoot()) {
    return 1;
  } else {
    return this.parent.getInclusionTreeDepth();
  }
};

LGraph.prototype.getEstimatedSize = function () {
  if (this.estimatedSize == Integer.MIN_VALUE) {
    throw "assert failed";
  }
  return this.estimatedSize;
};

LGraph.prototype.calcEstimatedSize = function () {
  var size = 0;
  var nodes = this.nodes;
  var s = nodes.length;

  for (var i = 0; i < s; i++) {
    var lNode = nodes[i];
    size += lNode.calcEstimatedSize();
  }

  if (size == 0) {
    this.estimatedSize = LayoutConstants.EMPTY_COMPOUND_NODE_SIZE;
  } else {
    this.estimatedSize = size / Math.sqrt(this.nodes.length);
  }

  return this.estimatedSize;
};

LGraph.prototype.updateConnected = function () {
  var self = this;
  if (this.nodes.length == 0) {
    this.isConnected = true;
    return;
  }

  var toBeVisited = new List();
  var visited = new HashSet();
  var currentNode = this.nodes[0];
  var neighborEdges;
  var currentNeighbor;
  var childrenOfNode = currentNode.withChildren();
  childrenOfNode.forEach(function (node) {
    toBeVisited.push(node);
  });

  while (!toBeVisited.isEmpty()) {
    currentNode = toBeVisited.shift().value();
    visited.add(currentNode);

    // Traverse all neighbors of this node
    neighborEdges = currentNode.getEdges();
    var s = neighborEdges.length;
    for (var i = 0; i < s; i++) {
      var neighborEdge = neighborEdges[i];
      currentNeighbor = neighborEdge.getOtherEndInGraph(currentNode, this);

      // Add unvisited neighbors to the list to visit
      if (currentNeighbor != null && !visited.contains(currentNeighbor)) {
        var childrenOfNeighbor = currentNeighbor.withChildren();

        childrenOfNeighbor.forEach(function (node) {
          toBeVisited.push(node);
        });
      }
    }
  }

  this.isConnected = false;

  if (visited.size() >= this.nodes.length) {
    var noOfVisitedInThisGraph = 0;

    var s = visited.size();
    Object.keys(visited.set).forEach(function (visitedId) {
      var visitedNode = visited.set[visitedId];
      if (visitedNode.owner == self) {
        noOfVisitedInThisGraph++;
      }
    });

    if (noOfVisitedInThisGraph == this.nodes.length) {
      this.isConnected = true;
    }
  }
};

module.exports = LGraph;

},{"./HashSet":17,"./Integer":20,"./LEdge":21,"./LGraphManager":23,"./LGraphObject":24,"./LNode":25,"./LayoutConstants":27,"./Point":28,"./RectangleD":31,"linkedlist-js":1}],23:[function(require,module,exports){
'use strict';

var LGraph;
var LEdge = require('./LEdge');

function LGraphManager(layout) {
  LGraph = require('./LGraph'); // It may be better to initilize this out of this function but it gives an error (Right-hand side of 'instanceof' is not callable) now.
  this.layout = layout;

  this.graphs = [];
  this.edges = [];
}

LGraphManager.prototype.addRoot = function () {
  var ngraph = this.layout.newGraph();
  var nnode = this.layout.newNode(null);
  var root = this.add(ngraph, nnode);
  this.setRootGraph(root);
  return this.rootGraph;
};

LGraphManager.prototype.add = function (newGraph, parentNode, newEdge, sourceNode, targetNode) {
  //there are just 2 parameters are passed then it adds an LGraph else it adds an LEdge
  if (newEdge == null && sourceNode == null && targetNode == null) {
    if (newGraph == null) {
      throw "Graph is null!";
    }
    if (parentNode == null) {
      throw "Parent node is null!";
    }
    if (this.graphs.indexOf(newGraph) > -1) {
      throw "Graph already in this graph mgr!";
    }

    this.graphs.push(newGraph);

    if (newGraph.parent != null) {
      throw "Already has a parent!";
    }
    if (parentNode.child != null) {
      throw "Already has a child!";
    }

    newGraph.parent = parentNode;
    parentNode.child = newGraph;

    return newGraph;
  } else {
    //change the order of the parameters
    targetNode = newEdge;
    sourceNode = parentNode;
    newEdge = newGraph;
    var sourceGraph = sourceNode.getOwner();
    var targetGraph = targetNode.getOwner();

    if (!(sourceGraph != null && sourceGraph.getGraphManager() == this)) {
      throw "Source not in this graph mgr!";
    }
    if (!(targetGraph != null && targetGraph.getGraphManager() == this)) {
      throw "Target not in this graph mgr!";
    }

    if (sourceGraph == targetGraph) {
      newEdge.isInterGraph = false;
      return sourceGraph.add(newEdge, sourceNode, targetNode);
    } else {
      newEdge.isInterGraph = true;

      // set source and target
      newEdge.source = sourceNode;
      newEdge.target = targetNode;

      // add edge to inter-graph edge list
      if (this.edges.indexOf(newEdge) > -1) {
        throw "Edge already in inter-graph edge list!";
      }

      this.edges.push(newEdge);

      // add edge to source and target incidency lists
      if (!(newEdge.source != null && newEdge.target != null)) {
        throw "Edge source and/or target is null!";
      }

      if (!(newEdge.source.edges.indexOf(newEdge) == -1 && newEdge.target.edges.indexOf(newEdge) == -1)) {
        throw "Edge already in source and/or target incidency list!";
      }

      newEdge.source.edges.push(newEdge);
      newEdge.target.edges.push(newEdge);

      return newEdge;
    }
  }
};

LGraphManager.prototype.remove = function (lObj) {
  if (lObj instanceof LGraph) {
    var graph = lObj;
    if (graph.getGraphManager() != this) {
      throw "Graph not in this graph mgr";
    }
    if (!(graph == this.rootGraph || graph.parent != null && graph.parent.graphManager == this)) {
      throw "Invalid parent node!";
    }

    // first the edges (make a copy to do it safely)
    var edgesToBeRemoved = [];

    edgesToBeRemoved = edgesToBeRemoved.concat(graph.getEdges());

    var edge;
    var s = edgesToBeRemoved.length;
    for (var i = 0; i < s; i++) {
      edge = edgesToBeRemoved[i];
      graph.remove(edge);
    }

    // then the nodes (make a copy to do it safely)
    var nodesToBeRemoved = [];

    nodesToBeRemoved = nodesToBeRemoved.concat(graph.getNodes());

    var node;
    s = nodesToBeRemoved.length;
    for (var i = 0; i < s; i++) {
      node = nodesToBeRemoved[i];
      graph.remove(node);
    }

    // check if graph is the root
    if (graph == this.rootGraph) {
      this.setRootGraph(null);
    }

    // now remove the graph itself
    var index = this.graphs.indexOf(graph);
    this.graphs.splice(index, 1);

    // also reset the parent of the graph
    graph.parent = null;
  } else if (lObj instanceof LEdge) {
    edge = lObj;
    if (edge == null) {
      throw "Edge is null!";
    }
    if (!edge.isInterGraph) {
      throw "Not an inter-graph edge!";
    }
    if (!(edge.source != null && edge.target != null)) {
      throw "Source and/or target is null!";
    }

    // remove edge from source and target nodes' incidency lists

    if (!(edge.source.edges.indexOf(edge) != -1 && edge.target.edges.indexOf(edge) != -1)) {
      throw "Source and/or target doesn't know this edge!";
    }

    var index = edge.source.edges.indexOf(edge);
    edge.source.edges.splice(index, 1);
    index = edge.target.edges.indexOf(edge);
    edge.target.edges.splice(index, 1);

    // remove edge from owner graph manager's inter-graph edge list

    if (!(edge.source.owner != null && edge.source.owner.getGraphManager() != null)) {
      throw "Edge owner graph or owner graph manager is null!";
    }
    if (edge.source.owner.getGraphManager().edges.indexOf(edge) == -1) {
      throw "Not in owner graph manager's edge list!";
    }

    var index = edge.source.owner.getGraphManager().edges.indexOf(edge);
    edge.source.owner.getGraphManager().edges.splice(index, 1);
  }
};

LGraphManager.prototype.updateBounds = function () {
  this.rootGraph.updateBounds(true);
};

LGraphManager.prototype.getGraphs = function () {
  return this.graphs;
};

LGraphManager.prototype.getAllNodes = function () {
  if (this.allNodes == null) {
    var nodeList = [];
    var graphs = this.getGraphs();
    var s = graphs.length;
    for (var i = 0; i < s; i++) {
      nodeList = nodeList.concat(graphs[i].getNodes());
    }
    this.allNodes = nodeList;
  }
  return this.allNodes;
};

LGraphManager.prototype.resetAllNodes = function () {
  this.allNodes = null;
};

LGraphManager.prototype.resetAllEdges = function () {
  this.allEdges = null;
};

LGraphManager.prototype.resetAllNodesToApplyGravitation = function () {
  this.allNodesToApplyGravitation = null;
};

LGraphManager.prototype.getAllEdges = function () {
  if (this.allEdges == null) {
    var edgeList = [];
    var graphs = this.getGraphs();
    var s = graphs.length;
    for (var i = 0; i < graphs.length; i++) {
      edgeList = edgeList.concat(graphs[i].getEdges());
    }

    edgeList = edgeList.concat(this.edges);

    this.allEdges = edgeList;
  }
  return this.allEdges;
};

LGraphManager.prototype.getAllNodesToApplyGravitation = function () {
  return this.allNodesToApplyGravitation;
};

LGraphManager.prototype.setAllNodesToApplyGravitation = function (nodeList) {
  if (this.allNodesToApplyGravitation != null) {
    throw "assert failed";
  }

  this.allNodesToApplyGravitation = nodeList;
};

LGraphManager.prototype.getRoot = function () {
  return this.rootGraph;
};

LGraphManager.prototype.setRootGraph = function (graph) {
  if (graph.getGraphManager() != this) {
    throw "Root not in this graph mgr!";
  }

  this.rootGraph = graph;
  // root graph must have a root node associated with it for convenience
  if (graph.parent == null) {
    graph.parent = this.layout.newNode("Root node");
  }
};

LGraphManager.prototype.getLayout = function () {
  return this.layout;
};

LGraphManager.prototype.isOneAncestorOfOther = function (firstNode, secondNode) {
  if (!(firstNode != null && secondNode != null)) {
    throw "assert failed";
  }

  if (firstNode == secondNode) {
    return true;
  }
  // Is second node an ancestor of the first one?
  var ownerGraph = firstNode.getOwner();
  var parentNode;

  do {
    parentNode = ownerGraph.getParent();

    if (parentNode == null) {
      break;
    }

    if (parentNode == secondNode) {
      return true;
    }

    ownerGraph = parentNode.getOwner();
    if (ownerGraph == null) {
      break;
    }
  } while (true);
  // Is first node an ancestor of the second one?
  ownerGraph = secondNode.getOwner();

  do {
    parentNode = ownerGraph.getParent();

    if (parentNode == null) {
      break;
    }

    if (parentNode == firstNode) {
      return true;
    }

    ownerGraph = parentNode.getOwner();
    if (ownerGraph == null) {
      break;
    }
  } while (true);

  return false;
};

LGraphManager.prototype.calcLowestCommonAncestors = function () {
  var edge;
  var sourceNode;
  var targetNode;
  var sourceAncestorGraph;
  var targetAncestorGraph;

  var edges = this.getAllEdges();
  var s = edges.length;
  for (var i = 0; i < s; i++) {
    edge = edges[i];

    sourceNode = edge.source;
    targetNode = edge.target;
    edge.lca = null;
    edge.sourceInLca = sourceNode;
    edge.targetInLca = targetNode;

    if (sourceNode == targetNode) {
      edge.lca = sourceNode.getOwner();
      continue;
    }

    sourceAncestorGraph = sourceNode.getOwner();

    while (edge.lca == null) {
      edge.targetInLca = targetNode;
      targetAncestorGraph = targetNode.getOwner();

      while (edge.lca == null) {
        if (targetAncestorGraph == sourceAncestorGraph) {
          edge.lca = targetAncestorGraph;
          break;
        }

        if (targetAncestorGraph == this.rootGraph) {
          break;
        }

        if (edge.lca != null) {
          throw "assert failed";
        }
        edge.targetInLca = targetAncestorGraph.getParent();
        targetAncestorGraph = edge.targetInLca.getOwner();
      }

      if (sourceAncestorGraph == this.rootGraph) {
        break;
      }

      if (edge.lca == null) {
        edge.sourceInLca = sourceAncestorGraph.getParent();
        sourceAncestorGraph = edge.sourceInLca.getOwner();
      }
    }

    if (edge.lca == null) {
      throw "assert failed";
    }
  }
};

LGraphManager.prototype.calcLowestCommonAncestor = function (firstNode, secondNode) {
  if (firstNode == secondNode) {
    return firstNode.getOwner();
  }
  var firstOwnerGraph = firstNode.getOwner();

  do {
    if (firstOwnerGraph == null) {
      break;
    }
    var secondOwnerGraph = secondNode.getOwner();

    do {
      if (secondOwnerGraph == null) {
        break;
      }

      if (secondOwnerGraph == firstOwnerGraph) {
        return secondOwnerGraph;
      }
      secondOwnerGraph = secondOwnerGraph.getParent().getOwner();
    } while (true);

    firstOwnerGraph = firstOwnerGraph.getParent().getOwner();
  } while (true);

  return firstOwnerGraph;
};

LGraphManager.prototype.calcInclusionTreeDepths = function (graph, depth) {
  if (graph == null && depth == null) {
    graph = this.rootGraph;
    depth = 1;
  }
  var node;

  var nodes = graph.getNodes();
  var s = nodes.length;
  for (var i = 0; i < s; i++) {
    node = nodes[i];
    node.inclusionTreeDepth = depth;

    if (node.child != null) {
      this.calcInclusionTreeDepths(node.child, depth + 1);
    }
  }
};

LGraphManager.prototype.includesInvalidEdge = function () {
  var edge;

  var s = this.edges.length;
  for (var i = 0; i < s; i++) {
    edge = this.edges[i];

    if (this.isOneAncestorOfOther(edge.source, edge.target)) {
      return true;
    }
  }
  return false;
};

module.exports = LGraphManager;

},{"./LEdge":21,"./LGraph":22}],24:[function(require,module,exports){
"use strict";

function LGraphObject(vGraphObject) {
  this.vGraphObject = vGraphObject;
}

module.exports = LGraphObject;

},{}],25:[function(require,module,exports){
'use strict';

var LGraphObject = require('./LGraphObject');
var Integer = require('./Integer');
var RectangleD = require('./RectangleD');
var LayoutConstants = require('./LayoutConstants');
var RandomSeed = require('./RandomSeed');
var PointD = require('./PointD');
var HashSet = require('./HashSet');

function LNode(gm, loc, size, vNode) {
  //Alternative constructor 1 : LNode(LGraphManager gm, Point loc, Dimension size, Object vNode)
  if (size == null && vNode == null) {
    vNode = loc;
  }

  LGraphObject.call(this, vNode);

  //Alternative constructor 2 : LNode(Layout layout, Object vNode)
  if (gm.graphManager != null) gm = gm.graphManager;

  this.estimatedSize = Integer.MIN_VALUE;
  this.inclusionTreeDepth = Integer.MAX_VALUE;
  this.vGraphObject = vNode;
  this.edges = [];
  this.graphManager = gm;

  if (size != null && loc != null) this.rect = new RectangleD(loc.x, loc.y, size.width, size.height);else this.rect = new RectangleD();
}

LNode.prototype = Object.create(LGraphObject.prototype);
for (var prop in LGraphObject) {
  LNode[prop] = LGraphObject[prop];
}

LNode.prototype.getEdges = function () {
  return this.edges;
};

LNode.prototype.getChild = function () {
  return this.child;
};

LNode.prototype.getOwner = function () {
  //  if (this.owner != null) {
  //    if (!(this.owner == null || this.owner.getNodes().indexOf(this) > -1)) {
  //      throw "assert failed";
  //    }
  //  }

  return this.owner;
};

LNode.prototype.getWidth = function () {
  return this.rect.width;
};

LNode.prototype.setWidth = function (width) {
  this.rect.width = width;
};

LNode.prototype.getHeight = function () {
  return this.rect.height;
};

LNode.prototype.setHeight = function (height) {
  this.rect.height = height;
};

LNode.prototype.getCenterX = function () {
  return this.rect.x + this.rect.width / 2;
};

LNode.prototype.getCenterY = function () {
  return this.rect.y + this.rect.height / 2;
};

LNode.prototype.getCenter = function () {
  return new PointD(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2);
};

LNode.prototype.getLocation = function () {
  return new PointD(this.rect.x, this.rect.y);
};

LNode.prototype.getRect = function () {
  return this.rect;
};

LNode.prototype.getDiagonal = function () {
  return Math.sqrt(this.rect.width * this.rect.width + this.rect.height * this.rect.height);
};

LNode.prototype.setRect = function (upperLeft, dimension) {
  this.rect.x = upperLeft.x;
  this.rect.y = upperLeft.y;
  this.rect.width = dimension.width;
  this.rect.height = dimension.height;
};

LNode.prototype.setCenter = function (cx, cy) {
  this.rect.x = cx - this.rect.width / 2;
  this.rect.y = cy - this.rect.height / 2;
};

LNode.prototype.setLocation = function (x, y) {
  this.rect.x = x;
  this.rect.y = y;
};

LNode.prototype.moveBy = function (dx, dy) {
  this.rect.x += dx;
  this.rect.y += dy;
};

LNode.prototype.getEdgeListToNode = function (to) {
  var edgeList = [];
  var edge;
  var self = this;

  self.edges.forEach(function (edge) {

    if (edge.target == to) {
      if (edge.source != self) throw "Incorrect edge source!";

      edgeList.push(edge);
    }
  });

  return edgeList;
};

LNode.prototype.getEdgesBetween = function (other) {
  var edgeList = [];
  var edge;

  var self = this;
  self.edges.forEach(function (edge) {

    if (!(edge.source == self || edge.target == self)) throw "Incorrect edge source and/or target";

    if (edge.target == other || edge.source == other) {
      edgeList.push(edge);
    }
  });

  return edgeList;
};

LNode.prototype.getNeighborsList = function () {
  var neighbors = new HashSet();
  var edge;

  var self = this;
  self.edges.forEach(function (edge) {

    if (edge.source == self) {
      neighbors.add(edge.target);
    } else {
      if (edge.target != self) {
        throw "Incorrect incidency!";
      }

      neighbors.add(edge.source);
    }
  });

  return neighbors;
};

LNode.prototype.withChildren = function () {
  var withNeighborsList = new Set();
  var childNode;
  var children;

  withNeighborsList.add(this);

  if (this.child != null) {
    var nodes = this.child.getNodes();
    for (var i = 0; i < nodes.length; i++) {
      childNode = nodes[i];
      children = childNode.withChildren();
      children.forEach(function (node) {
        withNeighborsList.add(node);
      });
    }
  }

  return withNeighborsList;
};

LNode.prototype.getNoOfChildren = function () {
  var noOfChildren = 0;
  var childNode;

  if (this.child == null) {
    noOfChildren = 1;
  } else {
    var nodes = this.child.getNodes();
    for (var i = 0; i < nodes.length; i++) {
      childNode = nodes[i];

      noOfChildren += childNode.getNoOfChildren();
    }
  }

  if (noOfChildren == 0) {
    noOfChildren = 1;
  }
  return noOfChildren;
};

LNode.prototype.getEstimatedSize = function () {
  if (this.estimatedSize == Integer.MIN_VALUE) {
    throw "assert failed";
  }
  return this.estimatedSize;
};

LNode.prototype.calcEstimatedSize = function () {
  if (this.child == null) {
    return this.estimatedSize = (this.rect.width + this.rect.height) / 2;
  } else {
    this.estimatedSize = this.child.calcEstimatedSize();
    this.rect.width = this.estimatedSize;
    this.rect.height = this.estimatedSize;

    return this.estimatedSize;
  }
};

LNode.prototype.scatter = function () {
  var randomCenterX;
  var randomCenterY;

  var minX = -LayoutConstants.INITIAL_WORLD_BOUNDARY;
  var maxX = LayoutConstants.INITIAL_WORLD_BOUNDARY;
  randomCenterX = LayoutConstants.WORLD_CENTER_X + RandomSeed.nextDouble() * (maxX - minX) + minX;

  var minY = -LayoutConstants.INITIAL_WORLD_BOUNDARY;
  var maxY = LayoutConstants.INITIAL_WORLD_BOUNDARY;
  randomCenterY = LayoutConstants.WORLD_CENTER_Y + RandomSeed.nextDouble() * (maxY - minY) + minY;

  this.rect.x = randomCenterX;
  this.rect.y = randomCenterY;
};

LNode.prototype.updateBounds = function () {
  if (this.getChild() == null) {
    throw "assert failed";
  }
  if (this.getChild().getNodes().length != 0) {
    // wrap the children nodes by re-arranging the boundaries
    var childGraph = this.getChild();
    childGraph.updateBounds(true);

    this.rect.x = childGraph.getLeft();
    this.rect.y = childGraph.getTop();

    this.setWidth(childGraph.getRight() - childGraph.getLeft());
    this.setHeight(childGraph.getBottom() - childGraph.getTop());

    // Update compound bounds considering its label properties    
    if (LayoutConstants.NODE_DIMENSIONS_INCLUDE_LABELS) {

      var width = childGraph.getRight() - childGraph.getLeft();
      var height = childGraph.getBottom() - childGraph.getTop();

      if (this.labelWidth > width) {
        this.rect.x -= (this.labelWidth - width) / 2;
        this.setWidth(this.labelWidth);
      }

      if (this.labelHeight > height) {
        if (this.labelPos == "center") {
          this.rect.y -= (this.labelHeight - height) / 2;
        } else if (this.labelPos == "top") {
          this.rect.y -= this.labelHeight - height;
        }
        this.setHeight(this.labelHeight);
      }
    }
  }
};

LNode.prototype.getInclusionTreeDepth = function () {
  if (this.inclusionTreeDepth == Integer.MAX_VALUE) {
    throw "assert failed";
  }
  return this.inclusionTreeDepth;
};

LNode.prototype.transform = function (trans) {
  var left = this.rect.x;

  if (left > LayoutConstants.WORLD_BOUNDARY) {
    left = LayoutConstants.WORLD_BOUNDARY;
  } else if (left < -LayoutConstants.WORLD_BOUNDARY) {
    left = -LayoutConstants.WORLD_BOUNDARY;
  }

  var top = this.rect.y;

  if (top > LayoutConstants.WORLD_BOUNDARY) {
    top = LayoutConstants.WORLD_BOUNDARY;
  } else if (top < -LayoutConstants.WORLD_BOUNDARY) {
    top = -LayoutConstants.WORLD_BOUNDARY;
  }

  var leftTop = new PointD(left, top);
  var vLeftTop = trans.inverseTransformPoint(leftTop);

  this.setLocation(vLeftTop.x, vLeftTop.y);
};

LNode.prototype.getLeft = function () {
  return this.rect.x;
};

LNode.prototype.getRight = function () {
  return this.rect.x + this.rect.width;
};

LNode.prototype.getTop = function () {
  return this.rect.y;
};

LNode.prototype.getBottom = function () {
  return this.rect.y + this.rect.height;
};

LNode.prototype.getParent = function () {
  if (this.owner == null) {
    return null;
  }

  return this.owner.getParent();
};

module.exports = LNode;

},{"./HashSet":17,"./Integer":20,"./LGraphObject":24,"./LayoutConstants":27,"./PointD":29,"./RandomSeed":30,"./RectangleD":31}],26:[function(require,module,exports){
'use strict';

var LayoutConstants = require('./LayoutConstants');
var HashMap = require('./HashMap');
var LGraphManager = require('./LGraphManager');
var LNode = require('./LNode');
var LEdge = require('./LEdge');
var LGraph = require('./LGraph');
var PointD = require('./PointD');
var Transform = require('./Transform');
var Emitter = require('./Emitter');
var HashSet = require('./HashSet');

function Layout(isRemoteUse) {
  Emitter.call(this);

  //Layout Quality: 0:proof, 1:default, 2:draft
  this.layoutQuality = LayoutConstants.DEFAULT_QUALITY;
  //Whether layout should create bendpoints as needed or not
  this.createBendsAsNeeded = LayoutConstants.DEFAULT_CREATE_BENDS_AS_NEEDED;
  //Whether layout should be incremental or not
  this.incremental = LayoutConstants.DEFAULT_INCREMENTAL;
  //Whether we animate from before to after layout node positions
  this.animationOnLayout = LayoutConstants.DEFAULT_ANIMATION_ON_LAYOUT;
  //Whether we animate the layout process or not
  this.animationDuringLayout = LayoutConstants.DEFAULT_ANIMATION_DURING_LAYOUT;
  //Number iterations that should be done between two successive animations
  this.animationPeriod = LayoutConstants.DEFAULT_ANIMATION_PERIOD;
  /**
   * Whether or not leaf nodes (non-compound nodes) are of uniform sizes. When
   * they are, both spring and repulsion forces between two leaf nodes can be
   * calculated without the expensive clipping point calculations, resulting
   * in major speed-up.
   */
  this.uniformLeafNodeSizes = LayoutConstants.DEFAULT_UNIFORM_LEAF_NODE_SIZES;
  /**
   * This is used for creation of bendpoints by using dummy nodes and edges.
   * Maps an LEdge to its dummy bendpoint path.
   */
  this.edgeToDummyNodes = new HashMap();
  this.graphManager = new LGraphManager(this);
  this.isLayoutFinished = false;
  this.isSubLayout = false;
  this.isRemoteUse = false;

  if (isRemoteUse != null) {
    this.isRemoteUse = isRemoteUse;
  }
}

Layout.RANDOM_SEED = 1;

Layout.prototype = Object.create(Emitter.prototype);

Layout.prototype.getGraphManager = function () {
  return this.graphManager;
};

Layout.prototype.getAllNodes = function () {
  return this.graphManager.getAllNodes();
};

Layout.prototype.getAllEdges = function () {
  return this.graphManager.getAllEdges();
};

Layout.prototype.getAllNodesToApplyGravitation = function () {
  return this.graphManager.getAllNodesToApplyGravitation();
};

Layout.prototype.newGraphManager = function () {
  var gm = new LGraphManager(this);
  this.graphManager = gm;
  return gm;
};

Layout.prototype.newGraph = function (vGraph) {
  return new LGraph(null, this.graphManager, vGraph);
};

Layout.prototype.newNode = function (vNode) {
  return new LNode(this.graphManager, vNode);
};

Layout.prototype.newEdge = function (vEdge) {
  return new LEdge(null, null, vEdge);
};

Layout.prototype.checkLayoutSuccess = function () {
  return this.graphManager.getRoot() == null || this.graphManager.getRoot().getNodes().length == 0 || this.graphManager.includesInvalidEdge();
};

Layout.prototype.runLayout = function () {
  this.isLayoutFinished = false;

  if (this.tilingPreLayout) {
    this.tilingPreLayout();
  }

  this.initParameters();
  var isLayoutSuccessfull;

  if (this.checkLayoutSuccess()) {
    isLayoutSuccessfull = false;
  } else {
    isLayoutSuccessfull = this.layout();
  }

  if (LayoutConstants.ANIMATE === 'during') {
    // If this is a 'during' layout animation. Layout is not finished yet. 
    // We need to perform these in index.js when layout is really finished.
    return false;
  }

  if (isLayoutSuccessfull) {
    if (!this.isSubLayout) {
      this.doPostLayout();
    }
  }

  if (this.tilingPostLayout) {
    this.tilingPostLayout();
  }

  this.isLayoutFinished = true;

  return isLayoutSuccessfull;
};

/**
 * This method performs the operations required after layout.
 */
Layout.prototype.doPostLayout = function () {
  //assert !isSubLayout : "Should not be called on sub-layout!";
  // Propagate geometric changes to v-level objects
  if (!this.incremental) {
    this.transform();
  }
  this.update();
};

/**
 * This method updates the geometry of the target graph according to
 * calculated layout.
 */
Layout.prototype.update2 = function () {
  // update bend points
  if (this.createBendsAsNeeded) {
    this.createBendpointsFromDummyNodes();

    // reset all edges, since the topology has changed
    this.graphManager.resetAllEdges();
  }

  // perform edge, node and root updates if layout is not called
  // remotely
  if (!this.isRemoteUse) {
    // update all edges
    var edge;
    var allEdges = this.graphManager.getAllEdges();
    for (var i = 0; i < allEdges.length; i++) {
      edge = allEdges[i];
      //      this.update(edge);
    }

    // recursively update nodes
    var node;
    var nodes = this.graphManager.getRoot().getNodes();
    for (var i = 0; i < nodes.length; i++) {
      node = nodes[i];
      //      this.update(node);
    }

    // update root graph
    this.update(this.graphManager.getRoot());
  }
};

Layout.prototype.update = function (obj) {
  if (obj == null) {
    this.update2();
  } else if (obj instanceof LNode) {
    var node = obj;
    if (node.getChild() != null) {
      // since node is compound, recursively update child nodes
      var nodes = node.getChild().getNodes();
      for (var i = 0; i < nodes.length; i++) {
        update(nodes[i]);
      }
    }

    // if the l-level node is associated with a v-level graph object,
    // then it is assumed that the v-level node implements the
    // interface Updatable.
    if (node.vGraphObject != null) {
      // cast to Updatable without any type check
      var vNode = node.vGraphObject;

      // call the update method of the interface
      vNode.update(node);
    }
  } else if (obj instanceof LEdge) {
    var edge = obj;
    // if the l-level edge is associated with a v-level graph object,
    // then it is assumed that the v-level edge implements the
    // interface Updatable.

    if (edge.vGraphObject != null) {
      // cast to Updatable without any type check
      var vEdge = edge.vGraphObject;

      // call the update method of the interface
      vEdge.update(edge);
    }
  } else if (obj instanceof LGraph) {
    var graph = obj;
    // if the l-level graph is associated with a v-level graph object,
    // then it is assumed that the v-level object implements the
    // interface Updatable.

    if (graph.vGraphObject != null) {
      // cast to Updatable without any type check
      var vGraph = graph.vGraphObject;

      // call the update method of the interface
      vGraph.update(graph);
    }
  }
};

/**
 * This method is used to set all layout parameters to default values
 * determined at compile time.
 */
Layout.prototype.initParameters = function () {
  if (!this.isSubLayout) {
    this.layoutQuality = LayoutConstants.DEFAULT_QUALITY;
    this.animationDuringLayout = LayoutConstants.DEFAULT_ANIMATION_DURING_LAYOUT;
    this.animationPeriod = LayoutConstants.DEFAULT_ANIMATION_PERIOD;
    this.animationOnLayout = LayoutConstants.DEFAULT_ANIMATION_ON_LAYOUT;
    this.incremental = LayoutConstants.DEFAULT_INCREMENTAL;
    this.createBendsAsNeeded = LayoutConstants.DEFAULT_CREATE_BENDS_AS_NEEDED;
    this.uniformLeafNodeSizes = LayoutConstants.DEFAULT_UNIFORM_LEAF_NODE_SIZES;
  }

  if (this.animationDuringLayout) {
    this.animationOnLayout = false;
  }
};

Layout.prototype.transform = function (newLeftTop) {
  if (newLeftTop == undefined) {
    this.transform(new PointD(0, 0));
  } else {
    // create a transformation object (from Eclipse to layout). When an
    // inverse transform is applied, we get upper-left coordinate of the
    // drawing or the root graph at given input coordinate (some margins
    // already included in calculation of left-top).

    var trans = new Transform();
    var leftTop = this.graphManager.getRoot().updateLeftTop();

    if (leftTop != null) {
      trans.setWorldOrgX(newLeftTop.x);
      trans.setWorldOrgY(newLeftTop.y);

      trans.setDeviceOrgX(leftTop.x);
      trans.setDeviceOrgY(leftTop.y);

      var nodes = this.getAllNodes();
      var node;

      for (var i = 0; i < nodes.length; i++) {
        node = nodes[i];
        node.transform(trans);
      }
    }
  }
};

Layout.prototype.positionNodesRandomly = function (graph) {

  if (graph == undefined) {
    //assert !this.incremental;
    this.positionNodesRandomly(this.getGraphManager().getRoot());
    this.getGraphManager().getRoot().updateBounds(true);
  } else {
    var lNode;
    var childGraph;

    var nodes = graph.getNodes();
    for (var i = 0; i < nodes.length; i++) {
      lNode = nodes[i];
      childGraph = lNode.getChild();

      if (childGraph == null) {
        lNode.scatter();
      } else if (childGraph.getNodes().length == 0) {
        lNode.scatter();
      } else {
        this.positionNodesRandomly(childGraph);
        lNode.updateBounds();
      }
    }
  }
};

/**
 * This method returns a list of trees where each tree is represented as a
 * list of l-nodes. The method returns a list of size 0 when:
 * - The graph is not flat or
 * - One of the component(s) of the graph is not a tree.
 */
Layout.prototype.getFlatForest = function () {
  var flatForest = [];
  var isForest = true;

  // Quick reference for all nodes in the graph manager associated with
  // this layout. The list should not be changed.
  var allNodes = this.graphManager.getRoot().getNodes();

  // First be sure that the graph is flat
  var isFlat = true;

  for (var i = 0; i < allNodes.length; i++) {
    if (allNodes[i].getChild() != null) {
      isFlat = false;
    }
  }

  // Return empty forest if the graph is not flat.
  if (!isFlat) {
    return flatForest;
  }

  // Run BFS for each component of the graph.

  var visited = new HashSet();
  var toBeVisited = [];
  var parents = new HashMap();
  var unProcessedNodes = [];

  unProcessedNodes = unProcessedNodes.concat(allNodes);

  // Each iteration of this loop finds a component of the graph and
  // decides whether it is a tree or not. If it is a tree, adds it to the
  // forest and continued with the next component.

  while (unProcessedNodes.length > 0 && isForest) {
    toBeVisited.push(unProcessedNodes[0]);

    // Start the BFS. Each iteration of this loop visits a node in a
    // BFS manner.
    while (toBeVisited.length > 0 && isForest) {
      //pool operation
      var currentNode = toBeVisited[0];
      toBeVisited.splice(0, 1);
      visited.add(currentNode);

      // Traverse all neighbors of this node
      var neighborEdges = currentNode.getEdges();

      for (var i = 0; i < neighborEdges.length; i++) {
        var currentNeighbor = neighborEdges[i].getOtherEnd(currentNode);

        // If BFS is not growing from this neighbor.
        if (parents.get(currentNode) != currentNeighbor) {
          // We haven't previously visited this neighbor.
          if (!visited.contains(currentNeighbor)) {
            toBeVisited.push(currentNeighbor);
            parents.put(currentNeighbor, currentNode);
          }
          // Since we have previously visited this neighbor and
          // this neighbor is not parent of currentNode, given
          // graph contains a component that is not tree, hence
          // it is not a forest.
          else {
              isForest = false;
              break;
            }
        }
      }
    }

    // The graph contains a component that is not a tree. Empty
    // previously found trees. The method will end.
    if (!isForest) {
      flatForest = [];
    }
    // Save currently visited nodes as a tree in our forest. Reset
    // visited and parents lists. Continue with the next component of
    // the graph, if any.
    else {
        var temp = [];
        visited.addAllTo(temp);
        flatForest.push(temp);
        //flatForest = flatForest.concat(temp);
        //unProcessedNodes.removeAll(visited);
        for (var i = 0; i < temp.length; i++) {
          var value = temp[i];
          var index = unProcessedNodes.indexOf(value);
          if (index > -1) {
            unProcessedNodes.splice(index, 1);
          }
        }
        visited = new HashSet();
        parents = new HashMap();
      }
  }

  return flatForest;
};

/**
 * This method creates dummy nodes (an l-level node with minimal dimensions)
 * for the given edge (one per bendpoint). The existing l-level structure
 * is updated accordingly.
 */
Layout.prototype.createDummyNodesForBendpoints = function (edge) {
  var dummyNodes = [];
  var prev = edge.source;

  var graph = this.graphManager.calcLowestCommonAncestor(edge.source, edge.target);

  for (var i = 0; i < edge.bendpoints.length; i++) {
    // create new dummy node
    var dummyNode = this.newNode(null);
    dummyNode.setRect(new Point(0, 0), new Dimension(1, 1));

    graph.add(dummyNode);

    // create new dummy edge between prev and dummy node
    var dummyEdge = this.newEdge(null);
    this.graphManager.add(dummyEdge, prev, dummyNode);

    dummyNodes.add(dummyNode);
    prev = dummyNode;
  }

  var dummyEdge = this.newEdge(null);
  this.graphManager.add(dummyEdge, prev, edge.target);

  this.edgeToDummyNodes.put(edge, dummyNodes);

  // remove real edge from graph manager if it is inter-graph
  if (edge.isInterGraph()) {
    this.graphManager.remove(edge);
  }
  // else, remove the edge from the current graph
  else {
      graph.remove(edge);
    }

  return dummyNodes;
};

/**
 * This method creates bendpoints for edges from the dummy nodes
 * at l-level.
 */
Layout.prototype.createBendpointsFromDummyNodes = function () {
  var edges = [];
  edges = edges.concat(this.graphManager.getAllEdges());
  edges = this.edgeToDummyNodes.keySet().concat(edges);

  for (var k = 0; k < edges.length; k++) {
    var lEdge = edges[k];

    if (lEdge.bendpoints.length > 0) {
      var path = this.edgeToDummyNodes.get(lEdge);

      for (var i = 0; i < path.length; i++) {
        var dummyNode = path[i];
        var p = new PointD(dummyNode.getCenterX(), dummyNode.getCenterY());

        // update bendpoint's location according to dummy node
        var ebp = lEdge.bendpoints.get(i);
        ebp.x = p.x;
        ebp.y = p.y;

        // remove the dummy node, dummy edges incident with this
        // dummy node is also removed (within the remove method)
        dummyNode.getOwner().remove(dummyNode);
      }

      // add the real edge to graph
      this.graphManager.add(lEdge, lEdge.source, lEdge.target);
    }
  }
};

Layout.transform = function (sliderValue, defaultValue, minDiv, maxMul) {
  if (minDiv != undefined && maxMul != undefined) {
    var value = defaultValue;

    if (sliderValue <= 50) {
      var minValue = defaultValue / minDiv;
      value -= (defaultValue - minValue) / 50 * (50 - sliderValue);
    } else {
      var maxValue = defaultValue * maxMul;
      value += (maxValue - defaultValue) / 50 * (sliderValue - 50);
    }

    return value;
  } else {
    var a, b;

    if (sliderValue <= 50) {
      a = 9.0 * defaultValue / 500.0;
      b = defaultValue / 10.0;
    } else {
      a = 9.0 * defaultValue / 50.0;
      b = -8 * defaultValue;
    }

    return a * sliderValue + b;
  }
};

/**
 * This method finds and returns the center of the given nodes, assuming
 * that the given nodes form a tree in themselves.
 */
Layout.findCenterOfTree = function (nodes) {
  var list = [];
  list = list.concat(nodes);

  var removedNodes = [];
  var remainingDegrees = new HashMap();
  var foundCenter = false;
  var centerNode = null;

  if (list.length == 1 || list.length == 2) {
    foundCenter = true;
    centerNode = list[0];
  }

  for (var i = 0; i < list.length; i++) {
    var node = list[i];
    var degree = node.getNeighborsList().size();
    remainingDegrees.put(node, node.getNeighborsList().size());

    if (degree == 1) {
      removedNodes.push(node);
    }
  }

  var tempList = [];
  tempList = tempList.concat(removedNodes);

  while (!foundCenter) {
    var tempList2 = [];
    tempList2 = tempList2.concat(tempList);
    tempList = [];

    for (var i = 0; i < list.length; i++) {
      var node = list[i];

      var index = list.indexOf(node);
      if (index >= 0) {
        list.splice(index, 1);
      }

      var neighbours = node.getNeighborsList();

      Object.keys(neighbours.set).forEach(function (j) {
        var neighbour = neighbours.set[j];
        if (removedNodes.indexOf(neighbour) < 0) {
          var otherDegree = remainingDegrees.get(neighbour);
          var newDegree = otherDegree - 1;

          if (newDegree == 1) {
            tempList.push(neighbour);
          }

          remainingDegrees.put(neighbour, newDegree);
        }
      });
    }

    removedNodes = removedNodes.concat(tempList);

    if (list.length == 1 || list.length == 2) {
      foundCenter = true;
      centerNode = list[0];
    }
  }

  return centerNode;
};

/**
 * During the coarsening process, this layout may be referenced by two graph managers
 * this setter function grants access to change the currently being used graph manager
 */
Layout.prototype.setGraphManager = function (gm) {
  this.graphManager = gm;
};

module.exports = Layout;

},{"./Emitter":11,"./HashMap":16,"./HashSet":17,"./LEdge":21,"./LGraph":22,"./LGraphManager":23,"./LNode":25,"./LayoutConstants":27,"./PointD":29,"./Transform":32}],27:[function(require,module,exports){
"use strict";

function LayoutConstants() {}

/**
 * Layout Quality
 */
LayoutConstants.PROOF_QUALITY = 0;
LayoutConstants.DEFAULT_QUALITY = 1;
LayoutConstants.DRAFT_QUALITY = 2;

/**
 * Default parameters
 */
LayoutConstants.DEFAULT_CREATE_BENDS_AS_NEEDED = false;
//LayoutConstants.DEFAULT_INCREMENTAL = true;
LayoutConstants.DEFAULT_INCREMENTAL = false;
LayoutConstants.DEFAULT_ANIMATION_ON_LAYOUT = true;
LayoutConstants.DEFAULT_ANIMATION_DURING_LAYOUT = false;
LayoutConstants.DEFAULT_ANIMATION_PERIOD = 50;
LayoutConstants.DEFAULT_UNIFORM_LEAF_NODE_SIZES = false;

// -----------------------------------------------------------------------------
// Section: General other constants
// -----------------------------------------------------------------------------
/*
 * Margins of a graph to be applied on bouding rectangle of its contents. We
 * assume margins on all four sides to be uniform.
 */
LayoutConstants.DEFAULT_GRAPH_MARGIN = 15;

/*
 * Whether to consider labels in node dimensions or not
 */
LayoutConstants.NODE_DIMENSIONS_INCLUDE_LABELS = false;

/*
 * Default dimension of a non-compound node.
 */
LayoutConstants.SIMPLE_NODE_SIZE = 40;

/*
 * Default dimension of a non-compound node.
 */
LayoutConstants.SIMPLE_NODE_HALF_SIZE = LayoutConstants.SIMPLE_NODE_SIZE / 2;

/*
 * Empty compound node size. When a compound node is empty, its both
 * dimensions should be of this value.
 */
LayoutConstants.EMPTY_COMPOUND_NODE_SIZE = 40;

/*
 * Minimum length that an edge should take during layout
 */
LayoutConstants.MIN_EDGE_LENGTH = 1;

/*
 * World boundaries that layout operates on
 */
LayoutConstants.WORLD_BOUNDARY = 1000000;

/*
 * World boundaries that random positioning can be performed with
 */
LayoutConstants.INITIAL_WORLD_BOUNDARY = LayoutConstants.WORLD_BOUNDARY / 1000;

/*
 * Coordinates of the world center
 */
LayoutConstants.WORLD_CENTER_X = 1200;
LayoutConstants.WORLD_CENTER_Y = 900;

module.exports = LayoutConstants;

},{}],28:[function(require,module,exports){
'use strict';

/*
 *This class is the javascript implementation of the Point.java class in jdk
 */
function Point(x, y, p) {
  this.x = null;
  this.y = null;
  if (x == null && y == null && p == null) {
    this.x = 0;
    this.y = 0;
  } else if (typeof x == 'number' && typeof y == 'number' && p == null) {
    this.x = x;
    this.y = y;
  } else if (x.constructor.name == 'Point' && y == null && p == null) {
    p = x;
    this.x = p.x;
    this.y = p.y;
  }
}

Point.prototype.getX = function () {
  return this.x;
};

Point.prototype.getY = function () {
  return this.y;
};

Point.prototype.getLocation = function () {
  return new Point(this.x, this.y);
};

Point.prototype.setLocation = function (x, y, p) {
  if (x.constructor.name == 'Point' && y == null && p == null) {
    p = x;
    this.setLocation(p.x, p.y);
  } else if (typeof x == 'number' && typeof y == 'number' && p == null) {
    //if both parameters are integer just move (x,y) location
    if (parseInt(x) == x && parseInt(y) == y) {
      this.move(x, y);
    } else {
      this.x = Math.floor(x + 0.5);
      this.y = Math.floor(y + 0.5);
    }
  }
};

Point.prototype.move = function (x, y) {
  this.x = x;
  this.y = y;
};

Point.prototype.translate = function (dx, dy) {
  this.x += dx;
  this.y += dy;
};

Point.prototype.equals = function (obj) {
  if (obj.constructor.name == "Point") {
    var pt = obj;
    return this.x == pt.x && this.y == pt.y;
  }
  return this == obj;
};

Point.prototype.toString = function () {
  return new Point().constructor.name + "[x=" + this.x + ",y=" + this.y + "]";
};

module.exports = Point;

},{}],29:[function(require,module,exports){
"use strict";

function PointD(x, y) {
  if (x == null && y == null) {
    this.x = 0;
    this.y = 0;
  } else {
    this.x = x;
    this.y = y;
  }
}

PointD.prototype.getX = function () {
  return this.x;
};

PointD.prototype.getY = function () {
  return this.y;
};

PointD.prototype.setX = function (x) {
  this.x = x;
};

PointD.prototype.setY = function (y) {
  this.y = y;
};

PointD.prototype.getDifference = function (pt) {
  return new DimensionD(this.x - pt.x, this.y - pt.y);
};

PointD.prototype.getCopy = function () {
  return new PointD(this.x, this.y);
};

PointD.prototype.translate = function (dim) {
  this.x += dim.width;
  this.y += dim.height;
  return this;
};

module.exports = PointD;

},{}],30:[function(require,module,exports){
"use strict";

function RandomSeed() {}
RandomSeed.seed = 1;
RandomSeed.x = 0;

RandomSeed.nextDouble = function () {
  RandomSeed.x = Math.sin(RandomSeed.seed++) * 10000;
  return RandomSeed.x - Math.floor(RandomSeed.x);
};

module.exports = RandomSeed;

},{}],31:[function(require,module,exports){
"use strict";

function RectangleD(x, y, width, height) {
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;

  if (x != null && y != null && width != null && height != null) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

RectangleD.prototype.getX = function () {
  return this.x;
};

RectangleD.prototype.setX = function (x) {
  this.x = x;
};

RectangleD.prototype.getY = function () {
  return this.y;
};

RectangleD.prototype.setY = function (y) {
  this.y = y;
};

RectangleD.prototype.getWidth = function () {
  return this.width;
};

RectangleD.prototype.setWidth = function (width) {
  this.width = width;
};

RectangleD.prototype.getHeight = function () {
  return this.height;
};

RectangleD.prototype.setHeight = function (height) {
  this.height = height;
};

RectangleD.prototype.getRight = function () {
  return this.x + this.width;
};

RectangleD.prototype.getBottom = function () {
  return this.y + this.height;
};

RectangleD.prototype.intersects = function (a) {
  if (this.getRight() < a.x) {
    return false;
  }

  if (this.getBottom() < a.y) {
    return false;
  }

  if (a.getRight() < this.x) {
    return false;
  }

  if (a.getBottom() < this.y) {
    return false;
  }

  return true;
};

RectangleD.prototype.getCenterX = function () {
  return this.x + this.width / 2;
};

RectangleD.prototype.getMinX = function () {
  return this.getX();
};

RectangleD.prototype.getMaxX = function () {
  return this.getX() + this.width;
};

RectangleD.prototype.getCenterY = function () {
  return this.y + this.height / 2;
};

RectangleD.prototype.getMinY = function () {
  return this.getY();
};

RectangleD.prototype.getMaxY = function () {
  return this.getY() + this.height;
};

RectangleD.prototype.getWidthHalf = function () {
  return this.width / 2;
};

RectangleD.prototype.getHeightHalf = function () {
  return this.height / 2;
};

module.exports = RectangleD;

},{}],32:[function(require,module,exports){
'use strict';

var PointD = require('./PointD');

function Transform(x, y) {
  this.lworldOrgX = 0.0;
  this.lworldOrgY = 0.0;
  this.ldeviceOrgX = 0.0;
  this.ldeviceOrgY = 0.0;
  this.lworldExtX = 1.0;
  this.lworldExtY = 1.0;
  this.ldeviceExtX = 1.0;
  this.ldeviceExtY = 1.0;
}

Transform.prototype.getWorldOrgX = function () {
  return this.lworldOrgX;
};

Transform.prototype.setWorldOrgX = function (wox) {
  this.lworldOrgX = wox;
};

Transform.prototype.getWorldOrgY = function () {
  return this.lworldOrgY;
};

Transform.prototype.setWorldOrgY = function (woy) {
  this.lworldOrgY = woy;
};

Transform.prototype.getWorldExtX = function () {
  return this.lworldExtX;
};

Transform.prototype.setWorldExtX = function (wex) {
  this.lworldExtX = wex;
};

Transform.prototype.getWorldExtY = function () {
  return this.lworldExtY;
};

Transform.prototype.setWorldExtY = function (wey) {
  this.lworldExtY = wey;
};

/* Device related */

Transform.prototype.getDeviceOrgX = function () {
  return this.ldeviceOrgX;
};

Transform.prototype.setDeviceOrgX = function (dox) {
  this.ldeviceOrgX = dox;
};

Transform.prototype.getDeviceOrgY = function () {
  return this.ldeviceOrgY;
};

Transform.prototype.setDeviceOrgY = function (doy) {
  this.ldeviceOrgY = doy;
};

Transform.prototype.getDeviceExtX = function () {
  return this.ldeviceExtX;
};

Transform.prototype.setDeviceExtX = function (dex) {
  this.ldeviceExtX = dex;
};

Transform.prototype.getDeviceExtY = function () {
  return this.ldeviceExtY;
};

Transform.prototype.setDeviceExtY = function (dey) {
  this.ldeviceExtY = dey;
};

Transform.prototype.transformX = function (x) {
  var xDevice = 0.0;
  var worldExtX = this.lworldExtX;
  if (worldExtX != 0.0) {
    xDevice = this.ldeviceOrgX + (x - this.lworldOrgX) * this.ldeviceExtX / worldExtX;
  }

  return xDevice;
};

Transform.prototype.transformY = function (y) {
  var yDevice = 0.0;
  var worldExtY = this.lworldExtY;
  if (worldExtY != 0.0) {
    yDevice = this.ldeviceOrgY + (y - this.lworldOrgY) * this.ldeviceExtY / worldExtY;
  }

  return yDevice;
};

Transform.prototype.inverseTransformX = function (x) {
  var xWorld = 0.0;
  var deviceExtX = this.ldeviceExtX;
  if (deviceExtX != 0.0) {
    xWorld = this.lworldOrgX + (x - this.ldeviceOrgX) * this.lworldExtX / deviceExtX;
  }

  return xWorld;
};

Transform.prototype.inverseTransformY = function (y) {
  var yWorld = 0.0;
  var deviceExtY = this.ldeviceExtY;
  if (deviceExtY != 0.0) {
    yWorld = this.lworldOrgY + (y - this.ldeviceOrgY) * this.lworldExtY / deviceExtY;
  }
  return yWorld;
};

Transform.prototype.inverseTransformPoint = function (inPoint) {
  var outPoint = new PointD(this.inverseTransformX(inPoint.x), this.inverseTransformY(inPoint.y));
  return outPoint;
};

module.exports = Transform;

},{"./PointD":29}],33:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function UniqueIDGeneretor() {}

UniqueIDGeneretor.lastID = 0;

UniqueIDGeneretor.createID = function (obj) {
  if (UniqueIDGeneretor.isPrimitive(obj)) {
    return obj;
  }
  if (obj.uniqueID != null) {
    return obj.uniqueID;
  }
  obj.uniqueID = UniqueIDGeneretor.getString();
  UniqueIDGeneretor.lastID++;
  return obj.uniqueID;
};

UniqueIDGeneretor.getString = function (id) {
  if (id == null) id = UniqueIDGeneretor.lastID;
  return "Object#" + id + "";
};

UniqueIDGeneretor.isPrimitive = function (arg) {
  var type = typeof arg === "undefined" ? "undefined" : _typeof(arg);
  return arg == null || type != "object" && type != "function";
};

module.exports = UniqueIDGeneretor;

},{}],34:[function(require,module,exports){
'use strict';

var DimensionD = require('./DimensionD');
var HashMap = require('./HashMap');
var HashSet = require('./HashSet');
var IGeometry = require('./IGeometry');
var IMath = require('./IMath');
var Integer = require('./Integer');
var Point = require('./Point');
var PointD = require('./PointD');
var RandomSeed = require('./RandomSeed');
var RectangleD = require('./RectangleD');
var Transform = require('./Transform');
var UniqueIDGeneretor = require('./UniqueIDGeneretor');
var LGraphObject = require('./LGraphObject');
var LGraph = require('./LGraph');
var LEdge = require('./LEdge');
var LGraphManager = require('./LGraphManager');
var LNode = require('./LNode');
var Layout = require('./Layout');
var LayoutConstants = require('./LayoutConstants');
var FDLayout = require('./FDLayout');
var FDLayoutConstants = require('./FDLayoutConstants');
var FDLayoutEdge = require('./FDLayoutEdge');
var FDLayoutNode = require('./FDLayoutNode');
var CoSEConstants = require('./CoSEConstants');
var CoSEEdge = require('./CoSEEdge');
var CoSEGraph = require('./CoSEGraph');
var CoSEGraphManager = require('./CoSEGraphManager');
var CoSELayout = require('./CoSELayout');
var CoSENode = require('./CoSENode');

var defaults = {
  // Called on `layoutready`
  ready: function ready() {},
  // Called on `layoutstop`
  stop: function stop() {},
  // include labels in node dimensions
  nodeDimensionsIncludeLabels: false,
  // number of ticks per frame; higher is faster but more jerky
  refresh: 30,
  // Whether to fit the network view after when done
  fit: true,
  // Padding on fit
  padding: 10,
  // Whether to enable incremental mode
  randomize: true,
  // Node repulsion (non overlapping) multiplier
  nodeRepulsion: 4500,
  // Ideal edge (non nested) length
  idealEdgeLength: 50,
  // Divisor to compute edge forces
  edgeElasticity: 0.45,
  // Nesting factor (multiplier) to compute ideal edge length for nested edges
  nestingFactor: 0.1,
  // Gravity force (constant)
  gravity: 0.25,
  // Maximum number of iterations to perform
  numIter: 2500,
  // For enabling tiling
  tile: true,
  // Type of layout animation. The option set is {'during', 'end', false}
  animate: 'end',
  // Duration for animate:end
  animationDuration: 500,
  // Represents the amount of the vertical space to put between the zero degree members during the tiling operation(can also be a function)
  tilingPaddingVertical: 10,
  // Represents the amount of the horizontal space to put between the zero degree members during the tiling operation(can also be a function)
  tilingPaddingHorizontal: 10,
  // Gravity range (constant) for compounds
  gravityRangeCompound: 1.5,
  // Gravity force (constant) for compounds
  gravityCompound: 1.0,
  // Gravity range (constant)
  gravityRange: 3.8,
  // Initial cooling factor for incremental layout
  initialEnergyOnIncremental: 0.5
};

function extend(defaults, options) {
  var obj = {};

  for (var i in defaults) {
    obj[i] = defaults[i];
  }

  for (var i in options) {
    obj[i] = options[i];
  }

  return obj;
};

function _CoSELayout(_options) {
  this.options = extend(defaults, _options);
  getUserOptions(this.options);
}

var getUserOptions = function getUserOptions(options) {
  if (options.nodeRepulsion != null) CoSEConstants.DEFAULT_REPULSION_STRENGTH = FDLayoutConstants.DEFAULT_REPULSION_STRENGTH = options.nodeRepulsion;
  if (options.idealEdgeLength != null) CoSEConstants.DEFAULT_EDGE_LENGTH = FDLayoutConstants.DEFAULT_EDGE_LENGTH = options.idealEdgeLength;
  if (options.edgeElasticity != null) CoSEConstants.DEFAULT_SPRING_STRENGTH = FDLayoutConstants.DEFAULT_SPRING_STRENGTH = options.edgeElasticity;
  if (options.nestingFactor != null) CoSEConstants.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = FDLayoutConstants.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = options.nestingFactor;
  if (options.gravity != null) CoSEConstants.DEFAULT_GRAVITY_STRENGTH = FDLayoutConstants.DEFAULT_GRAVITY_STRENGTH = options.gravity;
  if (options.numIter != null) CoSEConstants.MAX_ITERATIONS = FDLayoutConstants.MAX_ITERATIONS = options.numIter;
  if (options.gravityRange != null) CoSEConstants.DEFAULT_GRAVITY_RANGE_FACTOR = FDLayoutConstants.DEFAULT_GRAVITY_RANGE_FACTOR = options.gravityRange;
  if (options.gravityCompound != null) CoSEConstants.DEFAULT_COMPOUND_GRAVITY_STRENGTH = FDLayoutConstants.DEFAULT_COMPOUND_GRAVITY_STRENGTH = options.gravityCompound;
  if (options.gravityRangeCompound != null) CoSEConstants.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = FDLayoutConstants.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = options.gravityRangeCompound;
  if (options.initialEnergyOnIncremental != null) CoSEConstants.DEFAULT_COOLING_FACTOR_INCREMENTAL = FDLayoutConstants.DEFAULT_COOLING_FACTOR_INCREMENTAL = options.initialEnergyOnIncremental;

  CoSEConstants.NODE_DIMENSIONS_INCLUDE_LABELS = FDLayoutConstants.NODE_DIMENSIONS_INCLUDE_LABELS = LayoutConstants.NODE_DIMENSIONS_INCLUDE_LABELS = options.nodeDimensionsIncludeLabels;
  CoSEConstants.DEFAULT_INCREMENTAL = FDLayoutConstants.DEFAULT_INCREMENTAL = LayoutConstants.DEFAULT_INCREMENTAL = !options.randomize;
  CoSEConstants.ANIMATE = FDLayoutConstants.ANIMATE = LayoutConstants.ANIMATE = options.animate;
  CoSEConstants.TILE = options.tile;
  CoSEConstants.TILING_PADDING_VERTICAL = typeof options.tilingPaddingVertical === 'function' ? options.tilingPaddingVertical.call() : options.tilingPaddingVertical;
  CoSEConstants.TILING_PADDING_HORIZONTAL = typeof options.tilingPaddingHorizontal === 'function' ? options.tilingPaddingHorizontal.call() : options.tilingPaddingHorizontal;
};

_CoSELayout.prototype.run = function () {
  var ready;
  var frameId;
  var options = this.options;
  var idToLNode = this.idToLNode = {};
  var layout = this.layout = new CoSELayout();
  var self = this;

  self.stopped = false;

  this.cy = this.options.cy;

  this.cy.trigger({ type: 'layoutstart', layout: this });

  var gm = layout.newGraphManager();
  this.gm = gm;

  var nodes = this.options.eles.nodes();
  var edges = this.options.eles.edges();

  this.root = gm.addRoot();
  this.processChildrenList(this.root, this.getTopMostNodes(nodes), layout);

  for (var i = 0; i < edges.length; i++) {
    var edge = edges[i];
    var sourceNode = this.idToLNode[edge.data("source")];
    var targetNode = this.idToLNode[edge.data("target")];
    if (sourceNode.getEdgesBetween(targetNode).length == 0) {
      var e1 = gm.add(layout.newEdge(), sourceNode, targetNode);
      e1.id = edge.id();
    }
  }

  var getPositions = function getPositions(ele, i) {
    if (typeof ele === "number") {
      ele = i;
    }
    var theId = ele.data('id');
    var lNode = self.idToLNode[theId];

    return {
      x: lNode.getRect().getCenterX(),
      y: lNode.getRect().getCenterY()
    };
  };

  /*
   * Reposition nodes in iterations animatedly
   */
  var iterateAnimated = function iterateAnimated() {
    // Thigs to perform after nodes are repositioned on screen
    var afterReposition = function afterReposition() {
      if (options.fit) {
        options.cy.fit(options.eles.nodes(), options.padding);
      }

      if (!ready) {
        ready = true;
        self.cy.one('layoutready', options.ready);
        self.cy.trigger({ type: 'layoutready', layout: self });
      }
    };

    var ticksPerFrame = self.options.refresh;
    var isDone;

    for (var i = 0; i < ticksPerFrame && !isDone; i++) {
      isDone = self.stopped || self.layout.tick();
    }

    // If layout is done
    if (isDone) {
      // If the layout is not a sublayout and it is successful perform post layout.
      if (layout.checkLayoutSuccess() && !layout.isSubLayout) {
        layout.doPostLayout();
      }

      // If layout has a tilingPostLayout function property call it.
      if (layout.tilingPostLayout) {
        layout.tilingPostLayout();
      }

      layout.isLayoutFinished = true;

      self.options.eles.nodes().positions(getPositions);

      afterReposition();

      // trigger layoutstop when the layout stops (e.g. finishes)
      self.cy.one('layoutstop', self.options.stop);
      self.cy.trigger({ type: 'layoutstop', layout: self });

      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      ready = false;
      return;
    }

    var animationData = self.layout.getPositionsData(); // Get positions of layout nodes note that all nodes may not be layout nodes because of tiling

    // Position nodes, for the nodes whose id does not included in data (because they are removed from their parents and included in dummy compounds)
    // use position of their ancestors or dummy ancestors
    options.eles.nodes().positions(function (ele, i) {
      if (typeof ele === "number") {
        ele = i;
      }
      var theId = ele.id();
      var pNode = animationData[theId];
      var temp = ele;
      // If pNode is undefined search until finding position data of its first ancestor (It may be dummy as well)
      while (pNode == null) {
        pNode = animationData[temp.data('parent')] || animationData['DummyCompound_' + temp.data('parent')];
        animationData[theId] = pNode;
        temp = temp.parent()[0];
        if (temp == undefined) {
          break;
        }
      }
      if (pNode != null) {
        return {
          x: pNode.x,
          y: pNode.y
        };
      } else {
        return {
          x: ele.x,
          y: ele.y
        };
      }
    });

    afterReposition();

    frameId = requestAnimationFrame(iterateAnimated);
  };

  /*
  * Listen 'layoutstarted' event and start animated iteration if animate option is 'during'
  */
  layout.addListener('layoutstarted', function () {
    if (self.options.animate === 'during') {
      frameId = requestAnimationFrame(iterateAnimated);
    }
  });

  layout.runLayout(); // Run cose layout

  /*
   * If animate option is not 'during' ('end' or false) perform these here (If it is 'during' similar things are already performed)
   */
  if (this.options.animate !== "during") {
    self.options.eles.nodes().not(":parent").layoutPositions(self, self.options, getPositions); // Use layout positions to reposition the nodes it considers the options parameter
    ready = false;
  }

  return this; // chaining
};

//Get the top most ones of a list of nodes
_CoSELayout.prototype.getTopMostNodes = function (nodes) {
  var nodesMap = {};
  for (var i = 0; i < nodes.length; i++) {
    nodesMap[nodes[i].id()] = true;
  }
  var roots = nodes.filter(function (ele, i) {
    if (typeof ele === "number") {
      ele = i;
    }
    var parent = ele.parent()[0];
    while (parent != null) {
      if (nodesMap[parent.id()]) {
        return false;
      }
      parent = parent.parent()[0];
    }
    return true;
  });

  return roots;
};

_CoSELayout.prototype.processChildrenList = function (parent, children, layout) {
  var size = children.length;
  for (var i = 0; i < size; i++) {
    var theChild = children[i];
    var children_of_children = theChild.children();
    var theNode;

    var dimensions = theChild.layoutDimensions({
      nodeDimensionsIncludeLabels: this.options.nodeDimensionsIncludeLabels
    });

    if (theChild.outerWidth() != null && theChild.outerHeight() != null) {
      theNode = parent.add(new CoSENode(layout.graphManager, new PointD(theChild.position('x') - dimensions.w / 2, theChild.position('y') - dimensions.h / 2), new DimensionD(parseFloat(dimensions.w), parseFloat(dimensions.h))));
    } else {
      theNode = parent.add(new CoSENode(this.graphManager));
    }
    // Attach id to the layout node
    theNode.id = theChild.data("id");
    // Attach the paddings of cy node to layout node
    theNode.paddingLeft = parseInt(theChild.css('padding'));
    theNode.paddingTop = parseInt(theChild.css('padding'));
    theNode.paddingRight = parseInt(theChild.css('padding'));
    theNode.paddingBottom = parseInt(theChild.css('padding'));

    //Attach the label properties to compound if labels will be included in node dimensions  
    if (this.options.nodeDimensionsIncludeLabels) {
      if (theChild.isParent()) {
        var labelWidth = theChild.boundingBox({ includeLabels: true, includeNodes: false }).w;
        var labelHeight = theChild.boundingBox({ includeLabels: true, includeNodes: false }).h;
        var labelPos = theChild.css("text-halign");
        theNode.labelWidth = labelWidth;
        theNode.labelHeight = labelHeight;
        theNode.labelPos = labelPos;
      }
    }

    // Map the layout node
    this.idToLNode[theChild.data("id")] = theNode;

    if (isNaN(theNode.rect.x)) {
      theNode.rect.x = 0;
    }

    if (isNaN(theNode.rect.y)) {
      theNode.rect.y = 0;
    }

    if (children_of_children != null && children_of_children.length > 0) {
      var theNewGraph;
      theNewGraph = layout.getGraphManager().add(layout.newGraph(), theNode);
      this.processChildrenList(theNewGraph, children_of_children, layout);
    }
  }
};

/**
 * @brief : called on continuous layouts to stop them before they finish
 */
_CoSELayout.prototype.stop = function () {
  this.stopped = true;

  return this; // chaining
};

module.exports = function get(cytoscape) {
  return _CoSELayout;
};

},{"./CoSEConstants":4,"./CoSEEdge":5,"./CoSEGraph":6,"./CoSEGraphManager":7,"./CoSELayout":8,"./CoSENode":9,"./DimensionD":10,"./FDLayout":12,"./FDLayoutConstants":13,"./FDLayoutEdge":14,"./FDLayoutNode":15,"./HashMap":16,"./HashSet":17,"./IGeometry":18,"./IMath":19,"./Integer":20,"./LEdge":21,"./LGraph":22,"./LGraphManager":23,"./LGraphObject":24,"./LNode":25,"./Layout":26,"./LayoutConstants":27,"./Point":28,"./PointD":29,"./RandomSeed":30,"./RectangleD":31,"./Transform":32,"./UniqueIDGeneretor":33}],35:[function(require,module,exports){
'use strict';

// registers the extension on a cytoscape lib ref

var getLayout = require('./Layout');

var register = function register(cytoscape) {
  var Layout = getLayout(cytoscape);

  cytoscape('layout', 'cose-bilkent', Layout);
};

// auto reg for globals
if (typeof cytoscape !== 'undefined') {
  register(cytoscape);
}

module.exports = register;

},{"./Layout":34}]},{},[35])(35)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbGlua2VkbGlzdC1qcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9saW5rZWRsaXN0LWpzL3NyYy9MaXN0LmpzIiwibm9kZV9tb2R1bGVzL2xpbmtlZGxpc3QtanMvc3JjL05vZGUuanMiLCJzcmMvTGF5b3V0L0NvU0VDb25zdGFudHMuanMiLCJzcmMvTGF5b3V0L0NvU0VFZGdlLmpzIiwic3JjL0xheW91dC9Db1NFR3JhcGguanMiLCJzcmMvTGF5b3V0L0NvU0VHcmFwaE1hbmFnZXIuanMiLCJzcmMvTGF5b3V0L0NvU0VMYXlvdXQuanMiLCJzcmMvTGF5b3V0L0NvU0VOb2RlLmpzIiwic3JjL0xheW91dC9EaW1lbnNpb25ELmpzIiwic3JjL0xheW91dC9FbWl0dGVyLmpzIiwic3JjL0xheW91dC9GRExheW91dC5qcyIsInNyYy9MYXlvdXQvRkRMYXlvdXRDb25zdGFudHMuanMiLCJzcmMvTGF5b3V0L0ZETGF5b3V0RWRnZS5qcyIsInNyYy9MYXlvdXQvRkRMYXlvdXROb2RlLmpzIiwic3JjL0xheW91dC9IYXNoTWFwLmpzIiwic3JjL0xheW91dC9IYXNoU2V0LmpzIiwic3JjL0xheW91dC9JR2VvbWV0cnkuanMiLCJzcmMvTGF5b3V0L0lNYXRoLmpzIiwic3JjL0xheW91dC9JbnRlZ2VyLmpzIiwic3JjL0xheW91dC9MRWRnZS5qcyIsInNyYy9MYXlvdXQvTEdyYXBoLmpzIiwic3JjL0xheW91dC9MR3JhcGhNYW5hZ2VyLmpzIiwic3JjL0xheW91dC9MR3JhcGhPYmplY3QuanMiLCJzcmMvTGF5b3V0L0xOb2RlLmpzIiwic3JjL0xheW91dC9MYXlvdXQuanMiLCJzcmMvTGF5b3V0L0xheW91dENvbnN0YW50cy5qcyIsInNyYy9MYXlvdXQvUG9pbnQuanMiLCJzcmMvTGF5b3V0L1BvaW50RC5qcyIsInNyYy9MYXlvdXQvUmFuZG9tU2VlZC5qcyIsInNyYy9MYXlvdXQvUmVjdGFuZ2xlRC5qcyIsInNyYy9MYXlvdXQvVHJhbnNmb3JtLmpzIiwic3JjL0xheW91dC9VbmlxdWVJREdlbmVyZXRvci5qcyIsInNyYy9MYXlvdXQvaW5kZXguanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIG5zID0ge1xuXHRMaXN0OiByZXF1aXJlKCcuL3NyYy9MaXN0JyksXG5cdE5vZGU6IHJlcXVpcmUoJy4vc3JjL05vZGUnKSxcbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IG5zO1xufSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJykge1xuXHRkZWZpbmUoJ0xpbmtlZExpc3RKUycsIGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gbnM7XG5cdH0pO1xufSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHR3aW5kb3cuTGlua2VkTGlzdEpTID0gbnM7XG59IiwidmFyIE5vZGUgPSByZXF1aXJlKCcuL05vZGUnKTtcblxudmFyIExpc3QgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMuX2NvdW50ID0gMDtcblx0dGhpcy5faGVhZCA9IG51bGw7XG5cdHRoaXMuX3RhaWwgPSBudWxsO1xufTtcblxuTGlzdC5wcm90b3R5cGUuaGVhZCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHRoaXMuX2hlYWQ7XG59O1xuXG5MaXN0LnByb3RvdHlwZS50YWlsID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5fdGFpbDtcbn07XG5cbkxpc3QucHJvdG90eXBlLmNvdW50ID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5fY291bnQ7XG59O1xuXG5MaXN0LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcblx0dmFyIG5vZGUgPSB0aGlzLl9oZWFkO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXg7IGkrKykge1xuXHRcdG5vZGUgPSBub2RlLm5leHQoKTtcblx0fVxuXG5cdHJldHVybiBub2RlO1xufTtcblxuTGlzdC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xuXHR2YXIgbm9kZSA9IHRoaXMuZ2V0KGluZGV4KTtcblx0bm9kZS5zZXQodmFsdWUpO1xufTtcblxuTGlzdC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHR2YXIgbm9kZSA9IG5ldyBOb2RlKHZhbHVlLCB0aGlzLl90YWlsLCBudWxsKTtcblxuXHRpZiAodGhpcy5fdGFpbCAhPT0gbnVsbCkge1xuXHRcdHRoaXMuX3RhaWwuc2V0TmV4dChub2RlKTtcblx0fVxuXG5cdGlmICh0aGlzLl9oZWFkID09PSBudWxsKSB7XG5cdFx0dGhpcy5faGVhZCA9IG5vZGU7XG5cdH1cblxuXHR0aGlzLl90YWlsID0gbm9kZTtcblx0dGhpcy5fY291bnQrKztcblxuXHRyZXR1cm4gbm9kZTtcbn07XG5cbkxpc3QucHJvdG90eXBlLnBvcCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIG5vZGUgPSB0aGlzLl90YWlsO1xuXG5cdHZhciBuZXdfdGFpbCA9IG51bGw7XG5cdGlmICh0aGlzLl90YWlsLnByZXZpb3VzKCkgIT09IG51bGwpIHtcblx0XHRuZXdfdGFpbCA9IHRoaXMuX3RhaWwucHJldmlvdXMoKTtcblx0XHRuZXdfdGFpbC5zZXROZXh0KG51bGwpO1xuXHR9XG5cdFxuXHR0aGlzLl90YWlsID0gbmV3X3RhaWw7XG5cblx0dGhpcy5fY291bnQtLTtcblxuXHRpZiAodGhpcy5fY291bnQgPT09IDApIHtcblx0XHR0aGlzLl9oZWFkID0gbnVsbDtcblx0fVxuXG5cdHJldHVybiBub2RlO1xufTtcblxuTGlzdC5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHR2YXIgbm9kZSA9IG5ldyBOb2RlKHZhbHVlLCBudWxsLCB0aGlzLl9oZWFkKTtcblxuXHRpZiAodGhpcy5faGVhZCAhPT0gbnVsbCkge1xuXHRcdHRoaXMuX2hlYWQuc2V0UHJldmlvdXMobm9kZSk7XG5cdH1cblxuXHRpZiAodGhpcy5fdGFpbCA9PT0gbnVsbCkge1xuXHRcdHRoaXMuX3RhaWwgPSBub2RlO1xuXHR9XG5cdFxuXHR0aGlzLl9oZWFkID0gbm9kZTtcblxuXHR0aGlzLl9jb3VudCsrO1xuXG5cdHJldHVybiBub2RlO1xufTtcblxuTGlzdC5wcm90b3R5cGUuc2hpZnQgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBub2RlID0gdGhpcy5faGVhZDtcblxuXHR2YXIgbmV3X2hlYWQgPSBudWxsO1xuXHRpZiAodGhpcy5faGVhZC5uZXh0KCkgIT09IG51bGwpIHtcblx0XHRuZXdfaGVhZCA9IHRoaXMuX2hlYWQubmV4dCgpO1xuXHRcdG5ld19oZWFkLnNldFByZXZpb3VzKG51bGwpO1xuXHR9XG5cblx0dGhpcy5faGVhZCA9IG5ld19oZWFkO1xuXG5cdHRoaXMuX2NvdW50LS07XG5cblx0aWYgKHRoaXMuX2NvdW50ID09PSAwKSB7XG5cdFx0dGhpcy5fdGFpbCA9IG51bGw7XG5cdH1cblxuXHRyZXR1cm4gbm9kZTtcbn07XG5cbkxpc3QucHJvdG90eXBlLmFzQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBhcnIgPSBbXTtcblx0dmFyIG5vZGUgPSB0aGlzLl9oZWFkO1xuXG5cdHdoaWxlIChub2RlKSB7XG5cdFx0YXJyLnB1c2gobm9kZS52YWx1ZSgpKTtcblx0XHRub2RlID0gbm9kZS5uZXh0KCk7XG5cdH1cblxuXHRyZXR1cm4gYXJyO1xufTtcblxuTGlzdC5wcm90b3R5cGUudHJ1bmNhdGVUbyA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcblx0dGhpcy5fY291bnQgPSBsZW5ndGg7XG5cblx0aWYgKGxlbmd0aCA9PT0gMCkge1xuXHRcdHRoaXMuX2hlYWQgPSBudWxsO1xuXHRcdHRoaXMuX3RhaWwgPSBudWxsO1xuXG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIG5vZGUgPSB0aGlzLmdldChsZW5ndGgtMSk7XG5cdG5vZGUuc2V0TmV4dChudWxsKTtcblx0dGhpcy5fdGFpbCA9IG5vZGU7XG59O1xuXG5MaXN0LnByb3RvdHlwZS5lbXB0eSA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy50cnVuY2F0ZVRvKDApO1xufTtcblxuTGlzdC5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHRoaXMuX2hlYWQgPT09IG51bGw7XG59O1xuXG5MaXN0LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdHZhciBub2RlID0gdGhpcy5faGVhZDtcblxuXHR3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuXHRcdGlmIChub2RlLnZhbHVlKCkgPT09IHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRub2RlID0gbm9kZS5uZXh0KCk7XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbkxpc3QucHJvdG90eXBlLmVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0dmFyIG5vZGUgPSB0aGlzLl9oZWFkO1xuXHR2YXIgaSA9IDA7XG5cdHdoaWxlIChub2RlICE9PSBudWxsKSB7XG5cdFx0Y2FsbGJhY2soaSwgbm9kZSk7XG5cdFx0bm9kZSA9IG5vZGUubmV4dCgpO1xuXHRcdGkrKztcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3Q7IiwidmFyIE5vZGUgPSBmdW5jdGlvbiAodmFsdWUsIHByZXZpb3VzLCBuZXh0KSB7XG5cdHRoaXMuX3ZhbHVlID0gdmFsdWUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiB2YWx1ZTtcblx0XG5cdHRoaXMuX3ByZXZpb3VzID0gcHJldmlvdXMgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBwcmV2aW91cztcblx0dGhpcy5fbmV4dCA9IG5leHQgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBuZXh0O1xufTtcblxuTm9kZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLl92YWx1ZTtcbn07XG5cbk5vZGUucHJvdG90eXBlLnByZXZpb3VzID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5fcHJldmlvdXM7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5fbmV4dDtcbn07XG5cbk5vZGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHR0aGlzLl92YWx1ZSA9IHZhbHVlO1xufTtcblxuTm9kZS5wcm90b3R5cGUuc2V0UHJldmlvdXMgPSBmdW5jdGlvbiAobm9kZSkge1xuXHR0aGlzLl9wcmV2aW91cyA9IG5vZGU7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5zZXROZXh0ID0gZnVuY3Rpb24gKG5vZGUpIHtcblx0dGhpcy5fbmV4dCA9IG5vZGU7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5pc0hlYWQgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLl9wcmV2aW91cyA9PT0gbnVsbDtcbn07XG5cbk5vZGUucHJvdG90eXBlLmlzVGFpbCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHRoaXMuX25leHQgPT09IG51bGw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGU7IiwidmFyIEZETGF5b3V0Q29uc3RhbnRzID0gcmVxdWlyZSgnLi9GRExheW91dENvbnN0YW50cycpO1xuXG5mdW5jdGlvbiBDb1NFQ29uc3RhbnRzKCkge1xufVxuXG4vL0NvU0VDb25zdGFudHMgaW5oZXJpdHMgc3RhdGljIHByb3BzIGluIEZETGF5b3V0Q29uc3RhbnRzXG5mb3IgKHZhciBwcm9wIGluIEZETGF5b3V0Q29uc3RhbnRzKSB7XG4gIENvU0VDb25zdGFudHNbcHJvcF0gPSBGRExheW91dENvbnN0YW50c1twcm9wXTtcbn1cblxuQ29TRUNvbnN0YW50cy5ERUZBVUxUX1VTRV9NVUxUSV9MRVZFTF9TQ0FMSU5HID0gZmFsc2U7XG5Db1NFQ29uc3RhbnRzLkRFRkFVTFRfUkFESUFMX1NFUEFSQVRJT04gPSBGRExheW91dENvbnN0YW50cy5ERUZBVUxUX0VER0VfTEVOR1RIO1xuQ29TRUNvbnN0YW50cy5ERUZBVUxUX0NPTVBPTkVOVF9TRVBFUkFUSU9OID0gNjA7XG5Db1NFQ29uc3RhbnRzLlRJTEUgPSB0cnVlO1xuQ29TRUNvbnN0YW50cy5USUxJTkdfUEFERElOR19WRVJUSUNBTCA9IDEwO1xuQ29TRUNvbnN0YW50cy5USUxJTkdfUEFERElOR19IT1JJWk9OVEFMID0gMTA7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29TRUNvbnN0YW50cztcbiIsInZhciBGRExheW91dEVkZ2UgPSByZXF1aXJlKCcuL0ZETGF5b3V0RWRnZScpO1xuXG5mdW5jdGlvbiBDb1NFRWRnZShzb3VyY2UsIHRhcmdldCwgdkVkZ2UpIHtcbiAgRkRMYXlvdXRFZGdlLmNhbGwodGhpcywgc291cmNlLCB0YXJnZXQsIHZFZGdlKTtcbn1cblxuQ29TRUVkZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShGRExheW91dEVkZ2UucHJvdG90eXBlKTtcbmZvciAodmFyIHByb3AgaW4gRkRMYXlvdXRFZGdlKSB7XG4gIENvU0VFZGdlW3Byb3BdID0gRkRMYXlvdXRFZGdlW3Byb3BdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvU0VFZGdlXG4iLCJ2YXIgTEdyYXBoID0gcmVxdWlyZSgnLi9MR3JhcGgnKTtcblxuZnVuY3Rpb24gQ29TRUdyYXBoKHBhcmVudCwgZ3JhcGhNZ3IsIHZHcmFwaCkge1xuICBMR3JhcGguY2FsbCh0aGlzLCBwYXJlbnQsIGdyYXBoTWdyLCB2R3JhcGgpO1xufVxuXG5Db1NFR3JhcGgucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShMR3JhcGgucHJvdG90eXBlKTtcbmZvciAodmFyIHByb3AgaW4gTEdyYXBoKSB7XG4gIENvU0VHcmFwaFtwcm9wXSA9IExHcmFwaFtwcm9wXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb1NFR3JhcGg7XG4iLCJ2YXIgTEdyYXBoTWFuYWdlciA9IHJlcXVpcmUoJy4vTEdyYXBoTWFuYWdlcicpO1xuXG5mdW5jdGlvbiBDb1NFR3JhcGhNYW5hZ2VyKGxheW91dCkge1xuICBMR3JhcGhNYW5hZ2VyLmNhbGwodGhpcywgbGF5b3V0KTtcbn1cblxuQ29TRUdyYXBoTWFuYWdlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKExHcmFwaE1hbmFnZXIucHJvdG90eXBlKTtcbmZvciAodmFyIHByb3AgaW4gTEdyYXBoTWFuYWdlcikge1xuICBDb1NFR3JhcGhNYW5hZ2VyW3Byb3BdID0gTEdyYXBoTWFuYWdlcltwcm9wXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb1NFR3JhcGhNYW5hZ2VyO1xuIiwidmFyIEZETGF5b3V0ID0gcmVxdWlyZSgnLi9GRExheW91dCcpO1xudmFyIENvU0VHcmFwaE1hbmFnZXIgPSByZXF1aXJlKCcuL0NvU0VHcmFwaE1hbmFnZXInKTtcbnZhciBDb1NFR3JhcGggPSByZXF1aXJlKCcuL0NvU0VHcmFwaCcpO1xudmFyIENvU0VOb2RlID0gcmVxdWlyZSgnLi9Db1NFTm9kZScpO1xudmFyIENvU0VFZGdlID0gcmVxdWlyZSgnLi9Db1NFRWRnZScpO1xudmFyIENvU0VDb25zdGFudHMgPSByZXF1aXJlKCcuL0NvU0VDb25zdGFudHMnKTtcbnZhciBGRExheW91dENvbnN0YW50cyA9IHJlcXVpcmUoJy4vRkRMYXlvdXRDb25zdGFudHMnKTtcbnZhciBMYXlvdXRDb25zdGFudHMgPSByZXF1aXJlKCcuL0xheW91dENvbnN0YW50cycpO1xudmFyIFBvaW50ID0gcmVxdWlyZSgnLi9Qb2ludCcpO1xudmFyIFBvaW50RCA9IHJlcXVpcmUoJy4vUG9pbnREJyk7XG52YXIgTGF5b3V0ID0gcmVxdWlyZSgnLi9MYXlvdXQnKTtcbnZhciBJbnRlZ2VyID0gcmVxdWlyZSgnLi9JbnRlZ2VyJyk7XG52YXIgSUdlb21ldHJ5ID0gcmVxdWlyZSgnLi9JR2VvbWV0cnknKTtcbnZhciBMR3JhcGggPSByZXF1aXJlKCcuL0xHcmFwaCcpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vVHJhbnNmb3JtJyk7XG5cbmZ1bmN0aW9uIENvU0VMYXlvdXQoKSB7XG4gIEZETGF5b3V0LmNhbGwodGhpcyk7XG4gIFxuICB0aGlzLnRvQmVUaWxlZCA9IHt9OyAvLyBNZW1vcml6ZSBpZiBhIG5vZGUgaXMgdG8gYmUgdGlsZWQgb3IgaXMgdGlsZWRcbn1cblxuQ29TRUxheW91dC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEZETGF5b3V0LnByb3RvdHlwZSk7XG5cbmZvciAodmFyIHByb3AgaW4gRkRMYXlvdXQpIHtcbiAgQ29TRUxheW91dFtwcm9wXSA9IEZETGF5b3V0W3Byb3BdO1xufVxuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS5uZXdHcmFwaE1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBnbSA9IG5ldyBDb1NFR3JhcGhNYW5hZ2VyKHRoaXMpO1xuICB0aGlzLmdyYXBoTWFuYWdlciA9IGdtO1xuICByZXR1cm4gZ207XG59O1xuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS5uZXdHcmFwaCA9IGZ1bmN0aW9uICh2R3JhcGgpIHtcbiAgcmV0dXJuIG5ldyBDb1NFR3JhcGgobnVsbCwgdGhpcy5ncmFwaE1hbmFnZXIsIHZHcmFwaCk7XG59O1xuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS5uZXdOb2RlID0gZnVuY3Rpb24gKHZOb2RlKSB7XG4gIHJldHVybiBuZXcgQ29TRU5vZGUodGhpcy5ncmFwaE1hbmFnZXIsIHZOb2RlKTtcbn07XG5cbkNvU0VMYXlvdXQucHJvdG90eXBlLm5ld0VkZ2UgPSBmdW5jdGlvbiAodkVkZ2UpIHtcbiAgcmV0dXJuIG5ldyBDb1NFRWRnZShudWxsLCBudWxsLCB2RWRnZSk7XG59O1xuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS5pbml0UGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgRkRMYXlvdXQucHJvdG90eXBlLmluaXRQYXJhbWV0ZXJzLmNhbGwodGhpcywgYXJndW1lbnRzKTtcbiAgaWYgKCF0aGlzLmlzU3ViTGF5b3V0KSB7XG4gICAgaWYgKENvU0VDb25zdGFudHMuREVGQVVMVF9FREdFX0xFTkdUSCA8IDEwKVxuICAgIHtcbiAgICAgIHRoaXMuaWRlYWxFZGdlTGVuZ3RoID0gMTA7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICB0aGlzLmlkZWFsRWRnZUxlbmd0aCA9IENvU0VDb25zdGFudHMuREVGQVVMVF9FREdFX0xFTkdUSDtcbiAgICB9XG5cbiAgICB0aGlzLnVzZVNtYXJ0SWRlYWxFZGdlTGVuZ3RoQ2FsY3VsYXRpb24gPVxuICAgICAgICAgICAgQ29TRUNvbnN0YW50cy5ERUZBVUxUX1VTRV9TTUFSVF9JREVBTF9FREdFX0xFTkdUSF9DQUxDVUxBVElPTjtcbiAgICB0aGlzLnNwcmluZ0NvbnN0YW50ID1cbiAgICAgICAgICAgIEZETGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfU1BSSU5HX1NUUkVOR1RIO1xuICAgIHRoaXMucmVwdWxzaW9uQ29uc3RhbnQgPVxuICAgICAgICAgICAgRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9SRVBVTFNJT05fU1RSRU5HVEg7XG4gICAgdGhpcy5ncmF2aXR5Q29uc3RhbnQgPVxuICAgICAgICAgICAgRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9HUkFWSVRZX1NUUkVOR1RIO1xuICAgIHRoaXMuY29tcG91bmRHcmF2aXR5Q29uc3RhbnQgPVxuICAgICAgICAgICAgRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9DT01QT1VORF9HUkFWSVRZX1NUUkVOR1RIO1xuICAgIHRoaXMuZ3Jhdml0eVJhbmdlRmFjdG9yID1cbiAgICAgICAgICAgIEZETGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfR1JBVklUWV9SQU5HRV9GQUNUT1I7XG4gICAgdGhpcy5jb21wb3VuZEdyYXZpdHlSYW5nZUZhY3RvciA9XG4gICAgICAgICAgICBGRExheW91dENvbnN0YW50cy5ERUZBVUxUX0NPTVBPVU5EX0dSQVZJVFlfUkFOR0VfRkFDVE9SO1xuICB9XG59O1xuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS5sYXlvdXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjcmVhdGVCZW5kc0FzTmVlZGVkID0gTGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfQ1JFQVRFX0JFTkRTX0FTX05FRURFRDtcbiAgaWYgKGNyZWF0ZUJlbmRzQXNOZWVkZWQpXG4gIHtcbiAgICB0aGlzLmNyZWF0ZUJlbmRwb2ludHMoKTtcbiAgICB0aGlzLmdyYXBoTWFuYWdlci5yZXNldEFsbEVkZ2VzKCk7XG4gIH1cblxuICB0aGlzLmxldmVsID0gMDtcbiAgcmV0dXJuIHRoaXMuY2xhc3NpY0xheW91dCgpO1xufTtcblxuQ29TRUxheW91dC5wcm90b3R5cGUuY2xhc3NpY0xheW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jYWxjdWxhdGVOb2Rlc1RvQXBwbHlHcmF2aXRhdGlvblRvKCk7XG4gIHRoaXMuY2FsY05vT2ZDaGlsZHJlbkZvckFsbE5vZGVzKCk7XG4gIHRoaXMuZ3JhcGhNYW5hZ2VyLmNhbGNMb3dlc3RDb21tb25BbmNlc3RvcnMoKTtcbiAgdGhpcy5ncmFwaE1hbmFnZXIuY2FsY0luY2x1c2lvblRyZWVEZXB0aHMoKTtcbiAgdGhpcy5ncmFwaE1hbmFnZXIuZ2V0Um9vdCgpLmNhbGNFc3RpbWF0ZWRTaXplKCk7XG4gIHRoaXMuY2FsY0lkZWFsRWRnZUxlbmd0aHMoKTtcbiAgXG4gIGlmICghdGhpcy5pbmNyZW1lbnRhbClcbiAge1xuICAgIHZhciBmb3Jlc3QgPSB0aGlzLmdldEZsYXRGb3Jlc3QoKTtcblxuICAgIC8vIFRoZSBncmFwaCBhc3NvY2lhdGVkIHdpdGggdGhpcyBsYXlvdXQgaXMgZmxhdCBhbmQgYSBmb3Jlc3RcbiAgICBpZiAoZm9yZXN0Lmxlbmd0aCA+IDApXG4gICAge1xuICAgICAgdGhpcy5wb3NpdGlvbk5vZGVzUmFkaWFsbHkoZm9yZXN0KTtcbiAgICB9XG4gICAgLy8gVGhlIGdyYXBoIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGxheW91dCBpcyBub3QgZmxhdCBvciBhIGZvcmVzdFxuICAgIGVsc2VcbiAgICB7XG4gICAgICAvLyBSZWR1Y2UgdGhlIHRyZWVzIHdoZW4gaW5jcmVtZW50YWwgbW9kZSBpcyBub3QgZW5hYmxlZCBhbmQgZ3JhcGggaXMgbm90IGEgZm9yZXN0IFxuICAgICAgdGhpcy5yZWR1Y2VUcmVlcygpO1xuICAgICAgdGhpcy5wb3NpdGlvbk5vZGVzUmFuZG9tbHkoKTtcbiAgICB9XG4gIH1cblxuICB0aGlzLmluaXRTcHJpbmdFbWJlZGRlcigpO1xuICB0aGlzLnJ1blNwcmluZ0VtYmVkZGVyKCk7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS50aWNrID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMudG90YWxJdGVyYXRpb25zKys7XG4gIFxuICBpZiAodGhpcy50b3RhbEl0ZXJhdGlvbnMgPT09IHRoaXMubWF4SXRlcmF0aW9ucyAmJiAhdGhpcy5pc1RyZWVHcm93aW5nICYmICF0aGlzLmlzR3Jvd3RoRmluaXNoZWQpIHtcbiAgICBpZih0aGlzLnBydW5lZE5vZGVzQWxsLmxlbmd0aCA+IDApe1xuICAgICAgdGhpcy5pc1RyZWVHcm93aW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTsgIFxuICAgIH1cbiAgfVxuICBcbiAgaWYgKHRoaXMudG90YWxJdGVyYXRpb25zICUgRkRMYXlvdXRDb25zdGFudHMuQ09OVkVSR0VOQ0VfQ0hFQ0tfUEVSSU9EID09IDAgICYmICF0aGlzLmlzVHJlZUdyb3dpbmcgJiYgIXRoaXMuaXNHcm93dGhGaW5pc2hlZClcbiAge1xuICAgIGlmICh0aGlzLmlzQ29udmVyZ2VkKCkpXG4gICAge1xuICAgICAgaWYodGhpcy5wcnVuZWROb2Rlc0FsbC5sZW5ndGggPiAwKXtcbiAgICAgICAgdGhpcy5pc1RyZWVHcm93aW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZTsgIFxuICAgICAgfSBcbiAgICB9XG5cbiAgICB0aGlzLmNvb2xpbmdGYWN0b3IgPSB0aGlzLmluaXRpYWxDb29saW5nRmFjdG9yICpcbiAgICAgICAgICAgICgodGhpcy5tYXhJdGVyYXRpb25zIC0gdGhpcy50b3RhbEl0ZXJhdGlvbnMpIC8gdGhpcy5tYXhJdGVyYXRpb25zKTtcbiAgICB0aGlzLmFuaW1hdGlvblBlcmlvZCA9IE1hdGguY2VpbCh0aGlzLmluaXRpYWxBbmltYXRpb25QZXJpb2QgKiBNYXRoLnNxcnQodGhpcy5jb29saW5nRmFjdG9yKSk7XG4gIH1cbiAgLy8gT3BlcmF0aW9ucyB3aGlsZSB0cmVlIGlzIGdyb3dpbmcgYWdhaW4gXG4gIGlmKHRoaXMuaXNUcmVlR3Jvd2luZyl7XG4gICAgaWYodGhpcy5ncm93VHJlZUl0ZXJhdGlvbnMgJSAxMCA9PSAwKXtcbiAgICAgIGlmKHRoaXMucHJ1bmVkTm9kZXNBbGwubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmdyYXBoTWFuYWdlci51cGRhdGVCb3VuZHMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVHcmlkKCk7XG4gICAgICAgIHRoaXMuZ3Jvd1RyZWUodGhpcy5wcnVuZWROb2Rlc0FsbCwgdGhpcy5pc0ZpcnN0R3Jvd3RoKTtcbiAgICAgICAgdGhpcy5ncmFwaE1hbmFnZXIudXBkYXRlQm91bmRzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlR3JpZCgpOyBcbiAgICAgICAgdGhpcy5jb29saW5nRmFjdG9yID0gRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9DT09MSU5HX0ZBQ1RPUl9JTkNSRU1FTlRBTDsgXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5pc1RyZWVHcm93aW5nID0gZmFsc2U7ICBcbiAgICAgICAgdGhpcy5pc0dyb3d0aEZpbmlzaGVkID0gdHJ1ZTsgXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZ3Jvd1RyZWVJdGVyYXRpb25zKys7XG4gIH1cbiAgLy8gT3BlcmF0aW9ucyBhZnRlciBncm93dGggaXMgZmluaXNoZWRcbiAgaWYodGhpcy5pc0dyb3d0aEZpbmlzaGVkKXtcbiAgICBpZiAodGhpcy5pc0NvbnZlcmdlZCgpKVxuICAgIHtcbiAgICAgIHJldHVybiB0cnVlOyAgXG4gICAgfVxuICAgIGlmKHRoaXMuYWZ0ZXJHcm93dGhJdGVyYXRpb25zICUgMTAgPT0gMCl7XG4gICAgICB0aGlzLmdyYXBoTWFuYWdlci51cGRhdGVCb3VuZHMoKTtcbiAgICAgIHRoaXMudXBkYXRlR3JpZCgpOyBcbiAgICB9XG4gICAgdGhpcy5jb29saW5nRmFjdG9yID0gRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9DT09MSU5HX0ZBQ1RPUl9JTkNSRU1FTlRBTCAqICgoMTAwIC0gdGhpcy5hZnRlckdyb3d0aEl0ZXJhdGlvbnMpIC8gMTAwKTtcbiAgICB0aGlzLmFmdGVyR3Jvd3RoSXRlcmF0aW9ucysrO1xuICB9XG4gIFxuICB0aGlzLnRvdGFsRGlzcGxhY2VtZW50ID0gMDtcbiAgdGhpcy5ncmFwaE1hbmFnZXIudXBkYXRlQm91bmRzKCk7XG4gIHRoaXMuY2FsY1NwcmluZ0ZvcmNlcygpO1xuICB0aGlzLmNhbGNSZXB1bHNpb25Gb3JjZXMoKTtcbiAgdGhpcy5jYWxjR3Jhdml0YXRpb25hbEZvcmNlcygpO1xuICB0aGlzLm1vdmVOb2RlcygpO1xuICB0aGlzLmFuaW1hdGUoKTtcbiAgXG4gIHJldHVybiBmYWxzZTsgLy8gTGF5b3V0IGlzIG5vdCBlbmRlZCB5ZXQgcmV0dXJuIGZhbHNlXG59O1xuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS5nZXRQb3NpdGlvbnNEYXRhID0gZnVuY3Rpb24oKSB7XG4gIHZhciBhbGxOb2RlcyA9IHRoaXMuZ3JhcGhNYW5hZ2VyLmdldEFsbE5vZGVzKCk7XG4gIHZhciBwRGF0YSA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHJlY3QgPSBhbGxOb2Rlc1tpXS5yZWN0O1xuICAgIHZhciBpZCA9IGFsbE5vZGVzW2ldLmlkO1xuICAgIHBEYXRhW2lkXSA9IHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIHg6IHJlY3QuZ2V0Q2VudGVyWCgpLFxuICAgICAgeTogcmVjdC5nZXRDZW50ZXJZKCksXG4gICAgICB3OiByZWN0LndpZHRoLFxuICAgICAgaDogcmVjdC5oZWlnaHRcbiAgICB9O1xuICB9XG4gIFxuICByZXR1cm4gcERhdGE7XG59O1xuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS5ydW5TcHJpbmdFbWJlZGRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5pbml0aWFsQW5pbWF0aW9uUGVyaW9kID0gMjU7XG4gIHRoaXMuYW5pbWF0aW9uUGVyaW9kID0gdGhpcy5pbml0aWFsQW5pbWF0aW9uUGVyaW9kO1xuICB2YXIgbGF5b3V0RW5kZWQgPSBmYWxzZTtcbiAgXG4gIC8vIElmIGFtaW5hdGUgb3B0aW9uIGlzICdkdXJpbmcnIHNpZ25hbCB0aGF0IGxheW91dCBpcyBzdXBwb3NlZCB0byBzdGFydCBpdGVyYXRpbmdcbiAgaWYgKCBGRExheW91dENvbnN0YW50cy5BTklNQVRFID09PSAnZHVyaW5nJyApIHtcbiAgICB0aGlzLmVtaXQoJ2xheW91dHN0YXJ0ZWQnKTtcbiAgfVxuICBlbHNlIHtcbiAgICAvLyBJZiBhbWluYXRlIG9wdGlvbiBpcyAnZHVyaW5nJyB0aWNrKCkgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgb24gaW5kZXguanNcbiAgICB3aGlsZSAoIWxheW91dEVuZGVkKSB7XG4gICAgICBsYXlvdXRFbmRlZCA9IHRoaXMudGljaygpO1xuICAgIH1cblxuICAgIHRoaXMuZ3JhcGhNYW5hZ2VyLnVwZGF0ZUJvdW5kcygpO1xuICB9XG59O1xuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS5jYWxjdWxhdGVOb2Rlc1RvQXBwbHlHcmF2aXRhdGlvblRvID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbm9kZUxpc3QgPSBbXTtcbiAgdmFyIGdyYXBoO1xuXG4gIHZhciBncmFwaHMgPSB0aGlzLmdyYXBoTWFuYWdlci5nZXRHcmFwaHMoKTtcbiAgdmFyIHNpemUgPSBncmFwaHMubGVuZ3RoO1xuICB2YXIgaTtcbiAgZm9yIChpID0gMDsgaSA8IHNpemU7IGkrKylcbiAge1xuICAgIGdyYXBoID0gZ3JhcGhzW2ldO1xuXG4gICAgZ3JhcGgudXBkYXRlQ29ubmVjdGVkKCk7XG5cbiAgICBpZiAoIWdyYXBoLmlzQ29ubmVjdGVkKVxuICAgIHtcbiAgICAgIG5vZGVMaXN0ID0gbm9kZUxpc3QuY29uY2F0KGdyYXBoLmdldE5vZGVzKCkpO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuZ3JhcGhNYW5hZ2VyLnNldEFsbE5vZGVzVG9BcHBseUdyYXZpdGF0aW9uKG5vZGVMaXN0KTtcbn07XG5cbkNvU0VMYXlvdXQucHJvdG90eXBlLmNhbGNOb09mQ2hpbGRyZW5Gb3JBbGxOb2RlcyA9IGZ1bmN0aW9uICgpXG57XG4gIHZhciBub2RlO1xuICB2YXIgYWxsTm9kZXMgPSB0aGlzLmdyYXBoTWFuYWdlci5nZXRBbGxOb2RlcygpO1xuICBcbiAgZm9yKHZhciBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKVxuICB7XG4gICAgICBub2RlID0gYWxsTm9kZXNbaV07XG4gICAgICBub2RlLm5vT2ZDaGlsZHJlbiA9IG5vZGUuZ2V0Tm9PZkNoaWxkcmVuKCk7XG4gIH1cbn07XG5cbkNvU0VMYXlvdXQucHJvdG90eXBlLmNyZWF0ZUJlbmRwb2ludHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBlZGdlcyA9IFtdO1xuICBlZGdlcyA9IGVkZ2VzLmNvbmNhdCh0aGlzLmdyYXBoTWFuYWdlci5nZXRBbGxFZGdlcygpKTtcbiAgdmFyIHZpc2l0ZWQgPSBuZXcgSGFzaFNldCgpO1xuICB2YXIgaTtcbiAgZm9yIChpID0gMDsgaSA8IGVkZ2VzLmxlbmd0aDsgaSsrKVxuICB7XG4gICAgdmFyIGVkZ2UgPSBlZGdlc1tpXTtcblxuICAgIGlmICghdmlzaXRlZC5jb250YWlucyhlZGdlKSlcbiAgICB7XG4gICAgICB2YXIgc291cmNlID0gZWRnZS5nZXRTb3VyY2UoKTtcbiAgICAgIHZhciB0YXJnZXQgPSBlZGdlLmdldFRhcmdldCgpO1xuXG4gICAgICBpZiAoc291cmNlID09IHRhcmdldClcbiAgICAgIHtcbiAgICAgICAgZWRnZS5nZXRCZW5kcG9pbnRzKCkucHVzaChuZXcgUG9pbnREKCkpO1xuICAgICAgICBlZGdlLmdldEJlbmRwb2ludHMoKS5wdXNoKG5ldyBQb2ludEQoKSk7XG4gICAgICAgIHRoaXMuY3JlYXRlRHVtbXlOb2Rlc0ZvckJlbmRwb2ludHMoZWRnZSk7XG4gICAgICAgIHZpc2l0ZWQuYWRkKGVkZ2UpO1xuICAgICAgfVxuICAgICAgZWxzZVxuICAgICAge1xuICAgICAgICB2YXIgZWRnZUxpc3QgPSBbXTtcblxuICAgICAgICBlZGdlTGlzdCA9IGVkZ2VMaXN0LmNvbmNhdChzb3VyY2UuZ2V0RWRnZUxpc3RUb05vZGUodGFyZ2V0KSk7XG4gICAgICAgIGVkZ2VMaXN0ID0gZWRnZUxpc3QuY29uY2F0KHRhcmdldC5nZXRFZGdlTGlzdFRvTm9kZShzb3VyY2UpKTtcblxuICAgICAgICBpZiAoIXZpc2l0ZWQuY29udGFpbnMoZWRnZUxpc3RbMF0pKVxuICAgICAgICB7XG4gICAgICAgICAgaWYgKGVkZ2VMaXN0Lmxlbmd0aCA+IDEpXG4gICAgICAgICAge1xuICAgICAgICAgICAgdmFyIGs7XG4gICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgZWRnZUxpc3QubGVuZ3RoOyBrKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhciBtdWx0aUVkZ2UgPSBlZGdlTGlzdFtrXTtcbiAgICAgICAgICAgICAgbXVsdGlFZGdlLmdldEJlbmRwb2ludHMoKS5wdXNoKG5ldyBQb2ludEQoKSk7XG4gICAgICAgICAgICAgIHRoaXMuY3JlYXRlRHVtbXlOb2Rlc0ZvckJlbmRwb2ludHMobXVsdGlFZGdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdmlzaXRlZC5hZGRBbGwobGlzdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodmlzaXRlZC5zaXplKCkgPT0gZWRnZXMubGVuZ3RoKVxuICAgIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufTtcblxuQ29TRUxheW91dC5wcm90b3R5cGUucG9zaXRpb25Ob2Rlc1JhZGlhbGx5ID0gZnVuY3Rpb24gKGZvcmVzdCkge1xuICAvLyBXZSB0aWxlIHRoZSB0cmVlcyB0byBhIGdyaWQgcm93IGJ5IHJvdzsgZmlyc3QgdHJlZSBzdGFydHMgYXQgKDAsMClcbiAgdmFyIGN1cnJlbnRTdGFydGluZ1BvaW50ID0gbmV3IFBvaW50KDAsIDApO1xuICB2YXIgbnVtYmVyT2ZDb2x1bW5zID0gTWF0aC5jZWlsKE1hdGguc3FydChmb3Jlc3QubGVuZ3RoKSk7XG4gIHZhciBoZWlnaHQgPSAwO1xuICB2YXIgY3VycmVudFkgPSAwO1xuICB2YXIgY3VycmVudFggPSAwO1xuICB2YXIgcG9pbnQgPSBuZXcgUG9pbnREKDAsIDApO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZm9yZXN0Lmxlbmd0aDsgaSsrKVxuICB7XG4gICAgaWYgKGkgJSBudW1iZXJPZkNvbHVtbnMgPT0gMClcbiAgICB7XG4gICAgICAvLyBTdGFydCBvZiBhIG5ldyByb3csIG1ha2UgdGhlIHggY29vcmRpbmF0ZSAwLCBpbmNyZW1lbnQgdGhlXG4gICAgICAvLyB5IGNvb3JkaW5hdGUgd2l0aCB0aGUgbWF4IGhlaWdodCBvZiB0aGUgcHJldmlvdXMgcm93XG4gICAgICBjdXJyZW50WCA9IDA7XG4gICAgICBjdXJyZW50WSA9IGhlaWdodDtcblxuICAgICAgaWYgKGkgIT0gMClcbiAgICAgIHtcbiAgICAgICAgY3VycmVudFkgKz0gQ29TRUNvbnN0YW50cy5ERUZBVUxUX0NPTVBPTkVOVF9TRVBFUkFUSU9OO1xuICAgICAgfVxuXG4gICAgICBoZWlnaHQgPSAwO1xuICAgIH1cblxuICAgIHZhciB0cmVlID0gZm9yZXN0W2ldO1xuXG4gICAgLy8gRmluZCB0aGUgY2VudGVyIG9mIHRoZSB0cmVlXG4gICAgdmFyIGNlbnRlck5vZGUgPSBMYXlvdXQuZmluZENlbnRlck9mVHJlZSh0cmVlKTtcblxuICAgIC8vIFNldCB0aGUgc3RhcmluZyBwb2ludCBvZiB0aGUgbmV4dCB0cmVlXG4gICAgY3VycmVudFN0YXJ0aW5nUG9pbnQueCA9IGN1cnJlbnRYO1xuICAgIGN1cnJlbnRTdGFydGluZ1BvaW50LnkgPSBjdXJyZW50WTtcblxuICAgIC8vIERvIGEgcmFkaWFsIGxheW91dCBzdGFydGluZyB3aXRoIHRoZSBjZW50ZXJcbiAgICBwb2ludCA9XG4gICAgICAgICAgICBDb1NFTGF5b3V0LnJhZGlhbExheW91dCh0cmVlLCBjZW50ZXJOb2RlLCBjdXJyZW50U3RhcnRpbmdQb2ludCk7XG5cbiAgICBpZiAocG9pbnQueSA+IGhlaWdodClcbiAgICB7XG4gICAgICBoZWlnaHQgPSBNYXRoLmZsb29yKHBvaW50LnkpO1xuICAgIH1cblxuICAgIGN1cnJlbnRYID0gTWF0aC5mbG9vcihwb2ludC54ICsgQ29TRUNvbnN0YW50cy5ERUZBVUxUX0NPTVBPTkVOVF9TRVBFUkFUSU9OKTtcbiAgfVxuXG4gIHRoaXMudHJhbnNmb3JtKFxuICAgICAgICAgIG5ldyBQb2ludEQoTGF5b3V0Q29uc3RhbnRzLldPUkxEX0NFTlRFUl9YIC0gcG9pbnQueCAvIDIsXG4gICAgICAgICAgICAgICAgICBMYXlvdXRDb25zdGFudHMuV09STERfQ0VOVEVSX1kgLSBwb2ludC55IC8gMikpO1xufTtcblxuQ29TRUxheW91dC5yYWRpYWxMYXlvdXQgPSBmdW5jdGlvbiAodHJlZSwgY2VudGVyTm9kZSwgc3RhcnRpbmdQb2ludCkge1xuICB2YXIgcmFkaWFsU2VwID0gTWF0aC5tYXgodGhpcy5tYXhEaWFnb25hbEluVHJlZSh0cmVlKSxcbiAgICAgICAgICBDb1NFQ29uc3RhbnRzLkRFRkFVTFRfUkFESUFMX1NFUEFSQVRJT04pO1xuICBDb1NFTGF5b3V0LmJyYW5jaFJhZGlhbExheW91dChjZW50ZXJOb2RlLCBudWxsLCAwLCAzNTksIDAsIHJhZGlhbFNlcCk7XG4gIHZhciBib3VuZHMgPSBMR3JhcGguY2FsY3VsYXRlQm91bmRzKHRyZWUpO1xuXG4gIHZhciB0cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKCk7XG4gIHRyYW5zZm9ybS5zZXREZXZpY2VPcmdYKGJvdW5kcy5nZXRNaW5YKCkpO1xuICB0cmFuc2Zvcm0uc2V0RGV2aWNlT3JnWShib3VuZHMuZ2V0TWluWSgpKTtcbiAgdHJhbnNmb3JtLnNldFdvcmxkT3JnWChzdGFydGluZ1BvaW50LngpO1xuICB0cmFuc2Zvcm0uc2V0V29ybGRPcmdZKHN0YXJ0aW5nUG9pbnQueSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlLmxlbmd0aDsgaSsrKVxuICB7XG4gICAgdmFyIG5vZGUgPSB0cmVlW2ldO1xuICAgIG5vZGUudHJhbnNmb3JtKHRyYW5zZm9ybSk7XG4gIH1cblxuICB2YXIgYm90dG9tUmlnaHQgPVxuICAgICAgICAgIG5ldyBQb2ludEQoYm91bmRzLmdldE1heFgoKSwgYm91bmRzLmdldE1heFkoKSk7XG5cbiAgcmV0dXJuIHRyYW5zZm9ybS5pbnZlcnNlVHJhbnNmb3JtUG9pbnQoYm90dG9tUmlnaHQpO1xufTtcblxuQ29TRUxheW91dC5icmFuY2hSYWRpYWxMYXlvdXQgPSBmdW5jdGlvbiAobm9kZSwgcGFyZW50T2ZOb2RlLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgZGlzdGFuY2UsIHJhZGlhbFNlcGFyYXRpb24pIHtcbiAgLy8gRmlyc3QsIHBvc2l0aW9uIHRoaXMgbm9kZSBieSBmaW5kaW5nIGl0cyBhbmdsZS5cbiAgdmFyIGhhbGZJbnRlcnZhbCA9ICgoZW5kQW5nbGUgLSBzdGFydEFuZ2xlKSArIDEpIC8gMjtcblxuICBpZiAoaGFsZkludGVydmFsIDwgMClcbiAge1xuICAgIGhhbGZJbnRlcnZhbCArPSAxODA7XG4gIH1cblxuICB2YXIgbm9kZUFuZ2xlID0gKGhhbGZJbnRlcnZhbCArIHN0YXJ0QW5nbGUpICUgMzYwO1xuICB2YXIgdGV0YSA9IChub2RlQW5nbGUgKiBJR2VvbWV0cnkuVFdPX1BJKSAvIDM2MDtcblxuICAvLyBNYWtlIHBvbGFyIHRvIGphdmEgY29yZGluYXRlIGNvbnZlcnNpb24uXG4gIHZhciBjb3NfdGV0YSA9IE1hdGguY29zKHRldGEpO1xuICB2YXIgeF8gPSBkaXN0YW5jZSAqIE1hdGguY29zKHRldGEpO1xuICB2YXIgeV8gPSBkaXN0YW5jZSAqIE1hdGguc2luKHRldGEpO1xuXG4gIG5vZGUuc2V0Q2VudGVyKHhfLCB5Xyk7XG5cbiAgLy8gVHJhdmVyc2UgYWxsIG5laWdoYm9ycyBvZiB0aGlzIG5vZGUgYW5kIHJlY3Vyc2l2ZWx5IGNhbGwgdGhpc1xuICAvLyBmdW5jdGlvbi5cbiAgdmFyIG5laWdoYm9yRWRnZXMgPSBbXTtcbiAgbmVpZ2hib3JFZGdlcyA9IG5laWdoYm9yRWRnZXMuY29uY2F0KG5vZGUuZ2V0RWRnZXMoKSk7XG4gIHZhciBjaGlsZENvdW50ID0gbmVpZ2hib3JFZGdlcy5sZW5ndGg7XG5cbiAgaWYgKHBhcmVudE9mTm9kZSAhPSBudWxsKVxuICB7XG4gICAgY2hpbGRDb3VudC0tO1xuICB9XG5cbiAgdmFyIGJyYW5jaENvdW50ID0gMDtcblxuICB2YXIgaW5jRWRnZXNDb3VudCA9IG5laWdoYm9yRWRnZXMubGVuZ3RoO1xuICB2YXIgc3RhcnRJbmRleDtcblxuICB2YXIgZWRnZXMgPSBub2RlLmdldEVkZ2VzQmV0d2VlbihwYXJlbnRPZk5vZGUpO1xuXG4gIC8vIElmIHRoZXJlIGFyZSBtdWx0aXBsZSBlZGdlcywgcHJ1bmUgdGhlbSB1bnRpbCB0aGVyZSByZW1haW5zIG9ubHkgb25lXG4gIC8vIGVkZ2UuXG4gIHdoaWxlIChlZGdlcy5sZW5ndGggPiAxKVxuICB7XG4gICAgLy9uZWlnaGJvckVkZ2VzLnJlbW92ZShlZGdlcy5yZW1vdmUoMCkpO1xuICAgIHZhciB0ZW1wID0gZWRnZXNbMF07XG4gICAgZWRnZXMuc3BsaWNlKDAsIDEpO1xuICAgIHZhciBpbmRleCA9IG5laWdoYm9yRWRnZXMuaW5kZXhPZih0ZW1wKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgbmVpZ2hib3JFZGdlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBpbmNFZGdlc0NvdW50LS07XG4gICAgY2hpbGRDb3VudC0tO1xuICB9XG5cbiAgaWYgKHBhcmVudE9mTm9kZSAhPSBudWxsKVxuICB7XG4gICAgLy9hc3NlcnQgZWRnZXMubGVuZ3RoID09IDE7XG4gICAgc3RhcnRJbmRleCA9IChuZWlnaGJvckVkZ2VzLmluZGV4T2YoZWRnZXNbMF0pICsgMSkgJSBpbmNFZGdlc0NvdW50O1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHN0YXJ0SW5kZXggPSAwO1xuICB9XG5cbiAgdmFyIHN0ZXBBbmdsZSA9IE1hdGguYWJzKGVuZEFuZ2xlIC0gc3RhcnRBbmdsZSkgLyBjaGlsZENvdW50O1xuXG4gIGZvciAodmFyIGkgPSBzdGFydEluZGV4O1xuICAgICAgICAgIGJyYW5jaENvdW50ICE9IGNoaWxkQ291bnQ7XG4gICAgICAgICAgaSA9ICgrK2kpICUgaW5jRWRnZXNDb3VudClcbiAge1xuICAgIHZhciBjdXJyZW50TmVpZ2hib3IgPVxuICAgICAgICAgICAgbmVpZ2hib3JFZGdlc1tpXS5nZXRPdGhlckVuZChub2RlKTtcblxuICAgIC8vIERvbid0IGJhY2sgdHJhdmVyc2UgdG8gcm9vdCBub2RlIGluIGN1cnJlbnQgdHJlZS5cbiAgICBpZiAoY3VycmVudE5laWdoYm9yID09IHBhcmVudE9mTm9kZSlcbiAgICB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgY2hpbGRTdGFydEFuZ2xlID1cbiAgICAgICAgICAgIChzdGFydEFuZ2xlICsgYnJhbmNoQ291bnQgKiBzdGVwQW5nbGUpICUgMzYwO1xuICAgIHZhciBjaGlsZEVuZEFuZ2xlID0gKGNoaWxkU3RhcnRBbmdsZSArIHN0ZXBBbmdsZSkgJSAzNjA7XG5cbiAgICBDb1NFTGF5b3V0LmJyYW5jaFJhZGlhbExheW91dChjdXJyZW50TmVpZ2hib3IsXG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgY2hpbGRTdGFydEFuZ2xlLCBjaGlsZEVuZEFuZ2xlLFxuICAgICAgICAgICAgZGlzdGFuY2UgKyByYWRpYWxTZXBhcmF0aW9uLCByYWRpYWxTZXBhcmF0aW9uKTtcblxuICAgIGJyYW5jaENvdW50Kys7XG4gIH1cbn07XG5cbkNvU0VMYXlvdXQubWF4RGlhZ29uYWxJblRyZWUgPSBmdW5jdGlvbiAodHJlZSkge1xuICB2YXIgbWF4RGlhZ29uYWwgPSBJbnRlZ2VyLk1JTl9WQUxVRTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRyZWUubGVuZ3RoOyBpKyspXG4gIHtcbiAgICB2YXIgbm9kZSA9IHRyZWVbaV07XG4gICAgdmFyIGRpYWdvbmFsID0gbm9kZS5nZXREaWFnb25hbCgpO1xuXG4gICAgaWYgKGRpYWdvbmFsID4gbWF4RGlhZ29uYWwpXG4gICAge1xuICAgICAgbWF4RGlhZ29uYWwgPSBkaWFnb25hbDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWF4RGlhZ29uYWw7XG59O1xuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS5jYWxjUmVwdWxzaW9uUmFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIGZvcm11bGEgaXMgMiB4IChsZXZlbCArIDEpIHggaWRlYWxFZGdlTGVuZ3RoXG4gIHJldHVybiAoMiAqICh0aGlzLmxldmVsICsgMSkgKiB0aGlzLmlkZWFsRWRnZUxlbmd0aCk7XG59O1xuXG4vLyBUaWxpbmcgbWV0aG9kc1xuXG4vLyBHcm91cCB6ZXJvIGRlZ3JlZSBtZW1iZXJzIHdob3NlIHBhcmVudHMgYXJlIG5vdCB0byBiZSB0aWxlZCwgY3JlYXRlIGR1bW15IHBhcmVudHMgd2hlcmUgbmVlZGVkIGFuZCBmaWxsIG1lbWJlckdyb3VwcyBieSB0aGVpciBkdW1tcCBwYXJlbnQgaWQnc1xuQ29TRUxheW91dC5wcm90b3R5cGUuZ3JvdXBaZXJvRGVncmVlTWVtYmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICAvLyBhcnJheSBvZiBbcGFyZW50X2lkIHggb25lRGVncmVlTm9kZV9pZF1cbiAgdmFyIHRlbXBNZW1iZXJHcm91cHMgPSB7fTsgLy8gQSB0ZW1wb3JhcnkgbWFwIG9mIHBhcmVudCBub2RlIGFuZCBpdHMgemVybyBkZWdyZWUgbWVtYmVyc1xuICB0aGlzLm1lbWJlckdyb3VwcyA9IHt9OyAvLyBBIG1hcCBvZiBkdW1teSBwYXJlbnQgbm9kZSBhbmQgaXRzIHplcm8gZGVncmVlIG1lbWJlcnMgd2hvc2UgcGFyZW50cyBhcmUgbm90IHRvIGJlIHRpbGVkXG4gIHRoaXMuaWRUb0R1bW15Tm9kZSA9IHt9OyAvLyBBIG1hcCBvZiBpZCB0byBkdW1teSBub2RlIFxuICBcbiAgdmFyIHplcm9EZWdyZWUgPSBbXTsgLy8gTGlzdCBvZiB6ZXJvIGRlZ3JlZSBub2RlcyB3aG9zZSBwYXJlbnRzIGFyZSBub3QgdG8gYmUgdGlsZWRcbiAgdmFyIGFsbE5vZGVzID0gdGhpcy5ncmFwaE1hbmFnZXIuZ2V0QWxsTm9kZXMoKTtcblxuICAvLyBGaWxsIHplcm8gZGVncmVlIGxpc3RcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBub2RlID0gYWxsTm9kZXNbaV07XG4gICAgdmFyIHBhcmVudCA9IG5vZGUuZ2V0UGFyZW50KCk7XG4gICAgLy8gSWYgYSBub2RlIGhhcyB6ZXJvIGRlZ3JlZSBhbmQgaXRzIHBhcmVudCBpcyBub3QgdG8gYmUgdGlsZWQgaWYgZXhpc3RzIGFkZCB0aGF0IG5vZGUgdG8gemVyb0RlZ3JlcyBsaXN0XG4gICAgaWYgKHRoaXMuZ2V0Tm9kZURlZ3JlZVdpdGhDaGlsZHJlbihub2RlKSA9PT0gMCAmJiAoIHBhcmVudC5pZCA9PSB1bmRlZmluZWQgfHwgIXRoaXMuZ2V0VG9CZVRpbGVkKHBhcmVudCkgKSApIHtcbiAgICAgIHplcm9EZWdyZWUucHVzaChub2RlKTtcbiAgICB9XG4gIH1cblxuICAvLyBDcmVhdGUgYSBtYXAgb2YgcGFyZW50IG5vZGUgYW5kIGl0cyB6ZXJvIGRlZ3JlZSBtZW1iZXJzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgemVyb0RlZ3JlZS5sZW5ndGg7IGkrKylcbiAge1xuICAgIHZhciBub2RlID0gemVyb0RlZ3JlZVtpXTsgLy8gWmVybyBkZWdyZWUgbm9kZSBpdHNlbGZcbiAgICB2YXIgcF9pZCA9IG5vZGUuZ2V0UGFyZW50KCkuaWQ7IC8vIFBhcmVudCBpZFxuXG4gICAgaWYgKHR5cGVvZiB0ZW1wTWVtYmVyR3JvdXBzW3BfaWRdID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgdGVtcE1lbWJlckdyb3Vwc1twX2lkXSA9IFtdO1xuXG4gICAgdGVtcE1lbWJlckdyb3Vwc1twX2lkXSA9IHRlbXBNZW1iZXJHcm91cHNbcF9pZF0uY29uY2F0KG5vZGUpOyAvLyBQdXNoIG5vZGUgdG8gdGhlIGxpc3QgYmVsb25ncyB0byBpdHMgcGFyZW50IGluIHRlbXBNZW1iZXJHcm91cHNcbiAgfVxuXG4gIC8vIElmIHRoZXJlIGFyZSBhdCBsZWFzdCB0d28gbm9kZXMgYXQgYSBsZXZlbCwgY3JlYXRlIGEgZHVtbXkgY29tcG91bmQgZm9yIHRoZW1cbiAgT2JqZWN0LmtleXModGVtcE1lbWJlckdyb3VwcykuZm9yRWFjaChmdW5jdGlvbihwX2lkKSB7XG4gICAgaWYgKHRlbXBNZW1iZXJHcm91cHNbcF9pZF0ubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGR1bW15Q29tcG91bmRJZCA9IFwiRHVtbXlDb21wb3VuZF9cIiArIHBfaWQ7IC8vIFRoZSBpZCBvZiBkdW1teSBjb21wb3VuZCB3aGljaCB3aWxsIGJlIGNyZWF0ZWQgc29vblxuICAgICAgc2VsZi5tZW1iZXJHcm91cHNbZHVtbXlDb21wb3VuZElkXSA9IHRlbXBNZW1iZXJHcm91cHNbcF9pZF07IC8vIEFkZCBkdW1teSBjb21wb3VuZCB0byBtZW1iZXJHcm91cHNcblxuICAgICAgdmFyIHBhcmVudCA9IHRlbXBNZW1iZXJHcm91cHNbcF9pZF1bMF0uZ2V0UGFyZW50KCk7IC8vIFRoZSBwYXJlbnQgb2YgemVybyBkZWdyZWUgbm9kZXMgd2lsbCBiZSB0aGUgcGFyZW50IG9mIG5ldyBkdW1teSBjb21wb3VuZFxuXG4gICAgICAvLyBDcmVhdGUgYSBkdW1teSBjb21wb3VuZCB3aXRoIGNhbGN1bGF0ZWQgaWRcbiAgICAgIHZhciBkdW1teUNvbXBvdW5kID0gbmV3IENvU0VOb2RlKHNlbGYuZ3JhcGhNYW5hZ2VyKTtcbiAgICAgIGR1bW15Q29tcG91bmQuaWQgPSBkdW1teUNvbXBvdW5kSWQ7XG4gICAgICBkdW1teUNvbXBvdW5kLnBhZGRpbmdMZWZ0ID0gcGFyZW50LnBhZGRpbmdMZWZ0IHx8IDA7XG4gICAgICBkdW1teUNvbXBvdW5kLnBhZGRpbmdSaWdodCA9IHBhcmVudC5wYWRkaW5nUmlnaHQgfHwgMDtcbiAgICAgIGR1bW15Q29tcG91bmQucGFkZGluZ0JvdHRvbSA9IHBhcmVudC5wYWRkaW5nQm90dG9tIHx8IDA7XG4gICAgICBkdW1teUNvbXBvdW5kLnBhZGRpbmdUb3AgPSBwYXJlbnQucGFkZGluZ1RvcCB8fCAwO1xuICAgICAgXG4gICAgICBzZWxmLmlkVG9EdW1teU5vZGVbZHVtbXlDb21wb3VuZElkXSA9IGR1bW15Q29tcG91bmQ7XG4gICAgICBcbiAgICAgIHZhciBkdW1teVBhcmVudEdyYXBoID0gc2VsZi5nZXRHcmFwaE1hbmFnZXIoKS5hZGQoc2VsZi5uZXdHcmFwaCgpLCBkdW1teUNvbXBvdW5kKTtcbiAgICAgIHZhciBwYXJlbnRHcmFwaCA9IHBhcmVudC5nZXRDaGlsZCgpO1xuXG4gICAgICAvLyBBZGQgZHVtbXkgY29tcG91bmQgdG8gcGFyZW50IHRoZSBncmFwaFxuICAgICAgcGFyZW50R3JhcGguYWRkKGR1bW15Q29tcG91bmQpO1xuXG4gICAgICAvLyBGb3IgZWFjaCB6ZXJvIGRlZ3JlZSBub2RlIGluIHRoaXMgbGV2ZWwgcmVtb3ZlIGl0IGZyb20gaXRzIHBhcmVudCBncmFwaCBhbmQgYWRkIGl0IHRvIHRoZSBncmFwaCBvZiBkdW1teSBwYXJlbnRcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcE1lbWJlckdyb3Vwc1twX2lkXS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbm9kZSA9IHRlbXBNZW1iZXJHcm91cHNbcF9pZF1baV07XG4gICAgICAgIFxuICAgICAgICBwYXJlbnRHcmFwaC5yZW1vdmUobm9kZSk7XG4gICAgICAgIGR1bW15UGFyZW50R3JhcGguYWRkKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS5jbGVhckNvbXBvdW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNoaWxkR3JhcGhNYXAgPSB7fTtcbiAgdmFyIGlkVG9Ob2RlID0ge307XG5cbiAgLy8gR2V0IGNvbXBvdW5kIG9yZGVyaW5nIGJ5IGZpbmRpbmcgdGhlIGlubmVyIG9uZSBmaXJzdFxuICB0aGlzLnBlcmZvcm1ERlNPbkNvbXBvdW5kcygpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb21wb3VuZE9yZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgXG4gICAgaWRUb05vZGVbdGhpcy5jb21wb3VuZE9yZGVyW2ldLmlkXSA9IHRoaXMuY29tcG91bmRPcmRlcltpXTtcbiAgICBjaGlsZEdyYXBoTWFwW3RoaXMuY29tcG91bmRPcmRlcltpXS5pZF0gPSBbXS5jb25jYXQodGhpcy5jb21wb3VuZE9yZGVyW2ldLmdldENoaWxkKCkuZ2V0Tm9kZXMoKSk7XG5cbiAgICAvLyBSZW1vdmUgY2hpbGRyZW4gb2YgY29tcG91bmRzXG4gICAgdGhpcy5ncmFwaE1hbmFnZXIucmVtb3ZlKHRoaXMuY29tcG91bmRPcmRlcltpXS5nZXRDaGlsZCgpKTtcbiAgICB0aGlzLmNvbXBvdW5kT3JkZXJbaV0uY2hpbGQgPSBudWxsO1xuICB9XG4gIFxuICB0aGlzLmdyYXBoTWFuYWdlci5yZXNldEFsbE5vZGVzKCk7XG4gIFxuICAvLyBUaWxlIHRoZSByZW1vdmVkIGNoaWxkcmVuXG4gIHRoaXMudGlsZUNvbXBvdW5kTWVtYmVycyhjaGlsZEdyYXBoTWFwLCBpZFRvTm9kZSk7XG59O1xuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS5jbGVhclplcm9EZWdyZWVNZW1iZXJzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciB0aWxlZFplcm9EZWdyZWVQYWNrID0gdGhpcy50aWxlZFplcm9EZWdyZWVQYWNrID0gW107XG5cbiAgT2JqZWN0LmtleXModGhpcy5tZW1iZXJHcm91cHMpLmZvckVhY2goZnVuY3Rpb24oaWQpIHtcbiAgICB2YXIgY29tcG91bmROb2RlID0gc2VsZi5pZFRvRHVtbXlOb2RlW2lkXTsgLy8gR2V0IHRoZSBkdW1teSBjb21wb3VuZFxuXG4gICAgdGlsZWRaZXJvRGVncmVlUGFja1tpZF0gPSBzZWxmLnRpbGVOb2RlcyhzZWxmLm1lbWJlckdyb3Vwc1tpZF0sIGNvbXBvdW5kTm9kZS5wYWRkaW5nTGVmdCArIGNvbXBvdW5kTm9kZS5wYWRkaW5nUmlnaHQpO1xuXG4gICAgLy8gU2V0IHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBkdW1teSBjb21wb3VuZCBhcyBjYWxjdWxhdGVkXG4gICAgY29tcG91bmROb2RlLnJlY3Qud2lkdGggPSB0aWxlZFplcm9EZWdyZWVQYWNrW2lkXS53aWR0aDtcbiAgICBjb21wb3VuZE5vZGUucmVjdC5oZWlnaHQgPSB0aWxlZFplcm9EZWdyZWVQYWNrW2lkXS5oZWlnaHQ7XG4gIH0pO1xufTtcblxuQ29TRUxheW91dC5wcm90b3R5cGUucmVwb3B1bGF0ZUNvbXBvdW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgZm9yICh2YXIgaSA9IHRoaXMuY29tcG91bmRPcmRlci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciBsQ29tcG91bmROb2RlID0gdGhpcy5jb21wb3VuZE9yZGVyW2ldO1xuICAgIHZhciBpZCA9IGxDb21wb3VuZE5vZGUuaWQ7XG4gICAgdmFyIGhvcml6b250YWxNYXJnaW4gPSBsQ29tcG91bmROb2RlLnBhZGRpbmdMZWZ0O1xuICAgIHZhciB2ZXJ0aWNhbE1hcmdpbiA9IGxDb21wb3VuZE5vZGUucGFkZGluZ1RvcDtcblxuICAgIHRoaXMuYWRqdXN0TG9jYXRpb25zKHRoaXMudGlsZWRNZW1iZXJQYWNrW2lkXSwgbENvbXBvdW5kTm9kZS5yZWN0LngsIGxDb21wb3VuZE5vZGUucmVjdC55LCBob3Jpem9udGFsTWFyZ2luLCB2ZXJ0aWNhbE1hcmdpbik7XG4gIH1cbn07XG5cbkNvU0VMYXlvdXQucHJvdG90eXBlLnJlcG9wdWxhdGVaZXJvRGVncmVlTWVtYmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgdGlsZWRQYWNrID0gdGhpcy50aWxlZFplcm9EZWdyZWVQYWNrO1xuICBcbiAgT2JqZWN0LmtleXModGlsZWRQYWNrKS5mb3JFYWNoKGZ1bmN0aW9uKGlkKSB7XG4gICAgdmFyIGNvbXBvdW5kTm9kZSA9IHNlbGYuaWRUb0R1bW15Tm9kZVtpZF07IC8vIEdldCB0aGUgZHVtbXkgY29tcG91bmQgYnkgaXRzIGlkXG4gICAgdmFyIGhvcml6b250YWxNYXJnaW4gPSBjb21wb3VuZE5vZGUucGFkZGluZ0xlZnQ7XG4gICAgdmFyIHZlcnRpY2FsTWFyZ2luID0gY29tcG91bmROb2RlLnBhZGRpbmdUb3A7XG5cbiAgICAvLyBBZGp1c3QgdGhlIHBvc2l0aW9ucyBvZiBub2RlcyB3cnQgaXRzIGNvbXBvdW5kXG4gICAgc2VsZi5hZGp1c3RMb2NhdGlvbnModGlsZWRQYWNrW2lkXSwgY29tcG91bmROb2RlLnJlY3QueCwgY29tcG91bmROb2RlLnJlY3QueSwgaG9yaXpvbnRhbE1hcmdpbiwgdmVydGljYWxNYXJnaW4pO1xuICB9KTtcbn07XG5cbkNvU0VMYXlvdXQucHJvdG90eXBlLmdldFRvQmVUaWxlZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHZhciBpZCA9IG5vZGUuaWQ7XG4gIC8vZmlyc3RseSBjaGVjayB0aGUgcHJldmlvdXMgcmVzdWx0c1xuICBpZiAodGhpcy50b0JlVGlsZWRbaWRdICE9IG51bGwpIHtcbiAgICByZXR1cm4gdGhpcy50b0JlVGlsZWRbaWRdO1xuICB9XG5cbiAgLy9vbmx5IGNvbXBvdW5kIG5vZGVzIGFyZSB0byBiZSB0aWxlZFxuICB2YXIgY2hpbGRHcmFwaCA9IG5vZGUuZ2V0Q2hpbGQoKTtcbiAgaWYgKGNoaWxkR3JhcGggPT0gbnVsbCkge1xuICAgIHRoaXMudG9CZVRpbGVkW2lkXSA9IGZhbHNlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBjaGlsZHJlbiA9IGNoaWxkR3JhcGguZ2V0Tm9kZXMoKTsgLy8gR2V0IHRoZSBjaGlsZHJlbiBub2Rlc1xuXG4gIC8vYSBjb21wb3VuZCBub2RlIGlzIG5vdCB0byBiZSB0aWxlZCBpZiBhbGwgb2YgaXRzIGNvbXBvdW5kIGNoaWxkcmVuIGFyZSBub3QgdG8gYmUgdGlsZWRcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0aGVDaGlsZCA9IGNoaWxkcmVuW2ldO1xuXG4gICAgaWYgKHRoaXMuZ2V0Tm9kZURlZ3JlZSh0aGVDaGlsZCkgPiAwKSB7XG4gICAgICB0aGlzLnRvQmVUaWxlZFtpZF0gPSBmYWxzZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvL3Bhc3MgdGhlIGNoaWxkcmVuIG5vdCBoYXZpbmcgdGhlIGNvbXBvdW5kIHN0cnVjdHVyZVxuICAgIGlmICh0aGVDaGlsZC5nZXRDaGlsZCgpID09IG51bGwpIHtcbiAgICAgIHRoaXMudG9CZVRpbGVkW3RoZUNoaWxkLmlkXSA9IGZhbHNlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmdldFRvQmVUaWxlZCh0aGVDaGlsZCkpIHtcbiAgICAgIHRoaXMudG9CZVRpbGVkW2lkXSA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICB0aGlzLnRvQmVUaWxlZFtpZF0gPSB0cnVlO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIEdldCBkZWdyZWUgb2YgYSBub2RlIGRlcGVuZGluZyBvZiBpdHMgZWRnZXMgYW5kIGluZGVwZW5kZW50IG9mIGl0cyBjaGlsZHJlblxuQ29TRUxheW91dC5wcm90b3R5cGUuZ2V0Tm9kZURlZ3JlZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHZhciBpZCA9IG5vZGUuaWQ7XG4gIHZhciBlZGdlcyA9IG5vZGUuZ2V0RWRnZXMoKTtcbiAgdmFyIGRlZ3JlZSA9IDA7XG4gIFxuICAvLyBGb3IgdGhlIGVkZ2VzIGNvbm5lY3RlZFxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVkZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGVkZ2UgPSBlZGdlc1tpXTtcbiAgICBpZiAoZWRnZS5nZXRTb3VyY2UoKS5pZCAhPT0gZWRnZS5nZXRUYXJnZXQoKS5pZCkge1xuICAgICAgZGVncmVlID0gZGVncmVlICsgMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlZ3JlZTtcbn07XG5cbi8vIEdldCBkZWdyZWUgb2YgYSBub2RlIHdpdGggaXRzIGNoaWxkcmVuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS5nZXROb2RlRGVncmVlV2l0aENoaWxkcmVuID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgdmFyIGRlZ3JlZSA9IHRoaXMuZ2V0Tm9kZURlZ3JlZShub2RlKTtcbiAgaWYgKG5vZGUuZ2V0Q2hpbGQoKSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGRlZ3JlZTtcbiAgfVxuICB2YXIgY2hpbGRyZW4gPSBub2RlLmdldENoaWxkKCkuZ2V0Tm9kZXMoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgIGRlZ3JlZSArPSB0aGlzLmdldE5vZGVEZWdyZWVXaXRoQ2hpbGRyZW4oY2hpbGQpO1xuICB9XG4gIHJldHVybiBkZWdyZWU7XG59O1xuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS5wZXJmb3JtREZTT25Db21wb3VuZHMgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY29tcG91bmRPcmRlciA9IFtdO1xuICB0aGlzLmZpbGxDb21wZXhPcmRlckJ5REZTKHRoaXMuZ3JhcGhNYW5hZ2VyLmdldFJvb3QoKS5nZXROb2RlcygpKTtcbn07XG5cbkNvU0VMYXlvdXQucHJvdG90eXBlLmZpbGxDb21wZXhPcmRlckJ5REZTID0gZnVuY3Rpb24gKGNoaWxkcmVuKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICBpZiAoY2hpbGQuZ2V0Q2hpbGQoKSAhPSBudWxsKSB7XG4gICAgICB0aGlzLmZpbGxDb21wZXhPcmRlckJ5REZTKGNoaWxkLmdldENoaWxkKCkuZ2V0Tm9kZXMoKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmdldFRvQmVUaWxlZChjaGlsZCkpIHtcbiAgICAgIHRoaXMuY29tcG91bmRPcmRlci5wdXNoKGNoaWxkKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuKiBUaGlzIG1ldGhvZCBwbGFjZXMgZWFjaCB6ZXJvIGRlZ3JlZSBtZW1iZXIgd3J0IGdpdmVuICh4LHkpIGNvb3JkaW5hdGVzICh0b3AgbGVmdCkuXG4qL1xuQ29TRUxheW91dC5wcm90b3R5cGUuYWRqdXN0TG9jYXRpb25zID0gZnVuY3Rpb24gKG9yZ2FuaXphdGlvbiwgeCwgeSwgY29tcG91bmRIb3Jpem9udGFsTWFyZ2luLCBjb21wb3VuZFZlcnRpY2FsTWFyZ2luKSB7XG4gIHggKz0gY29tcG91bmRIb3Jpem9udGFsTWFyZ2luO1xuICB5ICs9IGNvbXBvdW5kVmVydGljYWxNYXJnaW47XG5cbiAgdmFyIGxlZnQgPSB4O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgb3JnYW5pemF0aW9uLnJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcm93ID0gb3JnYW5pemF0aW9uLnJvd3NbaV07XG4gICAgeCA9IGxlZnQ7XG4gICAgdmFyIG1heEhlaWdodCA9IDA7XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJvdy5sZW5ndGg7IGorKykge1xuICAgICAgdmFyIGxub2RlID0gcm93W2pdO1xuXG4gICAgICBsbm9kZS5yZWN0LnggPSB4Oy8vICsgbG5vZGUucmVjdC53aWR0aCAvIDI7XG4gICAgICBsbm9kZS5yZWN0LnkgPSB5Oy8vICsgbG5vZGUucmVjdC5oZWlnaHQgLyAyO1xuXG4gICAgICB4ICs9IGxub2RlLnJlY3Qud2lkdGggKyBvcmdhbml6YXRpb24uaG9yaXpvbnRhbFBhZGRpbmc7XG5cbiAgICAgIGlmIChsbm9kZS5yZWN0LmhlaWdodCA+IG1heEhlaWdodClcbiAgICAgICAgbWF4SGVpZ2h0ID0gbG5vZGUucmVjdC5oZWlnaHQ7XG4gICAgfVxuXG4gICAgeSArPSBtYXhIZWlnaHQgKyBvcmdhbml6YXRpb24udmVydGljYWxQYWRkaW5nO1xuICB9XG59O1xuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS50aWxlQ29tcG91bmRNZW1iZXJzID0gZnVuY3Rpb24gKGNoaWxkR3JhcGhNYXAsIGlkVG9Ob2RlKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy50aWxlZE1lbWJlclBhY2sgPSBbXTtcblxuICBPYmplY3Qua2V5cyhjaGlsZEdyYXBoTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGlkKSB7XG4gICAgLy8gR2V0IHRoZSBjb21wb3VuZCBub2RlXG4gICAgdmFyIGNvbXBvdW5kTm9kZSA9IGlkVG9Ob2RlW2lkXTtcblxuICAgIHNlbGYudGlsZWRNZW1iZXJQYWNrW2lkXSA9IHNlbGYudGlsZU5vZGVzKGNoaWxkR3JhcGhNYXBbaWRdLCBjb21wb3VuZE5vZGUucGFkZGluZ0xlZnQgKyBjb21wb3VuZE5vZGUucGFkZGluZ1JpZ2h0KTtcblxuICAgIGNvbXBvdW5kTm9kZS5yZWN0LndpZHRoID0gc2VsZi50aWxlZE1lbWJlclBhY2tbaWRdLndpZHRoICsgMjA7XG4gICAgY29tcG91bmROb2RlLnJlY3QuaGVpZ2h0ID0gc2VsZi50aWxlZE1lbWJlclBhY2tbaWRdLmhlaWdodCArIDIwO1xuICB9KTtcbn07XG5cbkNvU0VMYXlvdXQucHJvdG90eXBlLnRpbGVOb2RlcyA9IGZ1bmN0aW9uIChub2RlcywgbWluV2lkdGgpIHtcbiAgdmFyIHZlcnRpY2FsUGFkZGluZyA9IENvU0VDb25zdGFudHMuVElMSU5HX1BBRERJTkdfVkVSVElDQUw7XG4gIHZhciBob3Jpem9udGFsUGFkZGluZyA9IENvU0VDb25zdGFudHMuVElMSU5HX1BBRERJTkdfSE9SSVpPTlRBTDtcbiAgdmFyIG9yZ2FuaXphdGlvbiA9IHtcbiAgICByb3dzOiBbXSxcbiAgICByb3dXaWR0aDogW10sXG4gICAgcm93SGVpZ2h0OiBbXSxcbiAgICB3aWR0aDogMjAsXG4gICAgaGVpZ2h0OiAyMCxcbiAgICB2ZXJ0aWNhbFBhZGRpbmc6IHZlcnRpY2FsUGFkZGluZyxcbiAgICBob3Jpem9udGFsUGFkZGluZzogaG9yaXpvbnRhbFBhZGRpbmdcbiAgfTtcblxuICAvLyBTb3J0IHRoZSBub2RlcyBpbiBhc2NlbmRpbmcgb3JkZXIgb2YgdGhlaXIgYXJlYXNcbiAgbm9kZXMuc29ydChmdW5jdGlvbiAobjEsIG4yKSB7XG4gICAgaWYgKG4xLnJlY3Qud2lkdGggKiBuMS5yZWN0LmhlaWdodCA+IG4yLnJlY3Qud2lkdGggKiBuMi5yZWN0LmhlaWdodClcbiAgICAgIHJldHVybiAtMTtcbiAgICBpZiAobjEucmVjdC53aWR0aCAqIG4xLnJlY3QuaGVpZ2h0IDwgbjIucmVjdC53aWR0aCAqIG4yLnJlY3QuaGVpZ2h0KVxuICAgICAgcmV0dXJuIDE7XG4gICAgcmV0dXJuIDA7XG4gIH0pO1xuXG4gIC8vIENyZWF0ZSB0aGUgb3JnYW5pemF0aW9uIC0+IHRpbGUgbWVtYmVyc1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGxOb2RlID0gbm9kZXNbaV07XG4gICAgXG4gICAgaWYgKG9yZ2FuaXphdGlvbi5yb3dzLmxlbmd0aCA9PSAwKSB7XG4gICAgICB0aGlzLmluc2VydE5vZGVUb1Jvdyhvcmdhbml6YXRpb24sIGxOb2RlLCAwLCBtaW5XaWR0aCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuY2FuQWRkSG9yaXpvbnRhbChvcmdhbml6YXRpb24sIGxOb2RlLnJlY3Qud2lkdGgsIGxOb2RlLnJlY3QuaGVpZ2h0KSkge1xuICAgICAgdGhpcy5pbnNlcnROb2RlVG9Sb3cob3JnYW5pemF0aW9uLCBsTm9kZSwgdGhpcy5nZXRTaG9ydGVzdFJvd0luZGV4KG9yZ2FuaXphdGlvbiksIG1pbldpZHRoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmluc2VydE5vZGVUb1Jvdyhvcmdhbml6YXRpb24sIGxOb2RlLCBvcmdhbml6YXRpb24ucm93cy5sZW5ndGgsIG1pbldpZHRoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNoaWZ0VG9MYXN0Um93KG9yZ2FuaXphdGlvbik7XG4gIH1cblxuICByZXR1cm4gb3JnYW5pemF0aW9uO1xufTtcblxuQ29TRUxheW91dC5wcm90b3R5cGUuaW5zZXJ0Tm9kZVRvUm93ID0gZnVuY3Rpb24gKG9yZ2FuaXphdGlvbiwgbm9kZSwgcm93SW5kZXgsIG1pbldpZHRoKSB7XG4gIHZhciBtaW5Db21wb3VuZFNpemUgPSBtaW5XaWR0aDtcblxuICAvLyBBZGQgbmV3IHJvdyBpZiBuZWVkZWRcbiAgaWYgKHJvd0luZGV4ID09IG9yZ2FuaXphdGlvbi5yb3dzLmxlbmd0aCkge1xuICAgIHZhciBzZWNvbmREaW1lbnNpb24gPSBbXTtcblxuICAgIG9yZ2FuaXphdGlvbi5yb3dzLnB1c2goc2Vjb25kRGltZW5zaW9uKTtcbiAgICBvcmdhbml6YXRpb24ucm93V2lkdGgucHVzaChtaW5Db21wb3VuZFNpemUpO1xuICAgIG9yZ2FuaXphdGlvbi5yb3dIZWlnaHQucHVzaCgwKTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSByb3cgd2lkdGhcbiAgdmFyIHcgPSBvcmdhbml6YXRpb24ucm93V2lkdGhbcm93SW5kZXhdICsgbm9kZS5yZWN0LndpZHRoO1xuXG4gIGlmIChvcmdhbml6YXRpb24ucm93c1tyb3dJbmRleF0ubGVuZ3RoID4gMCkge1xuICAgIHcgKz0gb3JnYW5pemF0aW9uLmhvcml6b250YWxQYWRkaW5nO1xuICB9XG5cbiAgb3JnYW5pemF0aW9uLnJvd1dpZHRoW3Jvd0luZGV4XSA9IHc7XG4gIC8vIFVwZGF0ZSBjb21wb3VuZCB3aWR0aFxuICBpZiAob3JnYW5pemF0aW9uLndpZHRoIDwgdykge1xuICAgIG9yZ2FuaXphdGlvbi53aWR0aCA9IHc7XG4gIH1cblxuICAvLyBVcGRhdGUgaGVpZ2h0XG4gIHZhciBoID0gbm9kZS5yZWN0LmhlaWdodDtcbiAgaWYgKHJvd0luZGV4ID4gMClcbiAgICBoICs9IG9yZ2FuaXphdGlvbi52ZXJ0aWNhbFBhZGRpbmc7XG5cbiAgdmFyIGV4dHJhSGVpZ2h0ID0gMDtcbiAgaWYgKGggPiBvcmdhbml6YXRpb24ucm93SGVpZ2h0W3Jvd0luZGV4XSkge1xuICAgIGV4dHJhSGVpZ2h0ID0gb3JnYW5pemF0aW9uLnJvd0hlaWdodFtyb3dJbmRleF07XG4gICAgb3JnYW5pemF0aW9uLnJvd0hlaWdodFtyb3dJbmRleF0gPSBoO1xuICAgIGV4dHJhSGVpZ2h0ID0gb3JnYW5pemF0aW9uLnJvd0hlaWdodFtyb3dJbmRleF0gLSBleHRyYUhlaWdodDtcbiAgfVxuXG4gIG9yZ2FuaXphdGlvbi5oZWlnaHQgKz0gZXh0cmFIZWlnaHQ7XG5cbiAgLy8gSW5zZXJ0IG5vZGVcbiAgb3JnYW5pemF0aW9uLnJvd3Nbcm93SW5kZXhdLnB1c2gobm9kZSk7XG59O1xuXG4vL1NjYW5zIHRoZSByb3dzIG9mIGFuIG9yZ2FuaXphdGlvbiBhbmQgcmV0dXJucyB0aGUgb25lIHdpdGggdGhlIG1pbiB3aWR0aFxuQ29TRUxheW91dC5wcm90b3R5cGUuZ2V0U2hvcnRlc3RSb3dJbmRleCA9IGZ1bmN0aW9uIChvcmdhbml6YXRpb24pIHtcbiAgdmFyIHIgPSAtMTtcbiAgdmFyIG1pbiA9IE51bWJlci5NQVhfVkFMVUU7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBvcmdhbml6YXRpb24ucm93cy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChvcmdhbml6YXRpb24ucm93V2lkdGhbaV0gPCBtaW4pIHtcbiAgICAgIHIgPSBpO1xuICAgICAgbWluID0gb3JnYW5pemF0aW9uLnJvd1dpZHRoW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcjtcbn07XG5cbi8vU2NhbnMgdGhlIHJvd3Mgb2YgYW4gb3JnYW5pemF0aW9uIGFuZCByZXR1cm5zIHRoZSBvbmUgd2l0aCB0aGUgbWF4IHdpZHRoXG5Db1NFTGF5b3V0LnByb3RvdHlwZS5nZXRMb25nZXN0Um93SW5kZXggPSBmdW5jdGlvbiAob3JnYW5pemF0aW9uKSB7XG4gIHZhciByID0gLTE7XG4gIHZhciBtYXggPSBOdW1iZXIuTUlOX1ZBTFVFO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgb3JnYW5pemF0aW9uLnJvd3MubGVuZ3RoOyBpKyspIHtcblxuICAgIGlmIChvcmdhbml6YXRpb24ucm93V2lkdGhbaV0gPiBtYXgpIHtcbiAgICAgIHIgPSBpO1xuICAgICAgbWF4ID0gb3JnYW5pemF0aW9uLnJvd1dpZHRoW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByO1xufTtcblxuLyoqXG4qIFRoaXMgbWV0aG9kIGNoZWNrcyB3aGV0aGVyIGFkZGluZyBleHRyYSB3aWR0aCB0byB0aGUgb3JnYW5pemF0aW9uIHZpb2xhdGVzXG4qIHRoZSBhc3BlY3QgcmF0aW8oMSkgb3Igbm90LlxuKi9cbkNvU0VMYXlvdXQucHJvdG90eXBlLmNhbkFkZEhvcml6b250YWwgPSBmdW5jdGlvbiAob3JnYW5pemF0aW9uLCBleHRyYVdpZHRoLCBleHRyYUhlaWdodCkge1xuXG4gIHZhciBzcmkgPSB0aGlzLmdldFNob3J0ZXN0Um93SW5kZXgob3JnYW5pemF0aW9uKTtcblxuICBpZiAoc3JpIDwgMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdmFyIG1pbiA9IG9yZ2FuaXphdGlvbi5yb3dXaWR0aFtzcmldO1xuXG4gIGlmIChtaW4gKyBvcmdhbml6YXRpb24uaG9yaXpvbnRhbFBhZGRpbmcgKyBleHRyYVdpZHRoIDw9IG9yZ2FuaXphdGlvbi53aWR0aClcbiAgICByZXR1cm4gdHJ1ZTtcblxuICB2YXIgaERpZmYgPSAwO1xuXG4gIC8vIEFkZGluZyB0byBhbiBleGlzdGluZyByb3dcbiAgaWYgKG9yZ2FuaXphdGlvbi5yb3dIZWlnaHRbc3JpXSA8IGV4dHJhSGVpZ2h0KSB7XG4gICAgaWYgKHNyaSA+IDApXG4gICAgICBoRGlmZiA9IGV4dHJhSGVpZ2h0ICsgb3JnYW5pemF0aW9uLnZlcnRpY2FsUGFkZGluZyAtIG9yZ2FuaXphdGlvbi5yb3dIZWlnaHRbc3JpXTtcbiAgfVxuXG4gIHZhciBhZGRfdG9fcm93X3JhdGlvO1xuICBpZiAob3JnYW5pemF0aW9uLndpZHRoIC0gbWluID49IGV4dHJhV2lkdGggKyBvcmdhbml6YXRpb24uaG9yaXpvbnRhbFBhZGRpbmcpIHtcbiAgICBhZGRfdG9fcm93X3JhdGlvID0gKG9yZ2FuaXphdGlvbi5oZWlnaHQgKyBoRGlmZikgLyAobWluICsgZXh0cmFXaWR0aCArIG9yZ2FuaXphdGlvbi5ob3Jpem9udGFsUGFkZGluZyk7XG4gIH0gZWxzZSB7XG4gICAgYWRkX3RvX3Jvd19yYXRpbyA9IChvcmdhbml6YXRpb24uaGVpZ2h0ICsgaERpZmYpIC8gb3JnYW5pemF0aW9uLndpZHRoO1xuICB9XG5cbiAgLy8gQWRkaW5nIGEgbmV3IHJvdyBmb3IgdGhpcyBub2RlXG4gIGhEaWZmID0gZXh0cmFIZWlnaHQgKyBvcmdhbml6YXRpb24udmVydGljYWxQYWRkaW5nO1xuICB2YXIgYWRkX25ld19yb3dfcmF0aW87XG4gIGlmIChvcmdhbml6YXRpb24ud2lkdGggPCBleHRyYVdpZHRoKSB7XG4gICAgYWRkX25ld19yb3dfcmF0aW8gPSAob3JnYW5pemF0aW9uLmhlaWdodCArIGhEaWZmKSAvIGV4dHJhV2lkdGg7XG4gIH0gZWxzZSB7XG4gICAgYWRkX25ld19yb3dfcmF0aW8gPSAob3JnYW5pemF0aW9uLmhlaWdodCArIGhEaWZmKSAvIG9yZ2FuaXphdGlvbi53aWR0aDtcbiAgfVxuXG4gIGlmIChhZGRfbmV3X3Jvd19yYXRpbyA8IDEpXG4gICAgYWRkX25ld19yb3dfcmF0aW8gPSAxIC8gYWRkX25ld19yb3dfcmF0aW87XG5cbiAgaWYgKGFkZF90b19yb3dfcmF0aW8gPCAxKVxuICAgIGFkZF90b19yb3dfcmF0aW8gPSAxIC8gYWRkX3RvX3Jvd19yYXRpbztcblxuICByZXR1cm4gYWRkX3RvX3Jvd19yYXRpbyA8IGFkZF9uZXdfcm93X3JhdGlvO1xufTtcblxuLy9JZiBtb3ZpbmcgdGhlIGxhc3Qgbm9kZSBmcm9tIHRoZSBsb25nZXN0IHJvdyBhbmQgYWRkaW5nIGl0IHRvIHRoZSBsYXN0XG4vL3JvdyBtYWtlcyB0aGUgYm91bmRpbmcgYm94IHNtYWxsZXIsIGRvIGl0LlxuQ29TRUxheW91dC5wcm90b3R5cGUuc2hpZnRUb0xhc3RSb3cgPSBmdW5jdGlvbiAob3JnYW5pemF0aW9uKSB7XG4gIHZhciBsb25nZXN0ID0gdGhpcy5nZXRMb25nZXN0Um93SW5kZXgob3JnYW5pemF0aW9uKTtcbiAgdmFyIGxhc3QgPSBvcmdhbml6YXRpb24ucm93V2lkdGgubGVuZ3RoIC0gMTtcbiAgdmFyIHJvdyA9IG9yZ2FuaXphdGlvbi5yb3dzW2xvbmdlc3RdO1xuICB2YXIgbm9kZSA9IHJvd1tyb3cubGVuZ3RoIC0gMV07XG5cbiAgdmFyIGRpZmYgPSBub2RlLndpZHRoICsgb3JnYW5pemF0aW9uLmhvcml6b250YWxQYWRkaW5nO1xuXG4gIC8vIENoZWNrIGlmIHRoZXJlIGlzIGVub3VnaCBzcGFjZSBvbiB0aGUgbGFzdCByb3dcbiAgaWYgKG9yZ2FuaXphdGlvbi53aWR0aCAtIG9yZ2FuaXphdGlvbi5yb3dXaWR0aFtsYXN0XSA+IGRpZmYgJiYgbG9uZ2VzdCAhPSBsYXN0KSB7XG4gICAgLy8gUmVtb3ZlIHRoZSBsYXN0IGVsZW1lbnQgb2YgdGhlIGxvbmdlc3Qgcm93XG4gICAgcm93LnNwbGljZSgtMSwgMSk7XG5cbiAgICAvLyBQdXNoIGl0IHRvIHRoZSBsYXN0IHJvd1xuICAgIG9yZ2FuaXphdGlvbi5yb3dzW2xhc3RdLnB1c2gobm9kZSk7XG5cbiAgICBvcmdhbml6YXRpb24ucm93V2lkdGhbbG9uZ2VzdF0gPSBvcmdhbml6YXRpb24ucm93V2lkdGhbbG9uZ2VzdF0gLSBkaWZmO1xuICAgIG9yZ2FuaXphdGlvbi5yb3dXaWR0aFtsYXN0XSA9IG9yZ2FuaXphdGlvbi5yb3dXaWR0aFtsYXN0XSArIGRpZmY7XG4gICAgb3JnYW5pemF0aW9uLndpZHRoID0gb3JnYW5pemF0aW9uLnJvd1dpZHRoW2luc3RhbmNlLmdldExvbmdlc3RSb3dJbmRleChvcmdhbml6YXRpb24pXTtcblxuICAgIC8vIFVwZGF0ZSBoZWlnaHRzIG9mIHRoZSBvcmdhbml6YXRpb25cbiAgICB2YXIgbWF4SGVpZ2h0ID0gTnVtYmVyLk1JTl9WQUxVRTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJvd1tpXS5oZWlnaHQgPiBtYXhIZWlnaHQpXG4gICAgICAgIG1heEhlaWdodCA9IHJvd1tpXS5oZWlnaHQ7XG4gICAgfVxuICAgIGlmIChsb25nZXN0ID4gMClcbiAgICAgIG1heEhlaWdodCArPSBvcmdhbml6YXRpb24udmVydGljYWxQYWRkaW5nO1xuXG4gICAgdmFyIHByZXZUb3RhbCA9IG9yZ2FuaXphdGlvbi5yb3dIZWlnaHRbbG9uZ2VzdF0gKyBvcmdhbml6YXRpb24ucm93SGVpZ2h0W2xhc3RdO1xuXG4gICAgb3JnYW5pemF0aW9uLnJvd0hlaWdodFtsb25nZXN0XSA9IG1heEhlaWdodDtcbiAgICBpZiAob3JnYW5pemF0aW9uLnJvd0hlaWdodFtsYXN0XSA8IG5vZGUuaGVpZ2h0ICsgb3JnYW5pemF0aW9uLnZlcnRpY2FsUGFkZGluZylcbiAgICAgIG9yZ2FuaXphdGlvbi5yb3dIZWlnaHRbbGFzdF0gPSBub2RlLmhlaWdodCArIG9yZ2FuaXphdGlvbi52ZXJ0aWNhbFBhZGRpbmc7XG5cbiAgICB2YXIgZmluYWxUb3RhbCA9IG9yZ2FuaXphdGlvbi5yb3dIZWlnaHRbbG9uZ2VzdF0gKyBvcmdhbml6YXRpb24ucm93SGVpZ2h0W2xhc3RdO1xuICAgIG9yZ2FuaXphdGlvbi5oZWlnaHQgKz0gKGZpbmFsVG90YWwgLSBwcmV2VG90YWwpO1xuXG4gICAgdGhpcy5zaGlmdFRvTGFzdFJvdyhvcmdhbml6YXRpb24pO1xuICB9XG59O1xuXG5Db1NFTGF5b3V0LnByb3RvdHlwZS50aWxpbmdQcmVMYXlvdXQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKENvU0VDb25zdGFudHMuVElMRSkge1xuICAgIC8vIEZpbmQgemVybyBkZWdyZWUgbm9kZXMgYW5kIGNyZWF0ZSBhIGNvbXBvdW5kIGZvciBlYWNoIGxldmVsXG4gICAgdGhpcy5ncm91cFplcm9EZWdyZWVNZW1iZXJzKCk7XG4gICAgLy8gVGlsZSBhbmQgY2xlYXIgY2hpbGRyZW4gb2YgZWFjaCBjb21wb3VuZFxuICAgIHRoaXMuY2xlYXJDb21wb3VuZHMoKTtcbiAgICAvLyBTZXBhcmF0ZWx5IHRpbGUgYW5kIGNsZWFyIHplcm8gZGVncmVlIG5vZGVzIGZvciBlYWNoIGxldmVsXG4gICAgdGhpcy5jbGVhclplcm9EZWdyZWVNZW1iZXJzKCk7XG4gIH1cbn07XG5cbkNvU0VMYXlvdXQucHJvdG90eXBlLnRpbGluZ1Bvc3RMYXlvdXQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKENvU0VDb25zdGFudHMuVElMRSkge1xuICAgIHRoaXMucmVwb3B1bGF0ZVplcm9EZWdyZWVNZW1iZXJzKCk7XG4gICAgdGhpcy5yZXBvcHVsYXRlQ29tcG91bmRzKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ29TRUxheW91dDtcbiIsInZhciBGRExheW91dE5vZGUgPSByZXF1aXJlKCcuL0ZETGF5b3V0Tm9kZScpO1xudmFyIElNYXRoID0gcmVxdWlyZSgnLi9JTWF0aCcpO1xuXG5mdW5jdGlvbiBDb1NFTm9kZShnbSwgbG9jLCBzaXplLCB2Tm9kZSkge1xuICBGRExheW91dE5vZGUuY2FsbCh0aGlzLCBnbSwgbG9jLCBzaXplLCB2Tm9kZSk7XG59XG5cblxuQ29TRU5vZGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShGRExheW91dE5vZGUucHJvdG90eXBlKTtcbmZvciAodmFyIHByb3AgaW4gRkRMYXlvdXROb2RlKSB7XG4gIENvU0VOb2RlW3Byb3BdID0gRkRMYXlvdXROb2RlW3Byb3BdO1xufVxuXG5Db1NFTm9kZS5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uICgpXG57XG4gIHZhciBsYXlvdXQgPSB0aGlzLmdyYXBoTWFuYWdlci5nZXRMYXlvdXQoKTtcbiAgdGhpcy5kaXNwbGFjZW1lbnRYID0gbGF5b3V0LmNvb2xpbmdGYWN0b3IgKlxuICAgICAgICAgICh0aGlzLnNwcmluZ0ZvcmNlWCArIHRoaXMucmVwdWxzaW9uRm9yY2VYICsgdGhpcy5ncmF2aXRhdGlvbkZvcmNlWCkgLyB0aGlzLm5vT2ZDaGlsZHJlbjtcbiAgdGhpcy5kaXNwbGFjZW1lbnRZID0gbGF5b3V0LmNvb2xpbmdGYWN0b3IgKlxuICAgICAgICAgICh0aGlzLnNwcmluZ0ZvcmNlWSArIHRoaXMucmVwdWxzaW9uRm9yY2VZICsgdGhpcy5ncmF2aXRhdGlvbkZvcmNlWSkgLyB0aGlzLm5vT2ZDaGlsZHJlbjtcblxuXG4gIGlmIChNYXRoLmFicyh0aGlzLmRpc3BsYWNlbWVudFgpID4gbGF5b3V0LmNvb2xpbmdGYWN0b3IgKiBsYXlvdXQubWF4Tm9kZURpc3BsYWNlbWVudClcbiAge1xuICAgIHRoaXMuZGlzcGxhY2VtZW50WCA9IGxheW91dC5jb29saW5nRmFjdG9yICogbGF5b3V0Lm1heE5vZGVEaXNwbGFjZW1lbnQgKlxuICAgICAgICAgICAgSU1hdGguc2lnbih0aGlzLmRpc3BsYWNlbWVudFgpO1xuICB9XG5cbiAgaWYgKE1hdGguYWJzKHRoaXMuZGlzcGxhY2VtZW50WSkgPiBsYXlvdXQuY29vbGluZ0ZhY3RvciAqIGxheW91dC5tYXhOb2RlRGlzcGxhY2VtZW50KVxuICB7XG4gICAgdGhpcy5kaXNwbGFjZW1lbnRZID0gbGF5b3V0LmNvb2xpbmdGYWN0b3IgKiBsYXlvdXQubWF4Tm9kZURpc3BsYWNlbWVudCAqXG4gICAgICAgICAgICBJTWF0aC5zaWduKHRoaXMuZGlzcGxhY2VtZW50WSk7XG4gIH1cblxuICAvLyBhIHNpbXBsZSBub2RlLCBqdXN0IG1vdmUgaXRcbiAgaWYgKHRoaXMuY2hpbGQgPT0gbnVsbClcbiAge1xuICAgIHRoaXMubW92ZUJ5KHRoaXMuZGlzcGxhY2VtZW50WCwgdGhpcy5kaXNwbGFjZW1lbnRZKTtcbiAgfVxuICAvLyBhbiBlbXB0eSBjb21wb3VuZCBub2RlLCBhZ2FpbiBqdXN0IG1vdmUgaXRcbiAgZWxzZSBpZiAodGhpcy5jaGlsZC5nZXROb2RlcygpLmxlbmd0aCA9PSAwKVxuICB7XG4gICAgdGhpcy5tb3ZlQnkodGhpcy5kaXNwbGFjZW1lbnRYLCB0aGlzLmRpc3BsYWNlbWVudFkpO1xuICB9XG4gIC8vIG5vbi1lbXB0eSBjb21wb3VuZCBub2RlLCBwcm9wb2dhdGUgbW92ZW1lbnQgdG8gY2hpbGRyZW4gYXMgd2VsbFxuICBlbHNlXG4gIHtcbiAgICB0aGlzLnByb3BvZ2F0ZURpc3BsYWNlbWVudFRvQ2hpbGRyZW4odGhpcy5kaXNwbGFjZW1lbnRYLFxuICAgICAgICAgICAgdGhpcy5kaXNwbGFjZW1lbnRZKTtcbiAgfVxuXG4gIGxheW91dC50b3RhbERpc3BsYWNlbWVudCArPVxuICAgICAgICAgIE1hdGguYWJzKHRoaXMuZGlzcGxhY2VtZW50WCkgKyBNYXRoLmFicyh0aGlzLmRpc3BsYWNlbWVudFkpO1xuXG4gIHRoaXMuc3ByaW5nRm9yY2VYID0gMDtcbiAgdGhpcy5zcHJpbmdGb3JjZVkgPSAwO1xuICB0aGlzLnJlcHVsc2lvbkZvcmNlWCA9IDA7XG4gIHRoaXMucmVwdWxzaW9uRm9yY2VZID0gMDtcbiAgdGhpcy5ncmF2aXRhdGlvbkZvcmNlWCA9IDA7XG4gIHRoaXMuZ3Jhdml0YXRpb25Gb3JjZVkgPSAwO1xuICB0aGlzLmRpc3BsYWNlbWVudFggPSAwO1xuICB0aGlzLmRpc3BsYWNlbWVudFkgPSAwO1xufTtcblxuQ29TRU5vZGUucHJvdG90eXBlLnByb3BvZ2F0ZURpc3BsYWNlbWVudFRvQ2hpbGRyZW4gPSBmdW5jdGlvbiAoZFgsIGRZKVxue1xuICB2YXIgbm9kZXMgPSB0aGlzLmdldENoaWxkKCkuZ2V0Tm9kZXMoKTtcbiAgdmFyIG5vZGU7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspXG4gIHtcbiAgICBub2RlID0gbm9kZXNbaV07XG4gICAgaWYgKG5vZGUuZ2V0Q2hpbGQoKSA9PSBudWxsKVxuICAgIHtcbiAgICAgIG5vZGUubW92ZUJ5KGRYLCBkWSk7XG4gICAgICBub2RlLmRpc3BsYWNlbWVudFggKz0gZFg7XG4gICAgICBub2RlLmRpc3BsYWNlbWVudFkgKz0gZFk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBub2RlLnByb3BvZ2F0ZURpc3BsYWNlbWVudFRvQ2hpbGRyZW4oZFgsIGRZKTtcbiAgICB9XG4gIH1cbn07XG5cbkNvU0VOb2RlLnByb3RvdHlwZS5zZXRQcmVkMSA9IGZ1bmN0aW9uIChwcmVkMSlcbntcbiAgdGhpcy5wcmVkMSA9IHByZWQxO1xufTtcblxuQ29TRU5vZGUucHJvdG90eXBlLmdldFByZWQxID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHByZWQxO1xufTtcblxuQ29TRU5vZGUucHJvdG90eXBlLmdldFByZWQyID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHByZWQyO1xufTtcblxuQ29TRU5vZGUucHJvdG90eXBlLnNldE5leHQgPSBmdW5jdGlvbiAobmV4dClcbntcbiAgdGhpcy5uZXh0ID0gbmV4dDtcbn07XG5cbkNvU0VOb2RlLnByb3RvdHlwZS5nZXROZXh0ID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIG5leHQ7XG59O1xuXG5Db1NFTm9kZS5wcm90b3R5cGUuc2V0UHJvY2Vzc2VkID0gZnVuY3Rpb24gKHByb2Nlc3NlZClcbntcbiAgdGhpcy5wcm9jZXNzZWQgPSBwcm9jZXNzZWQ7XG59O1xuXG5Db1NFTm9kZS5wcm90b3R5cGUuaXNQcm9jZXNzZWQgPSBmdW5jdGlvbiAoKVxue1xuICByZXR1cm4gcHJvY2Vzc2VkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb1NFTm9kZTtcbiIsImZ1bmN0aW9uIERpbWVuc2lvbkQod2lkdGgsIGhlaWdodCkge1xuICB0aGlzLndpZHRoID0gMDtcbiAgdGhpcy5oZWlnaHQgPSAwO1xuICBpZiAod2lkdGggIT09IG51bGwgJiYgaGVpZ2h0ICE9PSBudWxsKSB7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICB9XG59XG5cbkRpbWVuc2lvbkQucHJvdG90eXBlLmdldFdpZHRoID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHRoaXMud2lkdGg7XG59O1xuXG5EaW1lbnNpb25ELnByb3RvdHlwZS5zZXRXaWR0aCA9IGZ1bmN0aW9uICh3aWR0aClcbntcbiAgdGhpcy53aWR0aCA9IHdpZHRoO1xufTtcblxuRGltZW5zaW9uRC5wcm90b3R5cGUuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xufTtcblxuRGltZW5zaW9uRC5wcm90b3R5cGUuc2V0SGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodClcbntcbiAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpbWVuc2lvbkQ7XG4iLCJmdW5jdGlvbiBFbWl0dGVyKCl7XG4gIHRoaXMubGlzdGVuZXJzID0gW107XG59XG5cbnZhciBwID0gRW1pdHRlci5wcm90b3R5cGU7XG5cbnAuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiggZXZlbnQsIGNhbGxiYWNrICl7XG4gIHRoaXMubGlzdGVuZXJzLnB1c2goe1xuICAgIGV2ZW50OiBldmVudCxcbiAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgfSk7XG59O1xuXG5wLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24oIGV2ZW50LCBjYWxsYmFjayApe1xuICBmb3IoIHZhciBpID0gdGhpcy5saXN0ZW5lcnMubGVuZ3RoOyBpID49IDA7IGktLSApe1xuICAgIHZhciBsID0gdGhpcy5saXN0ZW5lcnNbaV07XG5cbiAgICBpZiggbC5ldmVudCA9PT0gZXZlbnQgJiYgbC5jYWxsYmFjayA9PT0gY2FsbGJhY2sgKXtcbiAgICAgIHRoaXMubGlzdGVuZXJzLnNwbGljZSggaSwgMSApO1xuICAgIH1cbiAgfVxufTtcblxucC5lbWl0ID0gZnVuY3Rpb24oIGV2ZW50LCBkYXRhICl7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgdGhpcy5saXN0ZW5lcnMubGVuZ3RoOyBpKysgKXtcbiAgICB2YXIgbCA9IHRoaXMubGlzdGVuZXJzW2ldO1xuXG4gICAgaWYoIGV2ZW50ID09PSBsLmV2ZW50ICl7XG4gICAgICBsLmNhbGxiYWNrKCBkYXRhICk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XG4iLCJ2YXIgTGF5b3V0ID0gcmVxdWlyZSgnLi9MYXlvdXQnKTtcbnZhciBGRExheW91dENvbnN0YW50cyA9IHJlcXVpcmUoJy4vRkRMYXlvdXRDb25zdGFudHMnKTtcbnZhciBMYXlvdXRDb25zdGFudHMgPSByZXF1aXJlKCcuL0xheW91dENvbnN0YW50cycpO1xudmFyIElHZW9tZXRyeSA9IHJlcXVpcmUoJy4vSUdlb21ldHJ5Jyk7XG52YXIgSU1hdGggPSByZXF1aXJlKCcuL0lNYXRoJyk7XG52YXIgSW50ZWdlciA9IHJlcXVpcmUoJy4vSW50ZWdlcicpO1xuXG5mdW5jdGlvbiBGRExheW91dCgpIHtcbiAgTGF5b3V0LmNhbGwodGhpcyk7XG5cbiAgdGhpcy51c2VTbWFydElkZWFsRWRnZUxlbmd0aENhbGN1bGF0aW9uID0gRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9VU0VfU01BUlRfSURFQUxfRURHRV9MRU5HVEhfQ0FMQ1VMQVRJT047XG4gIHRoaXMuaWRlYWxFZGdlTGVuZ3RoID0gRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9FREdFX0xFTkdUSDtcbiAgdGhpcy5zcHJpbmdDb25zdGFudCA9IEZETGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfU1BSSU5HX1NUUkVOR1RIO1xuICB0aGlzLnJlcHVsc2lvbkNvbnN0YW50ID0gRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9SRVBVTFNJT05fU1RSRU5HVEg7XG4gIHRoaXMuZ3Jhdml0eUNvbnN0YW50ID0gRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9HUkFWSVRZX1NUUkVOR1RIO1xuICB0aGlzLmNvbXBvdW5kR3Jhdml0eUNvbnN0YW50ID0gRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9DT01QT1VORF9HUkFWSVRZX1NUUkVOR1RIO1xuICB0aGlzLmdyYXZpdHlSYW5nZUZhY3RvciA9IEZETGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfR1JBVklUWV9SQU5HRV9GQUNUT1I7XG4gIHRoaXMuY29tcG91bmRHcmF2aXR5UmFuZ2VGYWN0b3IgPSBGRExheW91dENvbnN0YW50cy5ERUZBVUxUX0NPTVBPVU5EX0dSQVZJVFlfUkFOR0VfRkFDVE9SO1xuICB0aGlzLmRpc3BsYWNlbWVudFRocmVzaG9sZFBlck5vZGUgPSAoMy4wICogRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9FREdFX0xFTkdUSCkgLyAxMDA7XG4gIHRoaXMuY29vbGluZ0ZhY3RvciA9IEZETGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfQ09PTElOR19GQUNUT1JfSU5DUkVNRU5UQUw7XG4gIHRoaXMuaW5pdGlhbENvb2xpbmdGYWN0b3IgPSBGRExheW91dENvbnN0YW50cy5ERUZBVUxUX0NPT0xJTkdfRkFDVE9SX0lOQ1JFTUVOVEFMO1xuICB0aGlzLnRvdGFsRGlzcGxhY2VtZW50ID0gMC4wO1xuICB0aGlzLm9sZFRvdGFsRGlzcGxhY2VtZW50ID0gMC4wO1xuICB0aGlzLm1heEl0ZXJhdGlvbnMgPSBGRExheW91dENvbnN0YW50cy5NQVhfSVRFUkFUSU9OUztcbn1cblxuRkRMYXlvdXQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShMYXlvdXQucHJvdG90eXBlKTtcblxuZm9yICh2YXIgcHJvcCBpbiBMYXlvdXQpIHtcbiAgRkRMYXlvdXRbcHJvcF0gPSBMYXlvdXRbcHJvcF07XG59XG5cbkZETGF5b3V0LnByb3RvdHlwZS5pbml0UGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgTGF5b3V0LnByb3RvdHlwZS5pbml0UGFyYW1ldGVycy5jYWxsKHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgaWYgKHRoaXMubGF5b3V0UXVhbGl0eSA9PSBMYXlvdXRDb25zdGFudHMuRFJBRlRfUVVBTElUWSlcbiAge1xuICAgIHRoaXMuZGlzcGxhY2VtZW50VGhyZXNob2xkUGVyTm9kZSArPSAwLjMwO1xuICAgIHRoaXMubWF4SXRlcmF0aW9ucyAqPSAwLjg7XG4gIH1cbiAgZWxzZSBpZiAodGhpcy5sYXlvdXRRdWFsaXR5ID09IExheW91dENvbnN0YW50cy5QUk9PRl9RVUFMSVRZKVxuICB7XG4gICAgdGhpcy5kaXNwbGFjZW1lbnRUaHJlc2hvbGRQZXJOb2RlIC09IDAuMzA7XG4gICAgdGhpcy5tYXhJdGVyYXRpb25zICo9IDEuMjtcbiAgfVxuXG4gIHRoaXMudG90YWxJdGVyYXRpb25zID0gMDtcbiAgdGhpcy5ub3RBbmltYXRlZEl0ZXJhdGlvbnMgPSAwO1xuXG4gIHRoaXMudXNlRlJHcmlkVmFyaWFudCA9IEZETGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfVVNFX1NNQVJUX1JFUFVMU0lPTl9SQU5HRV9DQUxDVUxBVElPTjtcbiAgXG4gIHRoaXMuZ3JpZCA9IFtdO1xuICAvLyB2YXJpYWJsZXMgZm9yIHRyZWUgcmVkdWN0aW9uIHN1cHBvcnRcbiAgdGhpcy5wcnVuZWROb2Rlc0FsbCA9IFtdO1xuICB0aGlzLmdyb3dUcmVlSXRlcmF0aW9ucyA9IDA7XG4gIHRoaXMuYWZ0ZXJHcm93dGhJdGVyYXRpb25zID0gMDtcbiAgdGhpcy5pc1RyZWVHcm93aW5nID0gZmFsc2U7XG4gIHRoaXMuaXNHcm93dGhGaW5pc2hlZCA9IGZhbHNlO1xufTtcblxuRkRMYXlvdXQucHJvdG90eXBlLmNhbGNJZGVhbEVkZ2VMZW5ndGhzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZWRnZTtcbiAgdmFyIGxjYURlcHRoO1xuICB2YXIgc291cmNlO1xuICB2YXIgdGFyZ2V0O1xuICB2YXIgc2l6ZU9mU291cmNlSW5MY2E7XG4gIHZhciBzaXplT2ZUYXJnZXRJbkxjYTtcblxuICB2YXIgYWxsRWRnZXMgPSB0aGlzLmdldEdyYXBoTWFuYWdlcigpLmdldEFsbEVkZ2VzKCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsRWRnZXMubGVuZ3RoOyBpKyspXG4gIHtcbiAgICBlZGdlID0gYWxsRWRnZXNbaV07XG5cbiAgICBlZGdlLmlkZWFsTGVuZ3RoID0gdGhpcy5pZGVhbEVkZ2VMZW5ndGg7XG5cbiAgICBpZiAoZWRnZS5pc0ludGVyR3JhcGgpXG4gICAge1xuICAgICAgc291cmNlID0gZWRnZS5nZXRTb3VyY2UoKTtcbiAgICAgIHRhcmdldCA9IGVkZ2UuZ2V0VGFyZ2V0KCk7XG5cbiAgICAgIHNpemVPZlNvdXJjZUluTGNhID0gZWRnZS5nZXRTb3VyY2VJbkxjYSgpLmdldEVzdGltYXRlZFNpemUoKTtcbiAgICAgIHNpemVPZlRhcmdldEluTGNhID0gZWRnZS5nZXRUYXJnZXRJbkxjYSgpLmdldEVzdGltYXRlZFNpemUoKTtcblxuICAgICAgaWYgKHRoaXMudXNlU21hcnRJZGVhbEVkZ2VMZW5ndGhDYWxjdWxhdGlvbilcbiAgICAgIHtcbiAgICAgICAgZWRnZS5pZGVhbExlbmd0aCArPSBzaXplT2ZTb3VyY2VJbkxjYSArIHNpemVPZlRhcmdldEluTGNhIC1cbiAgICAgICAgICAgICAgICAyICogTGF5b3V0Q29uc3RhbnRzLlNJTVBMRV9OT0RFX1NJWkU7XG4gICAgICB9XG5cbiAgICAgIGxjYURlcHRoID0gZWRnZS5nZXRMY2EoKS5nZXRJbmNsdXNpb25UcmVlRGVwdGgoKTtcblxuICAgICAgZWRnZS5pZGVhbExlbmd0aCArPSBGRExheW91dENvbnN0YW50cy5ERUZBVUxUX0VER0VfTEVOR1RIICpcbiAgICAgICAgICAgICAgRkRMYXlvdXRDb25zdGFudHMuUEVSX0xFVkVMX0lERUFMX0VER0VfTEVOR1RIX0ZBQ1RPUiAqXG4gICAgICAgICAgICAgIChzb3VyY2UuZ2V0SW5jbHVzaW9uVHJlZURlcHRoKCkgK1xuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5nZXRJbmNsdXNpb25UcmVlRGVwdGgoKSAtIDIgKiBsY2FEZXB0aCk7XG4gICAgfVxuICB9XG59O1xuXG5GRExheW91dC5wcm90b3R5cGUuaW5pdFNwcmluZ0VtYmVkZGVyID0gZnVuY3Rpb24gKCkge1xuXG4gIGlmICh0aGlzLmluY3JlbWVudGFsKVxuICB7XG4gICAgdGhpcy5tYXhOb2RlRGlzcGxhY2VtZW50ID1cbiAgICAgICAgICAgIEZETGF5b3V0Q29uc3RhbnRzLk1BWF9OT0RFX0RJU1BMQUNFTUVOVF9JTkNSRU1FTlRBTDtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICB0aGlzLmNvb2xpbmdGYWN0b3IgPSAxLjA7XG4gICAgdGhpcy5pbml0aWFsQ29vbGluZ0ZhY3RvciA9IDEuMDtcbiAgICB0aGlzLm1heE5vZGVEaXNwbGFjZW1lbnQgPVxuICAgICAgICAgICAgRkRMYXlvdXRDb25zdGFudHMuTUFYX05PREVfRElTUExBQ0VNRU5UO1xuICB9XG5cbiAgdGhpcy5tYXhJdGVyYXRpb25zID1cbiAgICAgICAgICBNYXRoLm1heCh0aGlzLmdldEFsbE5vZGVzKCkubGVuZ3RoICogNSwgdGhpcy5tYXhJdGVyYXRpb25zKTtcblxuICB0aGlzLnRvdGFsRGlzcGxhY2VtZW50VGhyZXNob2xkID1cbiAgICAgICAgICB0aGlzLmRpc3BsYWNlbWVudFRocmVzaG9sZFBlck5vZGUgKiB0aGlzLmdldEFsbE5vZGVzKCkubGVuZ3RoO1xuXG4gIHRoaXMucmVwdWxzaW9uUmFuZ2UgPSB0aGlzLmNhbGNSZXB1bHNpb25SYW5nZSgpO1xufTtcblxuRkRMYXlvdXQucHJvdG90eXBlLmNhbGNTcHJpbmdGb3JjZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBsRWRnZXMgPSB0aGlzLmdldEFsbEVkZ2VzKCk7XG4gIHZhciBlZGdlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbEVkZ2VzLmxlbmd0aDsgaSsrKVxuICB7XG4gICAgZWRnZSA9IGxFZGdlc1tpXTtcblxuICAgIHRoaXMuY2FsY1NwcmluZ0ZvcmNlKGVkZ2UsIGVkZ2UuaWRlYWxMZW5ndGgpO1xuICB9XG59O1xuXG5GRExheW91dC5wcm90b3R5cGUuY2FsY1JlcHVsc2lvbkZvcmNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGksIGo7XG4gIHZhciBub2RlQSwgbm9kZUI7XG4gIHZhciBsTm9kZXMgPSB0aGlzLmdldEFsbE5vZGVzKCk7XG4gIHZhciBwcm9jZXNzZWROb2RlU2V0O1xuXG4gIGlmICh0aGlzLnVzZUZSR3JpZFZhcmlhbnQpXG4gIHsgICAgICAgXG4gICAgaWYgKCh0aGlzLnRvdGFsSXRlcmF0aW9ucyAlIEZETGF5b3V0Q29uc3RhbnRzLkdSSURfQ0FMQ1VMQVRJT05fQ0hFQ0tfUEVSSU9EID09IDEgJiYgIXRoaXMuaXNUcmVlR3Jvd2luZyAmJiAhdGhpcy5pc0dyb3d0aEZpbmlzaGVkKSlcbiAgICB7ICAgICAgIFxuICAgICAgdGhpcy51cGRhdGVHcmlkKCk7ICBcbiAgICB9XG5cbiAgICBwcm9jZXNzZWROb2RlU2V0ID0gbmV3IFNldCgpO1xuICAgIFxuICAgIC8vIGNhbGN1bGF0ZSByZXB1bHNpb24gZm9yY2VzIGJldHdlZW4gZWFjaCBub2RlcyBhbmQgaXRzIHN1cnJvdW5kaW5nXG4gICAgZm9yIChpID0gMDsgaSA8IGxOb2Rlcy5sZW5ndGg7IGkrKylcbiAgICB7XG4gICAgICBub2RlQSA9IGxOb2Rlc1tpXTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlUmVwdWxzaW9uRm9yY2VPZkFOb2RlKG5vZGVBLCBwcm9jZXNzZWROb2RlU2V0KTtcbiAgICAgIHByb2Nlc3NlZE5vZGVTZXQuYWRkKG5vZGVBKTtcbiAgICB9XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgZm9yIChpID0gMDsgaSA8IGxOb2Rlcy5sZW5ndGg7IGkrKylcbiAgICB7XG4gICAgICBub2RlQSA9IGxOb2Rlc1tpXTtcblxuICAgICAgZm9yIChqID0gaSArIDE7IGogPCBsTm9kZXMubGVuZ3RoOyBqKyspXG4gICAgICB7XG4gICAgICAgIG5vZGVCID0gbE5vZGVzW2pdO1xuXG4gICAgICAgIC8vIElmIGJvdGggbm9kZXMgYXJlIG5vdCBtZW1iZXJzIG9mIHRoZSBzYW1lIGdyYXBoLCBza2lwLlxuICAgICAgICBpZiAobm9kZUEuZ2V0T3duZXIoKSAhPSBub2RlQi5nZXRPd25lcigpKVxuICAgICAgICB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGNSZXB1bHNpb25Gb3JjZShub2RlQSwgbm9kZUIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuRkRMYXlvdXQucHJvdG90eXBlLmNhbGNHcmF2aXRhdGlvbmFsRm9yY2VzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbm9kZTtcbiAgdmFyIGFsbE5vZGVzID0gbmV3IFNldCh0aGlzLmdldEFsbE5vZGVzKCkpO1xuICB2YXIgbE5vZGVzID0gdGhpcy5nZXRBbGxOb2Rlc1RvQXBwbHlHcmF2aXRhdGlvbigpO1xuICBcbiAgdmFyIGludGVyc2VjdGlvbiA9IGxOb2Rlcy5maWx0ZXIoeCA9PiBhbGxOb2Rlcy5oYXMoeCkpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW50ZXJzZWN0aW9uLmxlbmd0aDsgaSsrKVxuICB7XG4gICAgbm9kZSA9IGludGVyc2VjdGlvbltpXTtcbiAgICB0aGlzLmNhbGNHcmF2aXRhdGlvbmFsRm9yY2Uobm9kZSk7XG4gIH1cbn07XG5cbkZETGF5b3V0LnByb3RvdHlwZS5tb3ZlTm9kZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBsTm9kZXMgPSB0aGlzLmdldEFsbE5vZGVzKCk7XG4gIHZhciBub2RlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbE5vZGVzLmxlbmd0aDsgaSsrKVxuICB7XG4gICAgbm9kZSA9IGxOb2Rlc1tpXTtcbiAgICBub2RlLm1vdmUoKTtcbiAgfVxufVxuXG5GRExheW91dC5wcm90b3R5cGUuY2FsY1NwcmluZ0ZvcmNlID0gZnVuY3Rpb24gKGVkZ2UsIGlkZWFsTGVuZ3RoKSB7XG4gIHZhciBzb3VyY2VOb2RlID0gZWRnZS5nZXRTb3VyY2UoKTtcbiAgdmFyIHRhcmdldE5vZGUgPSBlZGdlLmdldFRhcmdldCgpO1xuXG4gIHZhciBsZW5ndGg7XG4gIHZhciBzcHJpbmdGb3JjZTtcbiAgdmFyIHNwcmluZ0ZvcmNlWDtcbiAgdmFyIHNwcmluZ0ZvcmNlWTtcblxuICAvLyBVcGRhdGUgZWRnZSBsZW5ndGhcbiAgaWYgKHRoaXMudW5pZm9ybUxlYWZOb2RlU2l6ZXMgJiZcbiAgICAgICAgICBzb3VyY2VOb2RlLmdldENoaWxkKCkgPT0gbnVsbCAmJiB0YXJnZXROb2RlLmdldENoaWxkKCkgPT0gbnVsbClcbiAge1xuICAgIGVkZ2UudXBkYXRlTGVuZ3RoU2ltcGxlKCk7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgZWRnZS51cGRhdGVMZW5ndGgoKTtcblxuICAgIGlmIChlZGdlLmlzT3ZlcmxhcGluZ1NvdXJjZUFuZFRhcmdldClcbiAgICB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgbGVuZ3RoID0gZWRnZS5nZXRMZW5ndGgoKTtcblxuICAvLyBDYWxjdWxhdGUgc3ByaW5nIGZvcmNlc1xuICBzcHJpbmdGb3JjZSA9IHRoaXMuc3ByaW5nQ29uc3RhbnQgKiAobGVuZ3RoIC0gaWRlYWxMZW5ndGgpO1xuXG4gIC8vIFByb2plY3QgZm9yY2Ugb250byB4IGFuZCB5IGF4ZXNcbiAgc3ByaW5nRm9yY2VYID0gc3ByaW5nRm9yY2UgKiAoZWRnZS5sZW5ndGhYIC8gbGVuZ3RoKTtcbiAgc3ByaW5nRm9yY2VZID0gc3ByaW5nRm9yY2UgKiAoZWRnZS5sZW5ndGhZIC8gbGVuZ3RoKTtcblxuICAvLyBBcHBseSBmb3JjZXMgb24gdGhlIGVuZCBub2Rlc1xuICBzb3VyY2VOb2RlLnNwcmluZ0ZvcmNlWCArPSBzcHJpbmdGb3JjZVg7XG4gIHNvdXJjZU5vZGUuc3ByaW5nRm9yY2VZICs9IHNwcmluZ0ZvcmNlWTtcbiAgdGFyZ2V0Tm9kZS5zcHJpbmdGb3JjZVggLT0gc3ByaW5nRm9yY2VYO1xuICB0YXJnZXROb2RlLnNwcmluZ0ZvcmNlWSAtPSBzcHJpbmdGb3JjZVk7XG59O1xuXG5GRExheW91dC5wcm90b3R5cGUuY2FsY1JlcHVsc2lvbkZvcmNlID0gZnVuY3Rpb24gKG5vZGVBLCBub2RlQikge1xuICB2YXIgcmVjdEEgPSBub2RlQS5nZXRSZWN0KCk7XG4gIHZhciByZWN0QiA9IG5vZGVCLmdldFJlY3QoKTtcbiAgdmFyIG92ZXJsYXBBbW91bnQgPSBuZXcgQXJyYXkoMik7XG4gIHZhciBjbGlwUG9pbnRzID0gbmV3IEFycmF5KDQpO1xuICB2YXIgZGlzdGFuY2VYO1xuICB2YXIgZGlzdGFuY2VZO1xuICB2YXIgZGlzdGFuY2VTcXVhcmVkO1xuICB2YXIgZGlzdGFuY2U7XG4gIHZhciByZXB1bHNpb25Gb3JjZTtcbiAgdmFyIHJlcHVsc2lvbkZvcmNlWDtcbiAgdmFyIHJlcHVsc2lvbkZvcmNlWTtcblxuICBpZiAocmVjdEEuaW50ZXJzZWN0cyhyZWN0QikpLy8gdHdvIG5vZGVzIG92ZXJsYXBcbiAge1xuICAgIC8vIGNhbGN1bGF0ZSBzZXBhcmF0aW9uIGFtb3VudCBpbiB4IGFuZCB5IGRpcmVjdGlvbnNcbiAgICBJR2VvbWV0cnkuY2FsY1NlcGFyYXRpb25BbW91bnQocmVjdEEsXG4gICAgICAgICAgICByZWN0QixcbiAgICAgICAgICAgIG92ZXJsYXBBbW91bnQsXG4gICAgICAgICAgICBGRExheW91dENvbnN0YW50cy5ERUZBVUxUX0VER0VfTEVOR1RIIC8gMi4wKTtcblxuICAgIHJlcHVsc2lvbkZvcmNlWCA9IDIgKiBvdmVybGFwQW1vdW50WzBdO1xuICAgIHJlcHVsc2lvbkZvcmNlWSA9IDIgKiBvdmVybGFwQW1vdW50WzFdO1xuICAgIFxuICAgIHZhciBjaGlsZHJlbkNvbnN0YW50ID0gbm9kZUEubm9PZkNoaWxkcmVuICogbm9kZUIubm9PZkNoaWxkcmVuIC8gKG5vZGVBLm5vT2ZDaGlsZHJlbiArIG5vZGVCLm5vT2ZDaGlsZHJlbik7XG4gICAgXG4gICAgLy8gQXBwbHkgZm9yY2VzIG9uIHRoZSB0d28gbm9kZXNcbiAgICBub2RlQS5yZXB1bHNpb25Gb3JjZVggLT0gY2hpbGRyZW5Db25zdGFudCAqIHJlcHVsc2lvbkZvcmNlWDtcbiAgICBub2RlQS5yZXB1bHNpb25Gb3JjZVkgLT0gY2hpbGRyZW5Db25zdGFudCAqIHJlcHVsc2lvbkZvcmNlWTtcbiAgICBub2RlQi5yZXB1bHNpb25Gb3JjZVggKz0gY2hpbGRyZW5Db25zdGFudCAqIHJlcHVsc2lvbkZvcmNlWDtcbiAgICBub2RlQi5yZXB1bHNpb25Gb3JjZVkgKz0gY2hpbGRyZW5Db25zdGFudCAqIHJlcHVsc2lvbkZvcmNlWTtcbiAgfVxuICBlbHNlLy8gbm8gb3ZlcmxhcFxuICB7XG4gICAgLy8gY2FsY3VsYXRlIGRpc3RhbmNlXG5cbiAgICBpZiAodGhpcy51bmlmb3JtTGVhZk5vZGVTaXplcyAmJlxuICAgICAgICAgICAgbm9kZUEuZ2V0Q2hpbGQoKSA9PSBudWxsICYmIG5vZGVCLmdldENoaWxkKCkgPT0gbnVsbCkvLyBzaW1wbHkgYmFzZSByZXB1bHNpb24gb24gZGlzdGFuY2Ugb2Ygbm9kZSBjZW50ZXJzXG4gICAge1xuICAgICAgZGlzdGFuY2VYID0gcmVjdEIuZ2V0Q2VudGVyWCgpIC0gcmVjdEEuZ2V0Q2VudGVyWCgpO1xuICAgICAgZGlzdGFuY2VZID0gcmVjdEIuZ2V0Q2VudGVyWSgpIC0gcmVjdEEuZ2V0Q2VudGVyWSgpO1xuICAgIH1cbiAgICBlbHNlLy8gdXNlIGNsaXBwaW5nIHBvaW50c1xuICAgIHtcbiAgICAgIElHZW9tZXRyeS5nZXRJbnRlcnNlY3Rpb24ocmVjdEEsIHJlY3RCLCBjbGlwUG9pbnRzKTtcblxuICAgICAgZGlzdGFuY2VYID0gY2xpcFBvaW50c1syXSAtIGNsaXBQb2ludHNbMF07XG4gICAgICBkaXN0YW5jZVkgPSBjbGlwUG9pbnRzWzNdIC0gY2xpcFBvaW50c1sxXTtcbiAgICB9XG5cbiAgICAvLyBObyByZXB1bHNpb24gcmFuZ2UuIEZSIGdyaWQgdmFyaWFudCBzaG91bGQgdGFrZSBjYXJlIG9mIHRoaXMuXG4gICAgaWYgKE1hdGguYWJzKGRpc3RhbmNlWCkgPCBGRExheW91dENvbnN0YW50cy5NSU5fUkVQVUxTSU9OX0RJU1QpXG4gICAge1xuICAgICAgZGlzdGFuY2VYID0gSU1hdGguc2lnbihkaXN0YW5jZVgpICpcbiAgICAgICAgICAgICAgRkRMYXlvdXRDb25zdGFudHMuTUlOX1JFUFVMU0lPTl9ESVNUO1xuICAgIH1cblxuICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZVkpIDwgRkRMYXlvdXRDb25zdGFudHMuTUlOX1JFUFVMU0lPTl9ESVNUKVxuICAgIHtcbiAgICAgIGRpc3RhbmNlWSA9IElNYXRoLnNpZ24oZGlzdGFuY2VZKSAqXG4gICAgICAgICAgICAgIEZETGF5b3V0Q29uc3RhbnRzLk1JTl9SRVBVTFNJT05fRElTVDtcbiAgICB9XG5cbiAgICBkaXN0YW5jZVNxdWFyZWQgPSBkaXN0YW5jZVggKiBkaXN0YW5jZVggKyBkaXN0YW5jZVkgKiBkaXN0YW5jZVk7XG4gICAgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZGlzdGFuY2VTcXVhcmVkKTtcblxuICAgIHJlcHVsc2lvbkZvcmNlID0gdGhpcy5yZXB1bHNpb25Db25zdGFudCAqIG5vZGVBLm5vT2ZDaGlsZHJlbiAqIG5vZGVCLm5vT2ZDaGlsZHJlbiAvIGRpc3RhbmNlU3F1YXJlZDtcblxuICAgIC8vIFByb2plY3QgZm9yY2Ugb250byB4IGFuZCB5IGF4ZXNcbiAgICByZXB1bHNpb25Gb3JjZVggPSByZXB1bHNpb25Gb3JjZSAqIGRpc3RhbmNlWCAvIGRpc3RhbmNlO1xuICAgIHJlcHVsc2lvbkZvcmNlWSA9IHJlcHVsc2lvbkZvcmNlICogZGlzdGFuY2VZIC8gZGlzdGFuY2U7XG4gICAgIFxuICAgIC8vIEFwcGx5IGZvcmNlcyBvbiB0aGUgdHdvIG5vZGVzICAgIFxuICAgIG5vZGVBLnJlcHVsc2lvbkZvcmNlWCAtPSByZXB1bHNpb25Gb3JjZVg7XG4gICAgbm9kZUEucmVwdWxzaW9uRm9yY2VZIC09IHJlcHVsc2lvbkZvcmNlWTtcbiAgICBub2RlQi5yZXB1bHNpb25Gb3JjZVggKz0gcmVwdWxzaW9uRm9yY2VYO1xuICAgIG5vZGVCLnJlcHVsc2lvbkZvcmNlWSArPSByZXB1bHNpb25Gb3JjZVk7XG4gIH1cbn07XG5cbkZETGF5b3V0LnByb3RvdHlwZS5jYWxjR3Jhdml0YXRpb25hbEZvcmNlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgdmFyIG93bmVyR3JhcGg7XG4gIHZhciBvd25lckNlbnRlclg7XG4gIHZhciBvd25lckNlbnRlclk7XG4gIHZhciBkaXN0YW5jZVg7XG4gIHZhciBkaXN0YW5jZVk7XG4gIHZhciBhYnNEaXN0YW5jZVg7XG4gIHZhciBhYnNEaXN0YW5jZVk7XG4gIHZhciBlc3RpbWF0ZWRTaXplO1xuICBvd25lckdyYXBoID0gbm9kZS5nZXRPd25lcigpO1xuXG4gIG93bmVyQ2VudGVyWCA9IChvd25lckdyYXBoLmdldFJpZ2h0KCkgKyBvd25lckdyYXBoLmdldExlZnQoKSkgLyAyO1xuICBvd25lckNlbnRlclkgPSAob3duZXJHcmFwaC5nZXRUb3AoKSArIG93bmVyR3JhcGguZ2V0Qm90dG9tKCkpIC8gMjtcbiAgZGlzdGFuY2VYID0gbm9kZS5nZXRDZW50ZXJYKCkgLSBvd25lckNlbnRlclg7XG4gIGRpc3RhbmNlWSA9IG5vZGUuZ2V0Q2VudGVyWSgpIC0gb3duZXJDZW50ZXJZO1xuICBhYnNEaXN0YW5jZVggPSBNYXRoLmFicyhkaXN0YW5jZVgpICsgbm9kZS5nZXRXaWR0aCgpIC8gMjtcbiAgYWJzRGlzdGFuY2VZID0gTWF0aC5hYnMoZGlzdGFuY2VZKSArIG5vZGUuZ2V0SGVpZ2h0KCkgLyAyO1xuXG4gIGlmIChub2RlLmdldE93bmVyKCkgPT0gdGhpcy5ncmFwaE1hbmFnZXIuZ2V0Um9vdCgpKS8vIGluIHRoZSByb290IGdyYXBoXG4gIHtcbiAgICBlc3RpbWF0ZWRTaXplID0gb3duZXJHcmFwaC5nZXRFc3RpbWF0ZWRTaXplKCkgKiB0aGlzLmdyYXZpdHlSYW5nZUZhY3RvcjtcblxuICAgIGlmIChhYnNEaXN0YW5jZVggPiBlc3RpbWF0ZWRTaXplIHx8IGFic0Rpc3RhbmNlWSA+IGVzdGltYXRlZFNpemUpXG4gICAge1xuICAgICAgbm9kZS5ncmF2aXRhdGlvbkZvcmNlWCA9IC10aGlzLmdyYXZpdHlDb25zdGFudCAqIGRpc3RhbmNlWDtcbiAgICAgIG5vZGUuZ3Jhdml0YXRpb25Gb3JjZVkgPSAtdGhpcy5ncmF2aXR5Q29uc3RhbnQgKiBkaXN0YW5jZVk7XG4gICAgfVxuICB9XG4gIGVsc2UvLyBpbnNpZGUgYSBjb21wb3VuZFxuICB7XG4gICAgZXN0aW1hdGVkU2l6ZSA9IG93bmVyR3JhcGguZ2V0RXN0aW1hdGVkU2l6ZSgpICogdGhpcy5jb21wb3VuZEdyYXZpdHlSYW5nZUZhY3RvcjtcblxuICAgIGlmIChhYnNEaXN0YW5jZVggPiBlc3RpbWF0ZWRTaXplIHx8IGFic0Rpc3RhbmNlWSA+IGVzdGltYXRlZFNpemUpXG4gICAge1xuICAgICAgbm9kZS5ncmF2aXRhdGlvbkZvcmNlWCA9IC10aGlzLmdyYXZpdHlDb25zdGFudCAqIGRpc3RhbmNlWCAqXG4gICAgICAgICAgICAgIHRoaXMuY29tcG91bmRHcmF2aXR5Q29uc3RhbnQ7XG4gICAgICBub2RlLmdyYXZpdGF0aW9uRm9yY2VZID0gLXRoaXMuZ3Jhdml0eUNvbnN0YW50ICogZGlzdGFuY2VZICpcbiAgICAgICAgICAgICAgdGhpcy5jb21wb3VuZEdyYXZpdHlDb25zdGFudDtcbiAgICB9XG4gIH1cbn07XG5cbkZETGF5b3V0LnByb3RvdHlwZS5pc0NvbnZlcmdlZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNvbnZlcmdlZDtcbiAgdmFyIG9zY2lsYXRpbmcgPSBmYWxzZTtcblxuICBpZiAodGhpcy50b3RhbEl0ZXJhdGlvbnMgPiB0aGlzLm1heEl0ZXJhdGlvbnMgLyAzKVxuICB7XG4gICAgb3NjaWxhdGluZyA9XG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLnRvdGFsRGlzcGxhY2VtZW50IC0gdGhpcy5vbGRUb3RhbERpc3BsYWNlbWVudCkgPCAyO1xuICB9XG5cbiAgY29udmVyZ2VkID0gdGhpcy50b3RhbERpc3BsYWNlbWVudCA8IHRoaXMudG90YWxEaXNwbGFjZW1lbnRUaHJlc2hvbGQ7XG5cbiAgdGhpcy5vbGRUb3RhbERpc3BsYWNlbWVudCA9IHRoaXMudG90YWxEaXNwbGFjZW1lbnQ7XG5cbiAgcmV0dXJuIGNvbnZlcmdlZCB8fCBvc2NpbGF0aW5nO1xufTtcblxuRkRMYXlvdXQucHJvdG90eXBlLmFuaW1hdGUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmFuaW1hdGlvbkR1cmluZ0xheW91dCAmJiAhdGhpcy5pc1N1YkxheW91dClcbiAge1xuICAgIGlmICh0aGlzLm5vdEFuaW1hdGVkSXRlcmF0aW9ucyA9PSB0aGlzLmFuaW1hdGlvblBlcmlvZClcbiAgICB7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgdGhpcy5ub3RBbmltYXRlZEl0ZXJhdGlvbnMgPSAwO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgdGhpcy5ub3RBbmltYXRlZEl0ZXJhdGlvbnMrKztcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBTZWN0aW9uOiBGUi1HcmlkIFZhcmlhbnQgUmVwdWxzaW9uIEZvcmNlIENhbGN1bGF0aW9uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5GRExheW91dC5wcm90b3R5cGUuY2FsY0dyaWQgPSBmdW5jdGlvbiAoZ3JhcGgpe1xuXG4gIHZhciBzaXplWCA9IDA7IFxuICB2YXIgc2l6ZVkgPSAwO1xuICBcbiAgc2l6ZVggPSBwYXJzZUludChNYXRoLmNlaWwoKGdyYXBoLmdldFJpZ2h0KCkgLSBncmFwaC5nZXRMZWZ0KCkpIC8gdGhpcy5yZXB1bHNpb25SYW5nZSkpO1xuICBzaXplWSA9IHBhcnNlSW50KE1hdGguY2VpbCgoZ3JhcGguZ2V0Qm90dG9tKCkgLSBncmFwaC5nZXRUb3AoKSkgLyB0aGlzLnJlcHVsc2lvblJhbmdlKSk7XG4gIFxuICB2YXIgZ3JpZCA9IG5ldyBBcnJheShzaXplWCk7XG4gIFxuICBmb3IodmFyIGkgPSAwOyBpIDwgc2l6ZVg7IGkrKyl7XG4gICAgZ3JpZFtpXSA9IG5ldyBBcnJheShzaXplWSk7ICAgIFxuICB9XG4gIFxuICBmb3IodmFyIGkgPSAwOyBpIDwgc2l6ZVg7IGkrKyl7XG4gICAgZm9yKHZhciBqID0gMDsgaiA8IHNpemVZOyBqKyspe1xuICAgICAgZ3JpZFtpXVtqXSA9IG5ldyBBcnJheSgpOyAgICBcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBncmlkO1xufTtcblxuRkRMYXlvdXQucHJvdG90eXBlLmFkZE5vZGVUb0dyaWQgPSBmdW5jdGlvbiAodiwgbGVmdCwgdG9wKXtcbiAgICBcbiAgdmFyIHN0YXJ0WCA9IDA7XG4gIHZhciBmaW5pc2hYID0gMDtcbiAgdmFyIHN0YXJ0WSA9IDA7XG4gIHZhciBmaW5pc2hZID0gMDtcbiAgXG4gIHN0YXJ0WCA9IHBhcnNlSW50KE1hdGguZmxvb3IoKHYuZ2V0UmVjdCgpLnggLSBsZWZ0KSAvIHRoaXMucmVwdWxzaW9uUmFuZ2UpKTtcbiAgZmluaXNoWCA9IHBhcnNlSW50KE1hdGguZmxvb3IoKHYuZ2V0UmVjdCgpLndpZHRoICsgdi5nZXRSZWN0KCkueCAtIGxlZnQpIC8gdGhpcy5yZXB1bHNpb25SYW5nZSkpO1xuICBzdGFydFkgPSBwYXJzZUludChNYXRoLmZsb29yKCh2LmdldFJlY3QoKS55IC0gdG9wKSAvIHRoaXMucmVwdWxzaW9uUmFuZ2UpKTtcbiAgZmluaXNoWSA9IHBhcnNlSW50KE1hdGguZmxvb3IoKHYuZ2V0UmVjdCgpLmhlaWdodCArIHYuZ2V0UmVjdCgpLnkgLSB0b3ApIC8gdGhpcy5yZXB1bHNpb25SYW5nZSkpO1xuXG4gIGZvciAodmFyIGkgPSBzdGFydFg7IGkgPD0gZmluaXNoWDsgaSsrKVxuICB7XG4gICAgZm9yICh2YXIgaiA9IHN0YXJ0WTsgaiA8PSBmaW5pc2hZOyBqKyspXG4gICAge1xuICAgICAgdGhpcy5ncmlkW2ldW2pdLnB1c2godik7XG4gICAgICB2LnNldEdyaWRDb29yZGluYXRlcyhzdGFydFgsIGZpbmlzaFgsIHN0YXJ0WSwgZmluaXNoWSk7IFxuICAgIH1cbiAgfSAgXG5cbn07XG5cbkZETGF5b3V0LnByb3RvdHlwZS51cGRhdGVHcmlkID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpO1xuICB2YXIgbm9kZUE7XG4gIHZhciBsTm9kZXMgPSB0aGlzLmdldEFsbE5vZGVzKCk7XG4gIFxuICB0aGlzLmdyaWQgPSB0aGlzLmNhbGNHcmlkKHRoaXMuZ3JhcGhNYW5hZ2VyLmdldFJvb3QoKSk7ICAgXG5cbiAgLy8gcHV0IGFsbCBub2RlcyB0byBwcm9wZXIgZ3JpZCBjZWxsc1xuICBmb3IgKGkgPSAwOyBpIDwgbE5vZGVzLmxlbmd0aDsgaSsrKVxuICB7XG4gICAgbm9kZUEgPSBsTm9kZXNbaV07XG4gICAgdGhpcy5hZGROb2RlVG9HcmlkKG5vZGVBLCB0aGlzLmdyYXBoTWFuYWdlci5nZXRSb290KCkuZ2V0TGVmdCgpLCB0aGlzLmdyYXBoTWFuYWdlci5nZXRSb290KCkuZ2V0VG9wKCkpO1xuICB9IFxuXG59O1xuXG5GRExheW91dC5wcm90b3R5cGUuY2FsY3VsYXRlUmVwdWxzaW9uRm9yY2VPZkFOb2RlID0gZnVuY3Rpb24gKG5vZGVBLCBwcm9jZXNzZWROb2RlU2V0KXtcbiAgXG4gIGlmICgodGhpcy50b3RhbEl0ZXJhdGlvbnMgJSBGRExheW91dENvbnN0YW50cy5HUklEX0NBTENVTEFUSU9OX0NIRUNLX1BFUklPRCA9PSAxICYmICF0aGlzLmlzVHJlZUdyb3dpbmcgJiYgIXRoaXMuaXNHcm93dGhGaW5pc2hlZCkgfHwgKHRoaXMuZ3Jvd1RyZWVJdGVyYXRpb25zICUgMTAgPT0gMSAmJiB0aGlzLmlzVHJlZUdyb3dpbmcpIHx8ICh0aGlzLmFmdGVyR3Jvd3RoSXRlcmF0aW9ucyAlIDEwID09IDEgJiYgdGhpcy5pc0dyb3d0aEZpbmlzaGVkKSlcbiAge1xuICAgIHZhciBzdXJyb3VuZGluZyA9IG5ldyBTZXQoKTtcbiAgICBub2RlQS5zdXJyb3VuZGluZyA9IG5ldyBBcnJheSgpO1xuICAgIHZhciBub2RlQjtcbiAgICB2YXIgZ3JpZCA9IHRoaXMuZ3JpZDtcbiAgICBcbiAgICBmb3IgKHZhciBpID0gKG5vZGVBLnN0YXJ0WCAtIDEpOyBpIDwgKG5vZGVBLmZpbmlzaFggKyAyKTsgaSsrKVxuICAgIHtcbiAgICAgIGZvciAodmFyIGogPSAobm9kZUEuc3RhcnRZIC0gMSk7IGogPCAobm9kZUEuZmluaXNoWSArIDIpOyBqKyspXG4gICAgICB7XG4gICAgICAgIGlmICghKChpIDwgMCkgfHwgKGogPCAwKSB8fCAoaSA+PSBncmlkLmxlbmd0aCkgfHwgKGogPj0gZ3JpZFswXS5sZW5ndGgpKSlcbiAgICAgICAgeyAgXG4gICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBncmlkW2ldW2pdLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBub2RlQiA9IGdyaWRbaV1bal1ba107XG5cbiAgICAgICAgICAgIC8vIElmIGJvdGggbm9kZXMgYXJlIG5vdCBtZW1iZXJzIG9mIHRoZSBzYW1lIGdyYXBoLCBcbiAgICAgICAgICAgIC8vIG9yIGJvdGggbm9kZXMgYXJlIHRoZSBzYW1lLCBza2lwLlxuICAgICAgICAgICAgaWYgKChub2RlQS5nZXRPd25lcigpICE9IG5vZGVCLmdldE93bmVyKCkpIHx8IChub2RlQSA9PSBub2RlQikpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgcmVwdWxzaW9uIGZvcmNlIGJldHdlZW5cbiAgICAgICAgICAgIC8vIG5vZGVBIGFuZCBub2RlQiBoYXMgYWxyZWFkeSBiZWVuIGNhbGN1bGF0ZWRcbiAgICAgICAgICAgIGlmICghcHJvY2Vzc2VkTm9kZVNldC5oYXMobm9kZUIpICYmICFzdXJyb3VuZGluZy5oYXMobm9kZUIpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB2YXIgZGlzdGFuY2VYID0gTWF0aC5hYnMobm9kZUEuZ2V0Q2VudGVyWCgpLW5vZGVCLmdldENlbnRlclgoKSkgLSBcbiAgICAgICAgICAgICAgICAgICAgKChub2RlQS5nZXRXaWR0aCgpLzIpICsgKG5vZGVCLmdldFdpZHRoKCkvMikpO1xuICAgICAgICAgICAgICB2YXIgZGlzdGFuY2VZID0gTWF0aC5hYnMobm9kZUEuZ2V0Q2VudGVyWSgpLW5vZGVCLmdldENlbnRlclkoKSkgLSBcbiAgICAgICAgICAgICAgICAgICAgKChub2RlQS5nZXRIZWlnaHQoKS8yKSArIChub2RlQi5nZXRIZWlnaHQoKS8yKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgLy8gaWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gbm9kZUEgYW5kIG5vZGVCIFxuICAgICAgICAgICAgICAvLyBpcyBsZXNzIHRoZW4gY2FsY3VsYXRpb24gcmFuZ2VcbiAgICAgICAgICAgICAgaWYgKChkaXN0YW5jZVggPD0gdGhpcy5yZXB1bHNpb25SYW5nZSkgJiYgKGRpc3RhbmNlWSA8PSB0aGlzLnJlcHVsc2lvblJhbmdlKSlcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vdGhlbiBhZGQgbm9kZUIgdG8gc3Vycm91bmRpbmcgb2Ygbm9kZUFcbiAgICAgICAgICAgICAgICBzdXJyb3VuZGluZy5hZGQobm9kZUIpO1xuICAgICAgICAgICAgICB9ICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgfVxuICAgICAgICB9ICAgICAgICAgIFxuICAgICAgfVxuICAgIH1cblxuICAgIG5vZGVBLnN1cnJvdW5kaW5nID0gWy4uLnN1cnJvdW5kaW5nXTtcblx0XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IG5vZGVBLnN1cnJvdW5kaW5nLmxlbmd0aDsgaSsrKVxuICB7XG4gICAgdGhpcy5jYWxjUmVwdWxzaW9uRm9yY2Uobm9kZUEsIG5vZGVBLnN1cnJvdW5kaW5nW2ldKTtcbiAgfVx0XG59O1xuXG5GRExheW91dC5wcm90b3R5cGUuY2FsY1JlcHVsc2lvblJhbmdlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gMC4wO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFNlY3Rpb246IFRyZWUgUmVkdWN0aW9uIG1ldGhvZHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSZWR1Y2UgdHJlZXMgXG5GRExheW91dC5wcm90b3R5cGUucmVkdWNlVHJlZXMgPSBmdW5jdGlvbiAoKVxue1xuICB2YXIgcHJ1bmVkTm9kZXNBbGwgPSBbXTtcbiAgdmFyIGNvbnRhaW5zTGVhZiA9IHRydWU7XG4gIHZhciBub2RlO1xuICBcbiAgd2hpbGUoY29udGFpbnNMZWFmKSB7XG4gICAgdmFyIGFsbE5vZGVzID0gdGhpcy5ncmFwaE1hbmFnZXIuZ2V0QWxsTm9kZXMoKTtcbiAgICB2YXIgcHJ1bmVkTm9kZXNJblN0ZXBUZW1wID0gW107XG4gICAgY29udGFpbnNMZWFmID0gZmFsc2U7XG4gICAgXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbm9kZSA9IGFsbE5vZGVzW2ldO1xuICAgICAgaWYobm9kZS5nZXRFZGdlcygpLmxlbmd0aCA9PSAxICYmICFub2RlLmdldEVkZ2VzKClbMF0uaXNJbnRlckdyYXBoICYmIG5vZGUuZ2V0Q2hpbGQoKSA9PSBudWxsKXtcbiAgICAgICAgcHJ1bmVkTm9kZXNJblN0ZXBUZW1wLnB1c2goW25vZGUsIG5vZGUuZ2V0RWRnZXMoKVswXSwgbm9kZS5nZXRPd25lcigpXSk7XG4gICAgICAgIGNvbnRhaW5zTGVhZiA9IHRydWU7XG4gICAgICB9ICBcbiAgICB9XG4gICAgaWYoY29udGFpbnNMZWFmID09IHRydWUpe1xuICAgICAgdmFyIHBydW5lZE5vZGVzSW5TdGVwID0gW107XG4gICAgICBmb3IodmFyIGogPSAwOyBqIDwgcHJ1bmVkTm9kZXNJblN0ZXBUZW1wLmxlbmd0aDsgaisrKXtcbiAgICAgICAgaWYocHJ1bmVkTm9kZXNJblN0ZXBUZW1wW2pdWzBdLmdldEVkZ2VzKCkubGVuZ3RoID09IDEpe1xuICAgICAgICAgIHBydW5lZE5vZGVzSW5TdGVwLnB1c2gocHJ1bmVkTm9kZXNJblN0ZXBUZW1wW2pdKTsgIFxuICAgICAgICAgIHBydW5lZE5vZGVzSW5TdGVwVGVtcFtqXVswXS5nZXRPd25lcigpLnJlbW92ZShwcnVuZWROb2Rlc0luU3RlcFRlbXBbal1bMF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwcnVuZWROb2Rlc0FsbC5wdXNoKHBydW5lZE5vZGVzSW5TdGVwKTtcbiAgICAgIHRoaXMuZ3JhcGhNYW5hZ2VyLnJlc2V0QWxsTm9kZXMoKTtcbiAgICAgIHRoaXMuZ3JhcGhNYW5hZ2VyLnJlc2V0QWxsRWRnZXMoKTtcbiAgICB9XG4gIH1cbiAgdGhpcy5wcnVuZWROb2Rlc0FsbCA9IHBydW5lZE5vZGVzQWxsO1xufTtcblxuLy8gR3JvdyB0cmVlIG9uZSBzdGVwIFxuRkRMYXlvdXQucHJvdG90eXBlLmdyb3dUcmVlID0gZnVuY3Rpb24ocHJ1bmVkTm9kZXNBbGwsIGlzRmlyc3RHcm93dGgpXG57XG4gIHZhciBsZW5ndGhPZlBydW5lZE5vZGVzSW5TdGVwID0gcHJ1bmVkTm9kZXNBbGwubGVuZ3RoOyBcbiAgdmFyIHBydW5lZE5vZGVzSW5TdGVwID0gcHJ1bmVkTm9kZXNBbGxbbGVuZ3RoT2ZQcnVuZWROb2Rlc0luU3RlcCAtIDFdOyAgXG5cbiAgdmFyIG5vZGVEYXRhOyAgXG4gIGZvcih2YXIgaSA9IDA7IGkgPCBwcnVuZWROb2Rlc0luU3RlcC5sZW5ndGg7IGkrKyl7XG4gICAgbm9kZURhdGEgPSBwcnVuZWROb2Rlc0luU3RlcFtpXTtcblxuICAgIHRoaXMuZmluZFBsYWNlZm9yUHJ1bmVkTm9kZShub2RlRGF0YSk7XG4gICAgXG4gICAgbm9kZURhdGFbMl0uYWRkKG5vZGVEYXRhWzBdKTtcbiAgICBub2RlRGF0YVsyXS5hZGQobm9kZURhdGFbMV0sIG5vZGVEYXRhWzFdLnNvdXJjZSwgbm9kZURhdGFbMV0udGFyZ2V0KTtcbiAgfVxuXG4gIHBydW5lZE5vZGVzQWxsLnNwbGljZShwcnVuZWROb2Rlc0FsbC5sZW5ndGgtMSwgMSk7XG4gIHRoaXMuZ3JhcGhNYW5hZ2VyLnJlc2V0QWxsTm9kZXMoKTtcbiAgdGhpcy5ncmFwaE1hbmFnZXIucmVzZXRBbGxFZGdlcygpO1xufTtcblxuLy8gRmluZCBhbiBhcHByb3ByaWF0ZSBwb3NpdGlvbiB0byByZXBsYWNlIHBydW5lZCBub2RlLCB0aGlzIG1ldGhvZCBjYW4gYmUgaW1wcm92ZWRcbkZETGF5b3V0LnByb3RvdHlwZS5maW5kUGxhY2Vmb3JQcnVuZWROb2RlID0gZnVuY3Rpb24obm9kZURhdGEpe1xuICBcbiAgdmFyIGdyaWRGb3JQcnVuZWROb2RlOyAgXG4gIHZhciBub2RlVG9Db25uZWN0O1xuICB2YXIgcHJ1bmVkTm9kZSA9IG5vZGVEYXRhWzBdO1xuICBpZihwcnVuZWROb2RlID09IG5vZGVEYXRhWzFdLnNvdXJjZSl7XG4gICAgbm9kZVRvQ29ubmVjdCA9IG5vZGVEYXRhWzFdLnRhcmdldDtcbiAgfVxuICBlbHNlIHtcbiAgICBub2RlVG9Db25uZWN0ID0gbm9kZURhdGFbMV0uc291cmNlOyAgXG4gIH1cbiAgdmFyIHN0YXJ0R3JpZFggPSBub2RlVG9Db25uZWN0LnN0YXJ0WDtcbiAgdmFyIGZpbmlzaEdyaWRYID0gbm9kZVRvQ29ubmVjdC5maW5pc2hYO1xuICB2YXIgc3RhcnRHcmlkWSA9IG5vZGVUb0Nvbm5lY3Quc3RhcnRZO1xuICB2YXIgZmluaXNoR3JpZFkgPSBub2RlVG9Db25uZWN0LmZpbmlzaFk7IFxuICBcbiAgdmFyIHVwTm9kZUNvdW50ID0gMDtcbiAgdmFyIGRvd25Ob2RlQ291bnQgPSAwO1xuICB2YXIgcmlnaHROb2RlQ291bnQgPSAwO1xuICB2YXIgbGVmdE5vZGVDb3VudCA9IDA7XG4gIHZhciBjb250cm9sUmVnaW9ucyA9IFt1cE5vZGVDb3VudCwgcmlnaHROb2RlQ291bnQsIGRvd25Ob2RlQ291bnQsIGxlZnROb2RlQ291bnRdXG4gIFxuICBpZihzdGFydEdyaWRZID4gMCl7XG4gICAgZm9yKHZhciBpID0gc3RhcnRHcmlkWDsgaSA8PSBmaW5pc2hHcmlkWDsgaSsrICl7XG4gICAgICBjb250cm9sUmVnaW9uc1swXSArPSAodGhpcy5ncmlkW2ldW3N0YXJ0R3JpZFkgLSAxXS5sZW5ndGggKyB0aGlzLmdyaWRbaV1bc3RhcnRHcmlkWV0ubGVuZ3RoIC0gMSk7ICAgXG4gICAgfVxuICB9XG4gIGlmKGZpbmlzaEdyaWRYIDwgdGhpcy5ncmlkLmxlbmd0aCAtIDEpe1xuICAgIGZvcih2YXIgaSA9IHN0YXJ0R3JpZFk7IGkgPD0gZmluaXNoR3JpZFk7IGkrKyApe1xuICAgICAgY29udHJvbFJlZ2lvbnNbMV0gKz0gKHRoaXMuZ3JpZFtmaW5pc2hHcmlkWCArIDFdW2ldLmxlbmd0aCArIHRoaXMuZ3JpZFtmaW5pc2hHcmlkWF1baV0ubGVuZ3RoIC0gMSk7ICAgXG4gICAgfVxuICB9XG4gIGlmKGZpbmlzaEdyaWRZIDwgdGhpcy5ncmlkWzBdLmxlbmd0aCAtIDEpe1xuICAgIGZvcih2YXIgaSA9IHN0YXJ0R3JpZFg7IGkgPD0gZmluaXNoR3JpZFg7IGkrKyApe1xuICAgICAgY29udHJvbFJlZ2lvbnNbMl0gKz0gKHRoaXMuZ3JpZFtpXVtmaW5pc2hHcmlkWSArIDFdLmxlbmd0aCArIHRoaXMuZ3JpZFtpXVtmaW5pc2hHcmlkWV0ubGVuZ3RoIC0gMSk7ICAgXG4gICAgfVxuICB9XG4gIGlmKHN0YXJ0R3JpZFggPiAwKXtcbiAgICBmb3IodmFyIGkgPSBzdGFydEdyaWRZOyBpIDw9IGZpbmlzaEdyaWRZOyBpKysgKXtcbiAgICAgIGNvbnRyb2xSZWdpb25zWzNdICs9ICh0aGlzLmdyaWRbc3RhcnRHcmlkWCAtIDFdW2ldLmxlbmd0aCArIHRoaXMuZ3JpZFtzdGFydEdyaWRYXVtpXS5sZW5ndGggLSAxKTsgICBcbiAgICB9XG4gIH1cbiAgdmFyIG1pbiA9IEludGVnZXIuTUFYX1ZBTFVFO1xuICB2YXIgbWluQ291bnQ7XG4gIHZhciBtaW5JbmRleDtcbiAgZm9yKHZhciBqID0gMDsgaiA8IGNvbnRyb2xSZWdpb25zLmxlbmd0aDsgaisrKXtcbiAgICBpZihjb250cm9sUmVnaW9uc1tqXSA8IG1pbil7XG4gICAgICBtaW4gPSBjb250cm9sUmVnaW9uc1tqXTtcbiAgICAgIG1pbkNvdW50ID0gMTtcbiAgICAgIG1pbkluZGV4ID0gajtcbiAgICB9ICBcbiAgICBlbHNlIGlmKGNvbnRyb2xSZWdpb25zW2pdID09IG1pbil7XG4gICAgICBtaW5Db3VudCsrOyAgXG4gICAgfVxuICB9XG4gIFxuICBpZihtaW5Db3VudCA9PSAzICYmIG1pbiA9PSAwKXtcbiAgICBpZihjb250cm9sUmVnaW9uc1swXSA9PSAwICYmIGNvbnRyb2xSZWdpb25zWzFdID09IDAgJiYgY29udHJvbFJlZ2lvbnNbMl0gPT0gMCl7XG4gICAgICBncmlkRm9yUHJ1bmVkTm9kZSA9IDE7ICAgIFxuICAgIH1cbiAgICBlbHNlIGlmKGNvbnRyb2xSZWdpb25zWzBdID09IDAgJiYgY29udHJvbFJlZ2lvbnNbMV0gPT0gMCAmJiBjb250cm9sUmVnaW9uc1szXSA9PSAwKXtcbiAgICAgIGdyaWRGb3JQcnVuZWROb2RlID0gMDsgIFxuICAgIH1cbiAgICBlbHNlIGlmKGNvbnRyb2xSZWdpb25zWzBdID09IDAgJiYgY29udHJvbFJlZ2lvbnNbMl0gPT0gMCAmJiBjb250cm9sUmVnaW9uc1szXSA9PSAwKXtcbiAgICAgIGdyaWRGb3JQcnVuZWROb2RlID0gMzsgIFxuICAgIH1cbiAgICBlbHNlIGlmKGNvbnRyb2xSZWdpb25zWzFdID09IDAgJiYgY29udHJvbFJlZ2lvbnNbMl0gPT0gMCAmJiBjb250cm9sUmVnaW9uc1szXSA9PSAwKXtcbiAgICAgIGdyaWRGb3JQcnVuZWROb2RlID0gMjsgIFxuICAgIH1cbiAgfVxuICBlbHNlIGlmKG1pbkNvdW50ID09IDIgJiYgbWluID09IDApe1xuICAgIHZhciByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICBpZihjb250cm9sUmVnaW9uc1swXSA9PSAwICYmIGNvbnRyb2xSZWdpb25zWzFdID09IDApeztcbiAgICAgIGlmKHJhbmRvbSA9PSAwKXtcbiAgICAgICAgZ3JpZEZvclBydW5lZE5vZGUgPSAwO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgZ3JpZEZvclBydW5lZE5vZGUgPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKGNvbnRyb2xSZWdpb25zWzBdID09IDAgJiYgY29udHJvbFJlZ2lvbnNbMl0gPT0gMCl7XG4gICAgICBpZihyYW5kb20gPT0gMCl7XG4gICAgICAgIGdyaWRGb3JQcnVuZWROb2RlID0gMDtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIGdyaWRGb3JQcnVuZWROb2RlID0gMjtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZihjb250cm9sUmVnaW9uc1swXSA9PSAwICYmIGNvbnRyb2xSZWdpb25zWzNdID09IDApe1xuICAgICAgaWYocmFuZG9tID09IDApe1xuICAgICAgICBncmlkRm9yUHJ1bmVkTm9kZSA9IDA7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICBncmlkRm9yUHJ1bmVkTm9kZSA9IDM7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoY29udHJvbFJlZ2lvbnNbMV0gPT0gMCAmJiBjb250cm9sUmVnaW9uc1syXSA9PSAwKXtcbiAgICAgIGlmKHJhbmRvbSA9PSAwKXtcbiAgICAgICAgZ3JpZEZvclBydW5lZE5vZGUgPSAxO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgZ3JpZEZvclBydW5lZE5vZGUgPSAyO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKGNvbnRyb2xSZWdpb25zWzFdID09IDAgJiYgY29udHJvbFJlZ2lvbnNbM10gPT0gMCl7XG4gICAgICBpZihyYW5kb20gPT0gMCl7XG4gICAgICAgIGdyaWRGb3JQcnVuZWROb2RlID0gMTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIGdyaWRGb3JQcnVuZWROb2RlID0gMztcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZihyYW5kb20gPT0gMCl7XG4gICAgICAgIGdyaWRGb3JQcnVuZWROb2RlID0gMjtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIGdyaWRGb3JQcnVuZWROb2RlID0gMztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZSBpZihtaW5Db3VudCA9PSA0ICYmIG1pbiA9PSAwKXtcbiAgICB2YXIgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCk7XG4gICAgZ3JpZEZvclBydW5lZE5vZGUgPSByYW5kb207ICBcbiAgfVxuICBlbHNlIHtcbiAgICBncmlkRm9yUHJ1bmVkTm9kZSA9IG1pbkluZGV4O1xuICB9XG4gIFxuICBpZihncmlkRm9yUHJ1bmVkTm9kZSA9PSAwKSB7XG4gICAgcHJ1bmVkTm9kZS5zZXRDZW50ZXIobm9kZVRvQ29ubmVjdC5nZXRDZW50ZXJYKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVRvQ29ubmVjdC5nZXRDZW50ZXJZKCkgLSBub2RlVG9Db25uZWN0LmdldEhlaWdodCgpLzIgLSBGRExheW91dENvbnN0YW50cy5ERUZBVUxUX0VER0VfTEVOR1RIIC0gcHJ1bmVkTm9kZS5nZXRIZWlnaHQoKS8yKTsgIFxuICB9XG4gIGVsc2UgaWYoZ3JpZEZvclBydW5lZE5vZGUgPT0gMSkge1xuICAgIHBydW5lZE5vZGUuc2V0Q2VudGVyKG5vZGVUb0Nvbm5lY3QuZ2V0Q2VudGVyWCgpICsgbm9kZVRvQ29ubmVjdC5nZXRXaWR0aCgpLzIgKyBGRExheW91dENvbnN0YW50cy5ERUZBVUxUX0VER0VfTEVOR1RIICsgcHJ1bmVkTm9kZS5nZXRXaWR0aCgpLzIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVRvQ29ubmVjdC5nZXRDZW50ZXJZKCkpOyAgXG4gIH1cbiAgZWxzZSBpZihncmlkRm9yUHJ1bmVkTm9kZSA9PSAyKSB7XG4gICAgcHJ1bmVkTm9kZS5zZXRDZW50ZXIobm9kZVRvQ29ubmVjdC5nZXRDZW50ZXJYKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVRvQ29ubmVjdC5nZXRDZW50ZXJZKCkgKyBub2RlVG9Db25uZWN0LmdldEhlaWdodCgpLzIgKyBGRExheW91dENvbnN0YW50cy5ERUZBVUxUX0VER0VfTEVOR1RIICsgcHJ1bmVkTm9kZS5nZXRIZWlnaHQoKS8yKTsgIFxuICB9XG4gIGVsc2UgeyBcbiAgICBwcnVuZWROb2RlLnNldENlbnRlcihub2RlVG9Db25uZWN0LmdldENlbnRlclgoKSAtIG5vZGVUb0Nvbm5lY3QuZ2V0V2lkdGgoKS8yIC0gRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9FREdFX0xFTkdUSCAtIHBydW5lZE5vZGUuZ2V0V2lkdGgoKS8yLFxuICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVUb0Nvbm5lY3QuZ2V0Q2VudGVyWSgpKTsgIFxuICB9XG4gIFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGRExheW91dDtcbiIsInZhciBMYXlvdXRDb25zdGFudHMgPSByZXF1aXJlKCcuL0xheW91dENvbnN0YW50cycpO1xuXG5mdW5jdGlvbiBGRExheW91dENvbnN0YW50cygpIHtcbn1cblxuLy9GRExheW91dENvbnN0YW50cyBpbmhlcml0cyBzdGF0aWMgcHJvcHMgaW4gTGF5b3V0Q29uc3RhbnRzXG5mb3IgKHZhciBwcm9wIGluIExheW91dENvbnN0YW50cykge1xuICBGRExheW91dENvbnN0YW50c1twcm9wXSA9IExheW91dENvbnN0YW50c1twcm9wXTtcbn1cblxuRkRMYXlvdXRDb25zdGFudHMuTUFYX0lURVJBVElPTlMgPSAyNTAwO1xuXG5GRExheW91dENvbnN0YW50cy5ERUZBVUxUX0VER0VfTEVOR1RIID0gNTA7XG5GRExheW91dENvbnN0YW50cy5ERUZBVUxUX1NQUklOR19TVFJFTkdUSCA9IDAuNDU7XG5GRExheW91dENvbnN0YW50cy5ERUZBVUxUX1JFUFVMU0lPTl9TVFJFTkdUSCA9IDQ1MDAuMDtcbkZETGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfR1JBVklUWV9TVFJFTkdUSCA9IDAuNDtcbkZETGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfQ09NUE9VTkRfR1JBVklUWV9TVFJFTkdUSCA9IDEuMDtcbkZETGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfR1JBVklUWV9SQU5HRV9GQUNUT1IgPSAzLjg7XG5GRExheW91dENvbnN0YW50cy5ERUZBVUxUX0NPTVBPVU5EX0dSQVZJVFlfUkFOR0VfRkFDVE9SID0gMS41O1xuRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9VU0VfU01BUlRfSURFQUxfRURHRV9MRU5HVEhfQ0FMQ1VMQVRJT04gPSB0cnVlO1xuRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9VU0VfU01BUlRfUkVQVUxTSU9OX1JBTkdFX0NBTENVTEFUSU9OID0gdHJ1ZTtcbkZETGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfQ09PTElOR19GQUNUT1JfSU5DUkVNRU5UQUwgPSAwLjU7XG5GRExheW91dENvbnN0YW50cy5NQVhfTk9ERV9ESVNQTEFDRU1FTlRfSU5DUkVNRU5UQUwgPSAxMDAuMDtcbkZETGF5b3V0Q29uc3RhbnRzLk1BWF9OT0RFX0RJU1BMQUNFTUVOVCA9IEZETGF5b3V0Q29uc3RhbnRzLk1BWF9OT0RFX0RJU1BMQUNFTUVOVF9JTkNSRU1FTlRBTCAqIDM7XG5GRExheW91dENvbnN0YW50cy5NSU5fUkVQVUxTSU9OX0RJU1QgPSBGRExheW91dENvbnN0YW50cy5ERUZBVUxUX0VER0VfTEVOR1RIIC8gMTAuMDtcbkZETGF5b3V0Q29uc3RhbnRzLkNPTlZFUkdFTkNFX0NIRUNLX1BFUklPRCA9IDEwMDtcbkZETGF5b3V0Q29uc3RhbnRzLlBFUl9MRVZFTF9JREVBTF9FREdFX0xFTkdUSF9GQUNUT1IgPSAwLjE7XG5GRExheW91dENvbnN0YW50cy5NSU5fRURHRV9MRU5HVEggPSAxO1xuRkRMYXlvdXRDb25zdGFudHMuR1JJRF9DQUxDVUxBVElPTl9DSEVDS19QRVJJT0QgPSAxMDtcblxubW9kdWxlLmV4cG9ydHMgPSBGRExheW91dENvbnN0YW50cztcbiIsInZhciBMRWRnZSA9IHJlcXVpcmUoJy4vTEVkZ2UnKTtcbnZhciBGRExheW91dENvbnN0YW50cyA9IHJlcXVpcmUoJy4vRkRMYXlvdXRDb25zdGFudHMnKTtcblxuZnVuY3Rpb24gRkRMYXlvdXRFZGdlKHNvdXJjZSwgdGFyZ2V0LCB2RWRnZSkge1xuICBMRWRnZS5jYWxsKHRoaXMsIHNvdXJjZSwgdGFyZ2V0LCB2RWRnZSk7XG4gIHRoaXMuaWRlYWxMZW5ndGggPSBGRExheW91dENvbnN0YW50cy5ERUZBVUxUX0VER0VfTEVOR1RIO1xufVxuXG5GRExheW91dEVkZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShMRWRnZS5wcm90b3R5cGUpO1xuXG5mb3IgKHZhciBwcm9wIGluIExFZGdlKSB7XG4gIEZETGF5b3V0RWRnZVtwcm9wXSA9IExFZGdlW3Byb3BdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZETGF5b3V0RWRnZTtcbiIsInZhciBMTm9kZSA9IHJlcXVpcmUoJy4vTE5vZGUnKTtcblxuZnVuY3Rpb24gRkRMYXlvdXROb2RlKGdtLCBsb2MsIHNpemUsIHZOb2RlKSB7XG4gIC8vIGFsdGVybmF0aXZlIGNvbnN0cnVjdG9yIGlzIGhhbmRsZWQgaW5zaWRlIExOb2RlXG4gIExOb2RlLmNhbGwodGhpcywgZ20sIGxvYywgc2l6ZSwgdk5vZGUpO1xuICAvL1NwcmluZywgcmVwdWxzaW9uIGFuZCBncmF2aXRhdGlvbmFsIGZvcmNlcyBhY3Rpbmcgb24gdGhpcyBub2RlXG4gIHRoaXMuc3ByaW5nRm9yY2VYID0gMDtcbiAgdGhpcy5zcHJpbmdGb3JjZVkgPSAwO1xuICB0aGlzLnJlcHVsc2lvbkZvcmNlWCA9IDA7XG4gIHRoaXMucmVwdWxzaW9uRm9yY2VZID0gMDtcbiAgdGhpcy5ncmF2aXRhdGlvbkZvcmNlWCA9IDA7XG4gIHRoaXMuZ3Jhdml0YXRpb25Gb3JjZVkgPSAwO1xuICAvL0Ftb3VudCBieSB3aGljaCB0aGlzIG5vZGUgaXMgdG8gYmUgbW92ZWQgaW4gdGhpcyBpdGVyYXRpb25cbiAgdGhpcy5kaXNwbGFjZW1lbnRYID0gMDtcbiAgdGhpcy5kaXNwbGFjZW1lbnRZID0gMDtcblxuICAvL1N0YXJ0IGFuZCBmaW5pc2ggZ3JpZCBjb29yZGluYXRlcyB0aGF0IHRoaXMgbm9kZSBpcyBmYWxsZW4gaW50b1xuICB0aGlzLnN0YXJ0WCA9IDA7XG4gIHRoaXMuZmluaXNoWCA9IDA7XG4gIHRoaXMuc3RhcnRZID0gMDtcbiAgdGhpcy5maW5pc2hZID0gMDtcblxuICAvL0dlb21ldHJpYyBuZWlnaGJvcnMgb2YgdGhpcyBub2RlXG4gIHRoaXMuc3Vycm91bmRpbmcgPSBbXTtcbn1cblxuRkRMYXlvdXROb2RlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoTE5vZGUucHJvdG90eXBlKTtcblxuZm9yICh2YXIgcHJvcCBpbiBMTm9kZSkge1xuICBGRExheW91dE5vZGVbcHJvcF0gPSBMTm9kZVtwcm9wXTtcbn1cblxuRkRMYXlvdXROb2RlLnByb3RvdHlwZS5zZXRHcmlkQ29vcmRpbmF0ZXMgPSBmdW5jdGlvbiAoX3N0YXJ0WCwgX2ZpbmlzaFgsIF9zdGFydFksIF9maW5pc2hZKVxue1xuICB0aGlzLnN0YXJ0WCA9IF9zdGFydFg7XG4gIHRoaXMuZmluaXNoWCA9IF9maW5pc2hYO1xuICB0aGlzLnN0YXJ0WSA9IF9zdGFydFk7XG4gIHRoaXMuZmluaXNoWSA9IF9maW5pc2hZO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZETGF5b3V0Tm9kZTtcbiIsInZhciBVbmlxdWVJREdlbmVyZXRvciA9IHJlcXVpcmUoJy4vVW5pcXVlSURHZW5lcmV0b3InKTtcblxuZnVuY3Rpb24gSGFzaE1hcCgpIHtcbiAgdGhpcy5tYXAgPSB7fTtcbiAgdGhpcy5rZXlzID0gW107XG59XG5cbkhhc2hNYXAucHJvdG90eXBlLnB1dCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHZhciB0aGVJZCA9IFVuaXF1ZUlER2VuZXJldG9yLmNyZWF0ZUlEKGtleSk7XG4gIGlmICghdGhpcy5jb250YWlucyh0aGVJZCkpIHtcbiAgICB0aGlzLm1hcFt0aGVJZF0gPSB2YWx1ZTtcbiAgICB0aGlzLmtleXMucHVzaChrZXkpO1xuICB9XG59O1xuXG5IYXNoTWFwLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgdmFyIHRoZUlkID0gVW5pcXVlSURHZW5lcmV0b3IuY3JlYXRlSUQoa2V5KTtcbiAgcmV0dXJuIHRoaXMubWFwW2tleV0gIT0gbnVsbDtcbn07XG5cbkhhc2hNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgdmFyIHRoZUlkID0gVW5pcXVlSURHZW5lcmV0b3IuY3JlYXRlSUQoa2V5KTtcbiAgcmV0dXJuIHRoaXMubWFwW3RoZUlkXTtcbn07XG5cbkhhc2hNYXAucHJvdG90eXBlLmtleVNldCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMua2V5cztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSGFzaE1hcDtcbiIsInZhciBVbmlxdWVJREdlbmVyZXRvciA9IHJlcXVpcmUoJy4vVW5pcXVlSURHZW5lcmV0b3InKTtcblxuZnVuY3Rpb24gSGFzaFNldCgpIHtcbiAgdGhpcy5zZXQgPSB7fTtcbn1cbjtcblxuSGFzaFNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKG9iaikge1xuICB2YXIgdGhlSWQgPSBVbmlxdWVJREdlbmVyZXRvci5jcmVhdGVJRChvYmopO1xuICBpZiAoIXRoaXMuY29udGFpbnModGhlSWQpKVxuICAgIHRoaXMuc2V0W3RoZUlkXSA9IG9iajtcbn07XG5cbkhhc2hTZXQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgZGVsZXRlIHRoaXMuc2V0W1VuaXF1ZUlER2VuZXJldG9yLmNyZWF0ZUlEKG9iaildO1xufTtcblxuSGFzaFNldC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuc2V0ID0ge307XG59O1xuXG5IYXNoU2V0LnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHRoaXMuc2V0W1VuaXF1ZUlER2VuZXJldG9yLmNyZWF0ZUlEKG9iaildID09IG9iajtcbn07XG5cbkhhc2hTZXQucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnNpemUoKSA9PT0gMDtcbn07XG5cbkhhc2hTZXQucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnNldCkubGVuZ3RoO1xufTtcblxuLy9jb25jYXRzIHRoaXMuc2V0IHRvIHRoZSBnaXZlbiBsaXN0XG5IYXNoU2V0LnByb3RvdHlwZS5hZGRBbGxUbyA9IGZ1bmN0aW9uIChsaXN0KSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcy5zZXQpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBsaXN0LnB1c2godGhpcy5zZXRba2V5c1tpXV0pO1xuICB9XG59O1xuXG5IYXNoU2V0LnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5zZXQpLmxlbmd0aDtcbn07XG5cbkhhc2hTZXQucHJvdG90eXBlLmFkZEFsbCA9IGZ1bmN0aW9uIChsaXN0KSB7XG4gIHZhciBzID0gbGlzdC5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgczsgaSsrKSB7XG4gICAgdmFyIHYgPSBsaXN0W2ldO1xuICAgIHRoaXMuYWRkKHYpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhhc2hTZXQ7XG4iLCJmdW5jdGlvbiBJR2VvbWV0cnkoKSB7XG59XG5cbklHZW9tZXRyeS5jYWxjU2VwYXJhdGlvbkFtb3VudCA9IGZ1bmN0aW9uIChyZWN0QSwgcmVjdEIsIG92ZXJsYXBBbW91bnQsIHNlcGFyYXRpb25CdWZmZXIpXG57XG4gIGlmICghcmVjdEEuaW50ZXJzZWN0cyhyZWN0QikpIHtcbiAgICB0aHJvdyBcImFzc2VydCBmYWlsZWRcIjtcbiAgfVxuICB2YXIgZGlyZWN0aW9ucyA9IG5ldyBBcnJheSgyKTtcbiAgSUdlb21ldHJ5LmRlY2lkZURpcmVjdGlvbnNGb3JPdmVybGFwcGluZ05vZGVzKHJlY3RBLCByZWN0QiwgZGlyZWN0aW9ucyk7XG4gIG92ZXJsYXBBbW91bnRbMF0gPSBNYXRoLm1pbihyZWN0QS5nZXRSaWdodCgpLCByZWN0Qi5nZXRSaWdodCgpKSAtXG4gICAgICAgICAgTWF0aC5tYXgocmVjdEEueCwgcmVjdEIueCk7XG4gIG92ZXJsYXBBbW91bnRbMV0gPSBNYXRoLm1pbihyZWN0QS5nZXRCb3R0b20oKSwgcmVjdEIuZ2V0Qm90dG9tKCkpIC1cbiAgICAgICAgICBNYXRoLm1heChyZWN0QS55LCByZWN0Qi55KTtcbiAgLy8gdXBkYXRlIHRoZSBvdmVybGFwcGluZyBhbW91bnRzIGZvciB0aGUgZm9sbG93aW5nIGNhc2VzOlxuICBpZiAoKHJlY3RBLmdldFgoKSA8PSByZWN0Qi5nZXRYKCkpICYmIChyZWN0QS5nZXRSaWdodCgpID49IHJlY3RCLmdldFJpZ2h0KCkpKVxuICB7XG4gICAgb3ZlcmxhcEFtb3VudFswXSArPSBNYXRoLm1pbigocmVjdEIuZ2V0WCgpIC0gcmVjdEEuZ2V0WCgpKSxcbiAgICAgICAgICAgIChyZWN0QS5nZXRSaWdodCgpIC0gcmVjdEIuZ2V0UmlnaHQoKSkpO1xuICB9XG4gIGVsc2UgaWYgKChyZWN0Qi5nZXRYKCkgPD0gcmVjdEEuZ2V0WCgpKSAmJiAocmVjdEIuZ2V0UmlnaHQoKSA+PSByZWN0QS5nZXRSaWdodCgpKSlcbiAge1xuICAgIG92ZXJsYXBBbW91bnRbMF0gKz0gTWF0aC5taW4oKHJlY3RBLmdldFgoKSAtIHJlY3RCLmdldFgoKSksXG4gICAgICAgICAgICAocmVjdEIuZ2V0UmlnaHQoKSAtIHJlY3RBLmdldFJpZ2h0KCkpKTtcbiAgfVxuICBpZiAoKHJlY3RBLmdldFkoKSA8PSByZWN0Qi5nZXRZKCkpICYmIChyZWN0QS5nZXRCb3R0b20oKSA+PSByZWN0Qi5nZXRCb3R0b20oKSkpXG4gIHtcbiAgICBvdmVybGFwQW1vdW50WzFdICs9IE1hdGgubWluKChyZWN0Qi5nZXRZKCkgLSByZWN0QS5nZXRZKCkpLFxuICAgICAgICAgICAgKHJlY3RBLmdldEJvdHRvbSgpIC0gcmVjdEIuZ2V0Qm90dG9tKCkpKTtcbiAgfVxuICBlbHNlIGlmICgocmVjdEIuZ2V0WSgpIDw9IHJlY3RBLmdldFkoKSkgJiYgKHJlY3RCLmdldEJvdHRvbSgpID49IHJlY3RBLmdldEJvdHRvbSgpKSlcbiAge1xuICAgIG92ZXJsYXBBbW91bnRbMV0gKz0gTWF0aC5taW4oKHJlY3RBLmdldFkoKSAtIHJlY3RCLmdldFkoKSksXG4gICAgICAgICAgICAocmVjdEIuZ2V0Qm90dG9tKCkgLSByZWN0QS5nZXRCb3R0b20oKSkpO1xuICB9XG5cbiAgLy8gZmluZCBzbG9wZSBvZiB0aGUgbGluZSBwYXNzZXMgdHdvIGNlbnRlcnNcbiAgdmFyIHNsb3BlID0gTWF0aC5hYnMoKHJlY3RCLmdldENlbnRlclkoKSAtIHJlY3RBLmdldENlbnRlclkoKSkgL1xuICAgICAgICAgIChyZWN0Qi5nZXRDZW50ZXJYKCkgLSByZWN0QS5nZXRDZW50ZXJYKCkpKTtcbiAgLy8gaWYgY2VudGVycyBhcmUgb3ZlcmxhcHBlZFxuICBpZiAoKHJlY3RCLmdldENlbnRlclkoKSA9PSByZWN0QS5nZXRDZW50ZXJZKCkpICYmXG4gICAgICAgICAgKHJlY3RCLmdldENlbnRlclgoKSA9PSByZWN0QS5nZXRDZW50ZXJYKCkpKVxuICB7XG4gICAgLy8gYXNzdW1lIHRoZSBzbG9wZSBpcyAxICg0NSBkZWdyZWUpXG4gICAgc2xvcGUgPSAxLjA7XG4gIH1cblxuICB2YXIgbW92ZUJ5WSA9IHNsb3BlICogb3ZlcmxhcEFtb3VudFswXTtcbiAgdmFyIG1vdmVCeVggPSBvdmVybGFwQW1vdW50WzFdIC8gc2xvcGU7XG4gIGlmIChvdmVybGFwQW1vdW50WzBdIDwgbW92ZUJ5WClcbiAge1xuICAgIG1vdmVCeVggPSBvdmVybGFwQW1vdW50WzBdO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIG1vdmVCeVkgPSBvdmVybGFwQW1vdW50WzFdO1xuICB9XG4gIC8vIHJldHVybiBoYWxmIHRoZSBhbW91bnQgc28gdGhhdCBpZiBlYWNoIHJlY3RhbmdsZSBpcyBtb3ZlZCBieSB0aGVzZVxuICAvLyBhbW91bnRzIGluIG9wcG9zaXRlIGRpcmVjdGlvbnMsIG92ZXJsYXAgd2lsbCBiZSByZXNvbHZlZFxuICBvdmVybGFwQW1vdW50WzBdID0gLTEgKiBkaXJlY3Rpb25zWzBdICogKChtb3ZlQnlYIC8gMikgKyBzZXBhcmF0aW9uQnVmZmVyKTtcbiAgb3ZlcmxhcEFtb3VudFsxXSA9IC0xICogZGlyZWN0aW9uc1sxXSAqICgobW92ZUJ5WSAvIDIpICsgc2VwYXJhdGlvbkJ1ZmZlcik7XG59XG5cbklHZW9tZXRyeS5kZWNpZGVEaXJlY3Rpb25zRm9yT3ZlcmxhcHBpbmdOb2RlcyA9IGZ1bmN0aW9uIChyZWN0QSwgcmVjdEIsIGRpcmVjdGlvbnMpXG57XG4gIGlmIChyZWN0QS5nZXRDZW50ZXJYKCkgPCByZWN0Qi5nZXRDZW50ZXJYKCkpXG4gIHtcbiAgICBkaXJlY3Rpb25zWzBdID0gLTE7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgZGlyZWN0aW9uc1swXSA9IDE7XG4gIH1cblxuICBpZiAocmVjdEEuZ2V0Q2VudGVyWSgpIDwgcmVjdEIuZ2V0Q2VudGVyWSgpKVxuICB7XG4gICAgZGlyZWN0aW9uc1sxXSA9IC0xO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIGRpcmVjdGlvbnNbMV0gPSAxO1xuICB9XG59XG5cbklHZW9tZXRyeS5nZXRJbnRlcnNlY3Rpb24yID0gZnVuY3Rpb24gKHJlY3RBLCByZWN0QiwgcmVzdWx0KVxue1xuICAvL3Jlc3VsdFswLTFdIHdpbGwgY29udGFpbiBjbGlwUG9pbnQgb2YgcmVjdEEsIHJlc3VsdFsyLTNdIHdpbGwgY29udGFpbiBjbGlwUG9pbnQgb2YgcmVjdEJcbiAgdmFyIHAxeCA9IHJlY3RBLmdldENlbnRlclgoKTtcbiAgdmFyIHAxeSA9IHJlY3RBLmdldENlbnRlclkoKTtcbiAgdmFyIHAyeCA9IHJlY3RCLmdldENlbnRlclgoKTtcbiAgdmFyIHAyeSA9IHJlY3RCLmdldENlbnRlclkoKTtcblxuICAvL2lmIHR3byByZWN0YW5nbGVzIGludGVyc2VjdCwgdGhlbiBjbGlwcGluZyBwb2ludHMgYXJlIGNlbnRlcnNcbiAgaWYgKHJlY3RBLmludGVyc2VjdHMocmVjdEIpKVxuICB7XG4gICAgcmVzdWx0WzBdID0gcDF4O1xuICAgIHJlc3VsdFsxXSA9IHAxeTtcbiAgICByZXN1bHRbMl0gPSBwMng7XG4gICAgcmVzdWx0WzNdID0gcDJ5O1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIC8vdmFyaWFibGVzIGZvciByZWN0QVxuICB2YXIgdG9wTGVmdEF4ID0gcmVjdEEuZ2V0WCgpO1xuICB2YXIgdG9wTGVmdEF5ID0gcmVjdEEuZ2V0WSgpO1xuICB2YXIgdG9wUmlnaHRBeCA9IHJlY3RBLmdldFJpZ2h0KCk7XG4gIHZhciBib3R0b21MZWZ0QXggPSByZWN0QS5nZXRYKCk7XG4gIHZhciBib3R0b21MZWZ0QXkgPSByZWN0QS5nZXRCb3R0b20oKTtcbiAgdmFyIGJvdHRvbVJpZ2h0QXggPSByZWN0QS5nZXRSaWdodCgpO1xuICB2YXIgaGFsZldpZHRoQSA9IHJlY3RBLmdldFdpZHRoSGFsZigpO1xuICB2YXIgaGFsZkhlaWdodEEgPSByZWN0QS5nZXRIZWlnaHRIYWxmKCk7XG4gIC8vdmFyaWFibGVzIGZvciByZWN0QlxuICB2YXIgdG9wTGVmdEJ4ID0gcmVjdEIuZ2V0WCgpO1xuICB2YXIgdG9wTGVmdEJ5ID0gcmVjdEIuZ2V0WSgpO1xuICB2YXIgdG9wUmlnaHRCeCA9IHJlY3RCLmdldFJpZ2h0KCk7XG4gIHZhciBib3R0b21MZWZ0QnggPSByZWN0Qi5nZXRYKCk7XG4gIHZhciBib3R0b21MZWZ0QnkgPSByZWN0Qi5nZXRCb3R0b20oKTtcbiAgdmFyIGJvdHRvbVJpZ2h0QnggPSByZWN0Qi5nZXRSaWdodCgpO1xuICB2YXIgaGFsZldpZHRoQiA9IHJlY3RCLmdldFdpZHRoSGFsZigpO1xuICB2YXIgaGFsZkhlaWdodEIgPSByZWN0Qi5nZXRIZWlnaHRIYWxmKCk7XG4gIC8vZmxhZyB3aGV0aGVyIGNsaXBwaW5nIHBvaW50cyBhcmUgZm91bmRcbiAgdmFyIGNsaXBQb2ludEFGb3VuZCA9IGZhbHNlO1xuICB2YXIgY2xpcFBvaW50QkZvdW5kID0gZmFsc2U7XG5cbiAgLy8gbGluZSBpcyB2ZXJ0aWNhbFxuICBpZiAocDF4ID09IHAyeClcbiAge1xuICAgIGlmIChwMXkgPiBwMnkpXG4gICAge1xuICAgICAgcmVzdWx0WzBdID0gcDF4O1xuICAgICAgcmVzdWx0WzFdID0gdG9wTGVmdEF5O1xuICAgICAgcmVzdWx0WzJdID0gcDJ4O1xuICAgICAgcmVzdWx0WzNdID0gYm90dG9tTGVmdEJ5O1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIGlmIChwMXkgPCBwMnkpXG4gICAge1xuICAgICAgcmVzdWx0WzBdID0gcDF4O1xuICAgICAgcmVzdWx0WzFdID0gYm90dG9tTGVmdEF5O1xuICAgICAgcmVzdWx0WzJdID0gcDJ4O1xuICAgICAgcmVzdWx0WzNdID0gdG9wTGVmdEJ5O1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgLy9ub3QgbGluZSwgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIC8vIGxpbmUgaXMgaG9yaXpvbnRhbFxuICBlbHNlIGlmIChwMXkgPT0gcDJ5KVxuICB7XG4gICAgaWYgKHAxeCA+IHAyeClcbiAgICB7XG4gICAgICByZXN1bHRbMF0gPSB0b3BMZWZ0QXg7XG4gICAgICByZXN1bHRbMV0gPSBwMXk7XG4gICAgICByZXN1bHRbMl0gPSB0b3BSaWdodEJ4O1xuICAgICAgcmVzdWx0WzNdID0gcDJ5O1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIGlmIChwMXggPCBwMngpXG4gICAge1xuICAgICAgcmVzdWx0WzBdID0gdG9wUmlnaHRBeDtcbiAgICAgIHJlc3VsdFsxXSA9IHAxeTtcbiAgICAgIHJlc3VsdFsyXSA9IHRvcExlZnRCeDtcbiAgICAgIHJlc3VsdFszXSA9IHAyeTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIC8vbm90IHZhbGlkIGxpbmUsIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICBlbHNlXG4gIHtcbiAgICAvL3Nsb3BlcyBvZiByZWN0QSdzIGFuZCByZWN0QidzIGRpYWdvbmFsc1xuICAgIHZhciBzbG9wZUEgPSByZWN0QS5oZWlnaHQgLyByZWN0QS53aWR0aDtcbiAgICB2YXIgc2xvcGVCID0gcmVjdEIuaGVpZ2h0IC8gcmVjdEIud2lkdGg7XG5cbiAgICAvL3Nsb3BlIG9mIGxpbmUgYmV0d2VlbiBjZW50ZXIgb2YgcmVjdEEgYW5kIGNlbnRlciBvZiByZWN0QlxuICAgIHZhciBzbG9wZVByaW1lID0gKHAyeSAtIHAxeSkgLyAocDJ4IC0gcDF4KTtcbiAgICB2YXIgY2FyZGluYWxEaXJlY3Rpb25BO1xuICAgIHZhciBjYXJkaW5hbERpcmVjdGlvbkI7XG4gICAgdmFyIHRlbXBQb2ludEF4O1xuICAgIHZhciB0ZW1wUG9pbnRBeTtcbiAgICB2YXIgdGVtcFBvaW50Qng7XG4gICAgdmFyIHRlbXBQb2ludEJ5O1xuXG4gICAgLy9kZXRlcm1pbmUgd2hldGhlciBjbGlwcGluZyBwb2ludCBpcyB0aGUgY29ybmVyIG9mIG5vZGVBXG4gICAgaWYgKCgtc2xvcGVBKSA9PSBzbG9wZVByaW1lKVxuICAgIHtcbiAgICAgIGlmIChwMXggPiBwMngpXG4gICAgICB7XG4gICAgICAgIHJlc3VsdFswXSA9IGJvdHRvbUxlZnRBeDtcbiAgICAgICAgcmVzdWx0WzFdID0gYm90dG9tTGVmdEF5O1xuICAgICAgICBjbGlwUG9pbnRBRm91bmQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZVxuICAgICAge1xuICAgICAgICByZXN1bHRbMF0gPSB0b3BSaWdodEF4O1xuICAgICAgICByZXN1bHRbMV0gPSB0b3BMZWZ0QXk7XG4gICAgICAgIGNsaXBQb2ludEFGb3VuZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHNsb3BlQSA9PSBzbG9wZVByaW1lKVxuICAgIHtcbiAgICAgIGlmIChwMXggPiBwMngpXG4gICAgICB7XG4gICAgICAgIHJlc3VsdFswXSA9IHRvcExlZnRBeDtcbiAgICAgICAgcmVzdWx0WzFdID0gdG9wTGVmdEF5O1xuICAgICAgICBjbGlwUG9pbnRBRm91bmQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZVxuICAgICAge1xuICAgICAgICByZXN1bHRbMF0gPSBib3R0b21SaWdodEF4O1xuICAgICAgICByZXN1bHRbMV0gPSBib3R0b21MZWZ0QXk7XG4gICAgICAgIGNsaXBQb2ludEFGb3VuZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9kZXRlcm1pbmUgd2hldGhlciBjbGlwcGluZyBwb2ludCBpcyB0aGUgY29ybmVyIG9mIG5vZGVCXG4gICAgaWYgKCgtc2xvcGVCKSA9PSBzbG9wZVByaW1lKVxuICAgIHtcbiAgICAgIGlmIChwMnggPiBwMXgpXG4gICAgICB7XG4gICAgICAgIHJlc3VsdFsyXSA9IGJvdHRvbUxlZnRCeDtcbiAgICAgICAgcmVzdWx0WzNdID0gYm90dG9tTGVmdEJ5O1xuICAgICAgICBjbGlwUG9pbnRCRm91bmQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZVxuICAgICAge1xuICAgICAgICByZXN1bHRbMl0gPSB0b3BSaWdodEJ4O1xuICAgICAgICByZXN1bHRbM10gPSB0b3BMZWZ0Qnk7XG4gICAgICAgIGNsaXBQb2ludEJGb3VuZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHNsb3BlQiA9PSBzbG9wZVByaW1lKVxuICAgIHtcbiAgICAgIGlmIChwMnggPiBwMXgpXG4gICAgICB7XG4gICAgICAgIHJlc3VsdFsyXSA9IHRvcExlZnRCeDtcbiAgICAgICAgcmVzdWx0WzNdID0gdG9wTGVmdEJ5O1xuICAgICAgICBjbGlwUG9pbnRCRm91bmQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZVxuICAgICAge1xuICAgICAgICByZXN1bHRbMl0gPSBib3R0b21SaWdodEJ4O1xuICAgICAgICByZXN1bHRbM10gPSBib3R0b21MZWZ0Qnk7XG4gICAgICAgIGNsaXBQb2ludEJGb3VuZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9pZiBib3RoIGNsaXBwaW5nIHBvaW50cyBhcmUgY29ybmVyc1xuICAgIGlmIChjbGlwUG9pbnRBRm91bmQgJiYgY2xpcFBvaW50QkZvdW5kKVxuICAgIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvL2RldGVybWluZSBDYXJkaW5hbCBEaXJlY3Rpb24gb2YgcmVjdGFuZ2xlc1xuICAgIGlmIChwMXggPiBwMngpXG4gICAge1xuICAgICAgaWYgKHAxeSA+IHAyeSlcbiAgICAgIHtcbiAgICAgICAgY2FyZGluYWxEaXJlY3Rpb25BID0gSUdlb21ldHJ5LmdldENhcmRpbmFsRGlyZWN0aW9uKHNsb3BlQSwgc2xvcGVQcmltZSwgNCk7XG4gICAgICAgIGNhcmRpbmFsRGlyZWN0aW9uQiA9IElHZW9tZXRyeS5nZXRDYXJkaW5hbERpcmVjdGlvbihzbG9wZUIsIHNsb3BlUHJpbWUsIDIpO1xuICAgICAgfVxuICAgICAgZWxzZVxuICAgICAge1xuICAgICAgICBjYXJkaW5hbERpcmVjdGlvbkEgPSBJR2VvbWV0cnkuZ2V0Q2FyZGluYWxEaXJlY3Rpb24oLXNsb3BlQSwgc2xvcGVQcmltZSwgMyk7XG4gICAgICAgIGNhcmRpbmFsRGlyZWN0aW9uQiA9IElHZW9tZXRyeS5nZXRDYXJkaW5hbERpcmVjdGlvbigtc2xvcGVCLCBzbG9wZVByaW1lLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGlmIChwMXkgPiBwMnkpXG4gICAgICB7XG4gICAgICAgIGNhcmRpbmFsRGlyZWN0aW9uQSA9IElHZW9tZXRyeS5nZXRDYXJkaW5hbERpcmVjdGlvbigtc2xvcGVBLCBzbG9wZVByaW1lLCAxKTtcbiAgICAgICAgY2FyZGluYWxEaXJlY3Rpb25CID0gSUdlb21ldHJ5LmdldENhcmRpbmFsRGlyZWN0aW9uKC1zbG9wZUIsIHNsb3BlUHJpbWUsIDMpO1xuICAgICAgfVxuICAgICAgZWxzZVxuICAgICAge1xuICAgICAgICBjYXJkaW5hbERpcmVjdGlvbkEgPSBJR2VvbWV0cnkuZ2V0Q2FyZGluYWxEaXJlY3Rpb24oc2xvcGVBLCBzbG9wZVByaW1lLCAyKTtcbiAgICAgICAgY2FyZGluYWxEaXJlY3Rpb25CID0gSUdlb21ldHJ5LmdldENhcmRpbmFsRGlyZWN0aW9uKHNsb3BlQiwgc2xvcGVQcmltZSwgNCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vY2FsY3VsYXRlIGNsaXBwaW5nIFBvaW50IGlmIGl0IGlzIG5vdCBmb3VuZCBiZWZvcmVcbiAgICBpZiAoIWNsaXBQb2ludEFGb3VuZClcbiAgICB7XG4gICAgICBzd2l0Y2ggKGNhcmRpbmFsRGlyZWN0aW9uQSlcbiAgICAgIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHRlbXBQb2ludEF5ID0gdG9wTGVmdEF5O1xuICAgICAgICAgIHRlbXBQb2ludEF4ID0gcDF4ICsgKC1oYWxmSGVpZ2h0QSkgLyBzbG9wZVByaW1lO1xuICAgICAgICAgIHJlc3VsdFswXSA9IHRlbXBQb2ludEF4O1xuICAgICAgICAgIHJlc3VsdFsxXSA9IHRlbXBQb2ludEF5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgdGVtcFBvaW50QXggPSBib3R0b21SaWdodEF4O1xuICAgICAgICAgIHRlbXBQb2ludEF5ID0gcDF5ICsgaGFsZldpZHRoQSAqIHNsb3BlUHJpbWU7XG4gICAgICAgICAgcmVzdWx0WzBdID0gdGVtcFBvaW50QXg7XG4gICAgICAgICAgcmVzdWx0WzFdID0gdGVtcFBvaW50QXk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICB0ZW1wUG9pbnRBeSA9IGJvdHRvbUxlZnRBeTtcbiAgICAgICAgICB0ZW1wUG9pbnRBeCA9IHAxeCArIGhhbGZIZWlnaHRBIC8gc2xvcGVQcmltZTtcbiAgICAgICAgICByZXN1bHRbMF0gPSB0ZW1wUG9pbnRBeDtcbiAgICAgICAgICByZXN1bHRbMV0gPSB0ZW1wUG9pbnRBeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHRlbXBQb2ludEF4ID0gYm90dG9tTGVmdEF4O1xuICAgICAgICAgIHRlbXBQb2ludEF5ID0gcDF5ICsgKC1oYWxmV2lkdGhBKSAqIHNsb3BlUHJpbWU7XG4gICAgICAgICAgcmVzdWx0WzBdID0gdGVtcFBvaW50QXg7XG4gICAgICAgICAgcmVzdWx0WzFdID0gdGVtcFBvaW50QXk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghY2xpcFBvaW50QkZvdW5kKVxuICAgIHtcbiAgICAgIHN3aXRjaCAoY2FyZGluYWxEaXJlY3Rpb25CKVxuICAgICAge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgdGVtcFBvaW50QnkgPSB0b3BMZWZ0Qnk7XG4gICAgICAgICAgdGVtcFBvaW50QnggPSBwMnggKyAoLWhhbGZIZWlnaHRCKSAvIHNsb3BlUHJpbWU7XG4gICAgICAgICAgcmVzdWx0WzJdID0gdGVtcFBvaW50Qng7XG4gICAgICAgICAgcmVzdWx0WzNdID0gdGVtcFBvaW50Qnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICB0ZW1wUG9pbnRCeCA9IGJvdHRvbVJpZ2h0Qng7XG4gICAgICAgICAgdGVtcFBvaW50QnkgPSBwMnkgKyBoYWxmV2lkdGhCICogc2xvcGVQcmltZTtcbiAgICAgICAgICByZXN1bHRbMl0gPSB0ZW1wUG9pbnRCeDtcbiAgICAgICAgICByZXN1bHRbM10gPSB0ZW1wUG9pbnRCeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHRlbXBQb2ludEJ5ID0gYm90dG9tTGVmdEJ5O1xuICAgICAgICAgIHRlbXBQb2ludEJ4ID0gcDJ4ICsgaGFsZkhlaWdodEIgLyBzbG9wZVByaW1lO1xuICAgICAgICAgIHJlc3VsdFsyXSA9IHRlbXBQb2ludEJ4O1xuICAgICAgICAgIHJlc3VsdFszXSA9IHRlbXBQb2ludEJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgdGVtcFBvaW50QnggPSBib3R0b21MZWZ0Qng7XG4gICAgICAgICAgdGVtcFBvaW50QnkgPSBwMnkgKyAoLWhhbGZXaWR0aEIpICogc2xvcGVQcmltZTtcbiAgICAgICAgICByZXN1bHRbMl0gPSB0ZW1wUG9pbnRCeDtcbiAgICAgICAgICByZXN1bHRbM10gPSB0ZW1wUG9pbnRCeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5JR2VvbWV0cnkuZ2V0Q2FyZGluYWxEaXJlY3Rpb24gPSBmdW5jdGlvbiAoc2xvcGUsIHNsb3BlUHJpbWUsIGxpbmUpXG57XG4gIGlmIChzbG9wZSA+IHNsb3BlUHJpbWUpXG4gIHtcbiAgICByZXR1cm4gbGluZTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICByZXR1cm4gMSArIGxpbmUgJSA0O1xuICB9XG59XG5cbklHZW9tZXRyeS5nZXRJbnRlcnNlY3Rpb24gPSBmdW5jdGlvbiAoczEsIHMyLCBmMSwgZjIpXG57XG4gIGlmIChmMiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIElHZW9tZXRyeS5nZXRJbnRlcnNlY3Rpb24yKHMxLCBzMiwgZjEpO1xuICB9XG4gIHZhciB4MSA9IHMxLng7XG4gIHZhciB5MSA9IHMxLnk7XG4gIHZhciB4MiA9IHMyLng7XG4gIHZhciB5MiA9IHMyLnk7XG4gIHZhciB4MyA9IGYxLng7XG4gIHZhciB5MyA9IGYxLnk7XG4gIHZhciB4NCA9IGYyLng7XG4gIHZhciB5NCA9IGYyLnk7XG4gIHZhciB4LCB5OyAvLyBpbnRlcnNlY3Rpb24gcG9pbnRcbiAgdmFyIGExLCBhMiwgYjEsIGIyLCBjMSwgYzI7IC8vIGNvZWZmaWNpZW50cyBvZiBsaW5lIGVxbnMuXG4gIHZhciBkZW5vbTtcblxuICBhMSA9IHkyIC0geTE7XG4gIGIxID0geDEgLSB4MjtcbiAgYzEgPSB4MiAqIHkxIC0geDEgKiB5MjsgIC8vIHsgYTEqeCArIGIxKnkgKyBjMSA9IDAgaXMgbGluZSAxIH1cblxuICBhMiA9IHk0IC0geTM7XG4gIGIyID0geDMgLSB4NDtcbiAgYzIgPSB4NCAqIHkzIC0geDMgKiB5NDsgIC8vIHsgYTIqeCArIGIyKnkgKyBjMiA9IDAgaXMgbGluZSAyIH1cblxuICBkZW5vbSA9IGExICogYjIgLSBhMiAqIGIxO1xuXG4gIGlmIChkZW5vbSA9PSAwKVxuICB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB4ID0gKGIxICogYzIgLSBiMiAqIGMxKSAvIGRlbm9tO1xuICB5ID0gKGEyICogYzEgLSBhMSAqIGMyKSAvIGRlbm9tO1xuXG4gIHJldHVybiBuZXcgUG9pbnQoeCwgeSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBTZWN0aW9uOiBDbGFzcyBDb25zdGFudHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqIFNvbWUgdXNlZnVsIHByZS1jYWxjdWxhdGVkIGNvbnN0YW50c1xuICovXG5JR2VvbWV0cnkuSEFMRl9QSSA9IDAuNSAqIE1hdGguUEk7XG5JR2VvbWV0cnkuT05FX0FORF9IQUxGX1BJID0gMS41ICogTWF0aC5QSTtcbklHZW9tZXRyeS5UV09fUEkgPSAyLjAgKiBNYXRoLlBJO1xuSUdlb21ldHJ5LlRIUkVFX1BJID0gMy4wICogTWF0aC5QSTtcblxubW9kdWxlLmV4cG9ydHMgPSBJR2VvbWV0cnk7XG4iLCJmdW5jdGlvbiBJTWF0aCgpIHtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBzaWduIG9mIHRoZSBpbnB1dCB2YWx1ZS5cbiAqL1xuSU1hdGguc2lnbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAodmFsdWUgPiAwKVxuICB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgZWxzZSBpZiAodmFsdWUgPCAwKVxuICB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJldHVybiAwO1xuICB9XG59XG5cbklNYXRoLmZsb29yID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA8IDAgPyBNYXRoLmNlaWwodmFsdWUpIDogTWF0aC5mbG9vcih2YWx1ZSk7XG59XG5cbklNYXRoLmNlaWwgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlIDwgMCA/IE1hdGguZmxvb3IodmFsdWUpIDogTWF0aC5jZWlsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJTWF0aDtcbiIsImZ1bmN0aW9uIEludGVnZXIoKSB7XG59XG5cbkludGVnZXIuTUFYX1ZBTFVFID0gMjE0NzQ4MzY0NztcbkludGVnZXIuTUlOX1ZBTFVFID0gLTIxNDc0ODM2NDg7XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZWdlcjtcbiIsInZhciBMR3JhcGhPYmplY3QgPSByZXF1aXJlKCcuL0xHcmFwaE9iamVjdCcpO1xudmFyIElHZW9tZXRyeSA9IHJlcXVpcmUoJy4vSUdlb21ldHJ5Jyk7XG52YXIgSU1hdGggPSByZXF1aXJlKCcuL0lNYXRoJyk7XG5cbmZ1bmN0aW9uIExFZGdlKHNvdXJjZSwgdGFyZ2V0LCB2RWRnZSkge1xuICBMR3JhcGhPYmplY3QuY2FsbCh0aGlzLCB2RWRnZSk7XG5cbiAgdGhpcy5pc092ZXJsYXBpbmdTb3VyY2VBbmRUYXJnZXQgPSBmYWxzZTtcbiAgdGhpcy52R3JhcGhPYmplY3QgPSB2RWRnZTtcbiAgdGhpcy5iZW5kcG9pbnRzID0gW107XG4gIHRoaXMuc291cmNlID0gc291cmNlO1xuICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbn1cblxuTEVkZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShMR3JhcGhPYmplY3QucHJvdG90eXBlKTtcblxuZm9yICh2YXIgcHJvcCBpbiBMR3JhcGhPYmplY3QpIHtcbiAgTEVkZ2VbcHJvcF0gPSBMR3JhcGhPYmplY3RbcHJvcF07XG59XG5cbkxFZGdlLnByb3RvdHlwZS5nZXRTb3VyY2UgPSBmdW5jdGlvbiAoKVxue1xuICByZXR1cm4gdGhpcy5zb3VyY2U7XG59O1xuXG5MRWRnZS5wcm90b3R5cGUuZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHRoaXMudGFyZ2V0O1xufTtcblxuTEVkZ2UucHJvdG90eXBlLmlzSW50ZXJHcmFwaCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLmlzSW50ZXJHcmFwaDtcbn07XG5cbkxFZGdlLnByb3RvdHlwZS5nZXRMZW5ndGggPSBmdW5jdGlvbiAoKVxue1xuICByZXR1cm4gdGhpcy5sZW5ndGg7XG59O1xuXG5MRWRnZS5wcm90b3R5cGUuaXNPdmVybGFwaW5nU291cmNlQW5kVGFyZ2V0ID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHRoaXMuaXNPdmVybGFwaW5nU291cmNlQW5kVGFyZ2V0O1xufTtcblxuTEVkZ2UucHJvdG90eXBlLmdldEJlbmRwb2ludHMgPSBmdW5jdGlvbiAoKVxue1xuICByZXR1cm4gdGhpcy5iZW5kcG9pbnRzO1xufTtcblxuTEVkZ2UucHJvdG90eXBlLmdldExjYSA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLmxjYTtcbn07XG5cbkxFZGdlLnByb3RvdHlwZS5nZXRTb3VyY2VJbkxjYSA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLnNvdXJjZUluTGNhO1xufTtcblxuTEVkZ2UucHJvdG90eXBlLmdldFRhcmdldEluTGNhID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHRoaXMudGFyZ2V0SW5MY2E7XG59O1xuXG5MRWRnZS5wcm90b3R5cGUuZ2V0T3RoZXJFbmQgPSBmdW5jdGlvbiAobm9kZSlcbntcbiAgaWYgKHRoaXMuc291cmNlID09PSBub2RlKVxuICB7XG4gICAgcmV0dXJuIHRoaXMudGFyZ2V0O1xuICB9XG4gIGVsc2UgaWYgKHRoaXMudGFyZ2V0ID09PSBub2RlKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHRocm93IFwiTm9kZSBpcyBub3QgaW5jaWRlbnQgd2l0aCB0aGlzIGVkZ2VcIjtcbiAgfVxufVxuXG5MRWRnZS5wcm90b3R5cGUuZ2V0T3RoZXJFbmRJbkdyYXBoID0gZnVuY3Rpb24gKG5vZGUsIGdyYXBoKVxue1xuICB2YXIgb3RoZXJFbmQgPSB0aGlzLmdldE90aGVyRW5kKG5vZGUpO1xuICB2YXIgcm9vdCA9IGdyYXBoLmdldEdyYXBoTWFuYWdlcigpLmdldFJvb3QoKTtcblxuICB3aGlsZSAodHJ1ZSlcbiAge1xuICAgIGlmIChvdGhlckVuZC5nZXRPd25lcigpID09IGdyYXBoKVxuICAgIHtcbiAgICAgIHJldHVybiBvdGhlckVuZDtcbiAgICB9XG5cbiAgICBpZiAob3RoZXJFbmQuZ2V0T3duZXIoKSA9PSByb290KVxuICAgIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIG90aGVyRW5kID0gb3RoZXJFbmQuZ2V0T3duZXIoKS5nZXRQYXJlbnQoKTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxuTEVkZ2UucHJvdG90eXBlLnVwZGF0ZUxlbmd0aCA9IGZ1bmN0aW9uICgpXG57XG4gIHZhciBjbGlwUG9pbnRDb29yZGluYXRlcyA9IG5ldyBBcnJheSg0KTtcblxuICB0aGlzLmlzT3ZlcmxhcGluZ1NvdXJjZUFuZFRhcmdldCA9XG4gICAgICAgICAgSUdlb21ldHJ5LmdldEludGVyc2VjdGlvbih0aGlzLnRhcmdldC5nZXRSZWN0KCksXG4gICAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZS5nZXRSZWN0KCksXG4gICAgICAgICAgICAgICAgICBjbGlwUG9pbnRDb29yZGluYXRlcyk7XG5cbiAgaWYgKCF0aGlzLmlzT3ZlcmxhcGluZ1NvdXJjZUFuZFRhcmdldClcbiAge1xuICAgIHRoaXMubGVuZ3RoWCA9IGNsaXBQb2ludENvb3JkaW5hdGVzWzBdIC0gY2xpcFBvaW50Q29vcmRpbmF0ZXNbMl07XG4gICAgdGhpcy5sZW5ndGhZID0gY2xpcFBvaW50Q29vcmRpbmF0ZXNbMV0gLSBjbGlwUG9pbnRDb29yZGluYXRlc1szXTtcblxuICAgIGlmIChNYXRoLmFicyh0aGlzLmxlbmd0aFgpIDwgMS4wKVxuICAgIHtcbiAgICAgIHRoaXMubGVuZ3RoWCA9IElNYXRoLnNpZ24odGhpcy5sZW5ndGhYKTtcbiAgICB9XG5cbiAgICBpZiAoTWF0aC5hYnModGhpcy5sZW5ndGhZKSA8IDEuMClcbiAgICB7XG4gICAgICB0aGlzLmxlbmd0aFkgPSBJTWF0aC5zaWduKHRoaXMubGVuZ3RoWSk7XG4gICAgfVxuXG4gICAgdGhpcy5sZW5ndGggPSBNYXRoLnNxcnQoXG4gICAgICAgICAgICB0aGlzLmxlbmd0aFggKiB0aGlzLmxlbmd0aFggKyB0aGlzLmxlbmd0aFkgKiB0aGlzLmxlbmd0aFkpO1xuICB9XG59O1xuXG5MRWRnZS5wcm90b3R5cGUudXBkYXRlTGVuZ3RoU2ltcGxlID0gZnVuY3Rpb24gKClcbntcbiAgdGhpcy5sZW5ndGhYID0gdGhpcy50YXJnZXQuZ2V0Q2VudGVyWCgpIC0gdGhpcy5zb3VyY2UuZ2V0Q2VudGVyWCgpO1xuICB0aGlzLmxlbmd0aFkgPSB0aGlzLnRhcmdldC5nZXRDZW50ZXJZKCkgLSB0aGlzLnNvdXJjZS5nZXRDZW50ZXJZKCk7XG5cbiAgaWYgKE1hdGguYWJzKHRoaXMubGVuZ3RoWCkgPCAxLjApXG4gIHtcbiAgICB0aGlzLmxlbmd0aFggPSBJTWF0aC5zaWduKHRoaXMubGVuZ3RoWCk7XG4gIH1cblxuICBpZiAoTWF0aC5hYnModGhpcy5sZW5ndGhZKSA8IDEuMClcbiAge1xuICAgIHRoaXMubGVuZ3RoWSA9IElNYXRoLnNpZ24odGhpcy5sZW5ndGhZKTtcbiAgfVxuXG4gIHRoaXMubGVuZ3RoID0gTWF0aC5zcXJ0KFxuICAgICAgICAgIHRoaXMubGVuZ3RoWCAqIHRoaXMubGVuZ3RoWCArIHRoaXMubGVuZ3RoWSAqIHRoaXMubGVuZ3RoWSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTEVkZ2U7XG4iLCJ2YXIgTEdyYXBoT2JqZWN0ID0gcmVxdWlyZSgnLi9MR3JhcGhPYmplY3QnKTtcbnZhciBJbnRlZ2VyID0gcmVxdWlyZSgnLi9JbnRlZ2VyJyk7XG52YXIgTGF5b3V0Q29uc3RhbnRzID0gcmVxdWlyZSgnLi9MYXlvdXRDb25zdGFudHMnKTtcbnZhciBMR3JhcGhNYW5hZ2VyID0gcmVxdWlyZSgnLi9MR3JhcGhNYW5hZ2VyJyk7XG52YXIgTE5vZGUgPSByZXF1aXJlKCcuL0xOb2RlJyk7XG52YXIgTEVkZ2UgPSByZXF1aXJlKCcuL0xFZGdlJyk7XG52YXIgSGFzaFNldCA9IHJlcXVpcmUoJy4vSGFzaFNldCcpO1xudmFyIFJlY3RhbmdsZUQgPSByZXF1aXJlKCcuL1JlY3RhbmdsZUQnKTtcbnZhciBQb2ludCA9IHJlcXVpcmUoJy4vUG9pbnQnKTtcbnZhciBMaXN0ID0gcmVxdWlyZSgnbGlua2VkbGlzdC1qcycpLkxpc3Q7XG5cbmZ1bmN0aW9uIExHcmFwaChwYXJlbnQsIG9iajIsIHZHcmFwaCkge1xuICBMR3JhcGhPYmplY3QuY2FsbCh0aGlzLCB2R3JhcGgpO1xuICB0aGlzLmVzdGltYXRlZFNpemUgPSBJbnRlZ2VyLk1JTl9WQUxVRTtcbiAgdGhpcy5tYXJnaW4gPSBMYXlvdXRDb25zdGFudHMuREVGQVVMVF9HUkFQSF9NQVJHSU47XG4gIHRoaXMuZWRnZXMgPSBbXTtcbiAgdGhpcy5ub2RlcyA9IFtdO1xuICB0aGlzLmlzQ29ubmVjdGVkID0gZmFsc2U7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuXG4gIGlmIChvYmoyICE9IG51bGwgJiYgb2JqMiBpbnN0YW5jZW9mIExHcmFwaE1hbmFnZXIpIHtcbiAgICB0aGlzLmdyYXBoTWFuYWdlciA9IG9iajI7XG4gIH1cbiAgZWxzZSBpZiAob2JqMiAhPSBudWxsICYmIG9iajIgaW5zdGFuY2VvZiBMYXlvdXQpIHtcbiAgICB0aGlzLmdyYXBoTWFuYWdlciA9IG9iajIuZ3JhcGhNYW5hZ2VyO1xuICB9XG59XG5cbkxHcmFwaC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKExHcmFwaE9iamVjdC5wcm90b3R5cGUpO1xuZm9yICh2YXIgcHJvcCBpbiBMR3JhcGhPYmplY3QpIHtcbiAgTEdyYXBoW3Byb3BdID0gTEdyYXBoT2JqZWN0W3Byb3BdO1xufVxuXG5MR3JhcGgucHJvdG90eXBlLmdldE5vZGVzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5ub2Rlcztcbn07XG5cbkxHcmFwaC5wcm90b3R5cGUuZ2V0RWRnZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmVkZ2VzO1xufTtcblxuTEdyYXBoLnByb3RvdHlwZS5nZXRHcmFwaE1hbmFnZXIgPSBmdW5jdGlvbiAoKVxue1xuICByZXR1cm4gdGhpcy5ncmFwaE1hbmFnZXI7XG59O1xuXG5MR3JhcGgucHJvdG90eXBlLmdldFBhcmVudCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLnBhcmVudDtcbn07XG5cbkxHcmFwaC5wcm90b3R5cGUuZ2V0TGVmdCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLmxlZnQ7XG59O1xuXG5MR3JhcGgucHJvdG90eXBlLmdldFJpZ2h0ID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHRoaXMucmlnaHQ7XG59O1xuXG5MR3JhcGgucHJvdG90eXBlLmdldFRvcCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLnRvcDtcbn07XG5cbkxHcmFwaC5wcm90b3R5cGUuZ2V0Qm90dG9tID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHRoaXMuYm90dG9tO1xufTtcblxuTEdyYXBoLnByb3RvdHlwZS5pc0Nvbm5lY3RlZCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLmlzQ29ubmVjdGVkO1xufTtcblxuTEdyYXBoLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAob2JqMSwgc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSkge1xuICBpZiAoc291cmNlTm9kZSA9PSBudWxsICYmIHRhcmdldE5vZGUgPT0gbnVsbCkge1xuICAgIHZhciBuZXdOb2RlID0gb2JqMTtcbiAgICBpZiAodGhpcy5ncmFwaE1hbmFnZXIgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgXCJHcmFwaCBoYXMgbm8gZ3JhcGggbWdyIVwiO1xuICAgIH1cbiAgICBpZiAodGhpcy5nZXROb2RlcygpLmluZGV4T2YobmV3Tm9kZSkgPiAtMSkge1xuICAgICAgdGhyb3cgXCJOb2RlIGFscmVhZHkgaW4gZ3JhcGghXCI7XG4gICAgfVxuICAgIG5ld05vZGUub3duZXIgPSB0aGlzO1xuICAgIHRoaXMuZ2V0Tm9kZXMoKS5wdXNoKG5ld05vZGUpO1xuXG4gICAgcmV0dXJuIG5ld05vZGU7XG4gIH1cbiAgZWxzZSB7XG4gICAgdmFyIG5ld0VkZ2UgPSBvYmoxO1xuICAgIGlmICghKHRoaXMuZ2V0Tm9kZXMoKS5pbmRleE9mKHNvdXJjZU5vZGUpID4gLTEgJiYgKHRoaXMuZ2V0Tm9kZXMoKS5pbmRleE9mKHRhcmdldE5vZGUpKSA+IC0xKSkge1xuICAgICAgdGhyb3cgXCJTb3VyY2Ugb3IgdGFyZ2V0IG5vdCBpbiBncmFwaCFcIjtcbiAgICB9XG5cbiAgICBpZiAoIShzb3VyY2VOb2RlLm93bmVyID09IHRhcmdldE5vZGUub3duZXIgJiYgc291cmNlTm9kZS5vd25lciA9PSB0aGlzKSkge1xuICAgICAgdGhyb3cgXCJCb3RoIG93bmVycyBtdXN0IGJlIHRoaXMgZ3JhcGghXCI7XG4gICAgfVxuXG4gICAgaWYgKHNvdXJjZU5vZGUub3duZXIgIT0gdGFyZ2V0Tm9kZS5vd25lcilcbiAgICB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBzZXQgc291cmNlIGFuZCB0YXJnZXRcbiAgICBuZXdFZGdlLnNvdXJjZSA9IHNvdXJjZU5vZGU7XG4gICAgbmV3RWRnZS50YXJnZXQgPSB0YXJnZXROb2RlO1xuXG4gICAgLy8gc2V0IGFzIGludHJhLWdyYXBoIGVkZ2VcbiAgICBuZXdFZGdlLmlzSW50ZXJHcmFwaCA9IGZhbHNlO1xuXG4gICAgLy8gYWRkIHRvIGdyYXBoIGVkZ2UgbGlzdFxuICAgIHRoaXMuZ2V0RWRnZXMoKS5wdXNoKG5ld0VkZ2UpO1xuXG4gICAgLy8gYWRkIHRvIGluY2lkZW5jeSBsaXN0c1xuICAgIHNvdXJjZU5vZGUuZWRnZXMucHVzaChuZXdFZGdlKTtcblxuICAgIGlmICh0YXJnZXROb2RlICE9IHNvdXJjZU5vZGUpXG4gICAge1xuICAgICAgdGFyZ2V0Tm9kZS5lZGdlcy5wdXNoKG5ld0VkZ2UpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdFZGdlO1xuICB9XG59O1xuXG5MR3JhcGgucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIG5vZGUgPSBvYmo7XG4gIGlmIChvYmogaW5zdGFuY2VvZiBMTm9kZSkge1xuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIHRocm93IFwiTm9kZSBpcyBudWxsIVwiO1xuICAgIH1cbiAgICBpZiAoIShub2RlLm93bmVyICE9IG51bGwgJiYgbm9kZS5vd25lciA9PSB0aGlzKSkge1xuICAgICAgdGhyb3cgXCJPd25lciBncmFwaCBpcyBpbnZhbGlkIVwiO1xuICAgIH1cbiAgICBpZiAodGhpcy5ncmFwaE1hbmFnZXIgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgXCJPd25lciBncmFwaCBtYW5hZ2VyIGlzIGludmFsaWQhXCI7XG4gICAgfVxuICAgIC8vIHJlbW92ZSBpbmNpZGVudCBlZGdlcyBmaXJzdCAobWFrZSBhIGNvcHkgdG8gZG8gaXQgc2FmZWx5KVxuICAgIHZhciBlZGdlc1RvQmVSZW1vdmVkID0gbm9kZS5lZGdlcy5zbGljZSgpO1xuICAgIHZhciBlZGdlO1xuICAgIHZhciBzID0gZWRnZXNUb0JlUmVtb3ZlZC5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzOyBpKyspXG4gICAge1xuICAgICAgZWRnZSA9IGVkZ2VzVG9CZVJlbW92ZWRbaV07XG5cbiAgICAgIGlmIChlZGdlLmlzSW50ZXJHcmFwaClcbiAgICAgIHtcbiAgICAgICAgdGhpcy5ncmFwaE1hbmFnZXIucmVtb3ZlKGVkZ2UpO1xuICAgICAgfVxuICAgICAgZWxzZVxuICAgICAge1xuICAgICAgICBlZGdlLnNvdXJjZS5vd25lci5yZW1vdmUoZWRnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gbm93IHRoZSBub2RlIGl0c2VsZlxuICAgIHZhciBpbmRleCA9IHRoaXMubm9kZXMuaW5kZXhPZihub2RlKTtcbiAgICBpZiAoaW5kZXggPT0gLTEpIHtcbiAgICAgIHRocm93IFwiTm9kZSBub3QgaW4gb3duZXIgbm9kZSBsaXN0IVwiO1xuICAgIH1cblxuICAgIHRoaXMubm9kZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBMRWRnZSkge1xuICAgIHZhciBlZGdlID0gb2JqO1xuICAgIGlmIChlZGdlID09IG51bGwpIHtcbiAgICAgIHRocm93IFwiRWRnZSBpcyBudWxsIVwiO1xuICAgIH1cbiAgICBpZiAoIShlZGdlLnNvdXJjZSAhPSBudWxsICYmIGVkZ2UudGFyZ2V0ICE9IG51bGwpKSB7XG4gICAgICB0aHJvdyBcIlNvdXJjZSBhbmQvb3IgdGFyZ2V0IGlzIG51bGwhXCI7XG4gICAgfVxuICAgIGlmICghKGVkZ2Uuc291cmNlLm93bmVyICE9IG51bGwgJiYgZWRnZS50YXJnZXQub3duZXIgIT0gbnVsbCAmJlxuICAgICAgICAgICAgZWRnZS5zb3VyY2Uub3duZXIgPT0gdGhpcyAmJiBlZGdlLnRhcmdldC5vd25lciA9PSB0aGlzKSkge1xuICAgICAgdGhyb3cgXCJTb3VyY2UgYW5kL29yIHRhcmdldCBvd25lciBpcyBpbnZhbGlkIVwiO1xuICAgIH1cblxuICAgIHZhciBzb3VyY2VJbmRleCA9IGVkZ2Uuc291cmNlLmVkZ2VzLmluZGV4T2YoZWRnZSk7XG4gICAgdmFyIHRhcmdldEluZGV4ID0gZWRnZS50YXJnZXQuZWRnZXMuaW5kZXhPZihlZGdlKTtcbiAgICBpZiAoIShzb3VyY2VJbmRleCA+IC0xICYmIHRhcmdldEluZGV4ID4gLTEpKSB7XG4gICAgICB0aHJvdyBcIlNvdXJjZSBhbmQvb3IgdGFyZ2V0IGRvZXNuJ3Qga25vdyB0aGlzIGVkZ2UhXCI7XG4gICAgfVxuXG4gICAgZWRnZS5zb3VyY2UuZWRnZXMuc3BsaWNlKHNvdXJjZUluZGV4LCAxKTtcblxuICAgIGlmIChlZGdlLnRhcmdldCAhPSBlZGdlLnNvdXJjZSlcbiAgICB7XG4gICAgICBlZGdlLnRhcmdldC5lZGdlcy5zcGxpY2UodGFyZ2V0SW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHZhciBpbmRleCA9IGVkZ2Uuc291cmNlLm93bmVyLmdldEVkZ2VzKCkuaW5kZXhPZihlZGdlKTtcbiAgICBpZiAoaW5kZXggPT0gLTEpIHtcbiAgICAgIHRocm93IFwiTm90IGluIG93bmVyJ3MgZWRnZSBsaXN0IVwiO1xuICAgIH1cblxuICAgIGVkZ2Uuc291cmNlLm93bmVyLmdldEVkZ2VzKCkuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufTtcblxuTEdyYXBoLnByb3RvdHlwZS51cGRhdGVMZWZ0VG9wID0gZnVuY3Rpb24gKClcbntcbiAgdmFyIHRvcCA9IEludGVnZXIuTUFYX1ZBTFVFO1xuICB2YXIgbGVmdCA9IEludGVnZXIuTUFYX1ZBTFVFO1xuICB2YXIgbm9kZVRvcDtcbiAgdmFyIG5vZGVMZWZ0O1xuICB2YXIgbWFyZ2luO1xuXG4gIHZhciBub2RlcyA9IHRoaXMuZ2V0Tm9kZXMoKTtcbiAgdmFyIHMgPSBub2Rlcy5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzOyBpKyspXG4gIHtcbiAgICB2YXIgbE5vZGUgPSBub2Rlc1tpXTtcbiAgICBub2RlVG9wID0gbE5vZGUuZ2V0VG9wKCk7XG4gICAgbm9kZUxlZnQgPSBsTm9kZS5nZXRMZWZ0KCk7XG5cbiAgICBpZiAodG9wID4gbm9kZVRvcClcbiAgICB7XG4gICAgICB0b3AgPSBub2RlVG9wO1xuICAgIH1cblxuICAgIGlmIChsZWZ0ID4gbm9kZUxlZnQpXG4gICAge1xuICAgICAgbGVmdCA9IG5vZGVMZWZ0O1xuICAgIH1cbiAgfVxuXG4gIC8vIERvIHdlIGhhdmUgYW55IG5vZGVzIGluIHRoaXMgZ3JhcGg/XG4gIGlmICh0b3AgPT0gSW50ZWdlci5NQVhfVkFMVUUpXG4gIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBcbiAgaWYobm9kZXNbMF0uZ2V0UGFyZW50KCkucGFkZGluZ0xlZnQgIT0gdW5kZWZpbmVkKXtcbiAgICBtYXJnaW4gPSBub2Rlc1swXS5nZXRQYXJlbnQoKS5wYWRkaW5nTGVmdDtcbiAgfVxuICBlbHNle1xuICAgIG1hcmdpbiA9IHRoaXMubWFyZ2luO1xuICB9XG5cbiAgdGhpcy5sZWZ0ID0gbGVmdCAtIG1hcmdpbjtcbiAgdGhpcy50b3AgPSB0b3AgLSBtYXJnaW47XG5cbiAgLy8gQXBwbHkgdGhlIG1hcmdpbnMgYW5kIHJldHVybiB0aGUgcmVzdWx0XG4gIHJldHVybiBuZXcgUG9pbnQodGhpcy5sZWZ0LCB0aGlzLnRvcCk7XG59O1xuXG5MR3JhcGgucHJvdG90eXBlLnVwZGF0ZUJvdW5kcyA9IGZ1bmN0aW9uIChyZWN1cnNpdmUpXG57XG4gIC8vIGNhbGN1bGF0ZSBib3VuZHNcbiAgdmFyIGxlZnQgPSBJbnRlZ2VyLk1BWF9WQUxVRTtcbiAgdmFyIHJpZ2h0ID0gLUludGVnZXIuTUFYX1ZBTFVFO1xuICB2YXIgdG9wID0gSW50ZWdlci5NQVhfVkFMVUU7XG4gIHZhciBib3R0b20gPSAtSW50ZWdlci5NQVhfVkFMVUU7XG4gIHZhciBub2RlTGVmdDtcbiAgdmFyIG5vZGVSaWdodDtcbiAgdmFyIG5vZGVUb3A7XG4gIHZhciBub2RlQm90dG9tO1xuICB2YXIgbWFyZ2luO1xuXG4gIHZhciBub2RlcyA9IHRoaXMubm9kZXM7XG4gIHZhciBzID0gbm9kZXMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHM7IGkrKylcbiAge1xuICAgIHZhciBsTm9kZSA9IG5vZGVzW2ldO1xuXG4gICAgaWYgKHJlY3Vyc2l2ZSAmJiBsTm9kZS5jaGlsZCAhPSBudWxsKVxuICAgIHtcbiAgICAgIGxOb2RlLnVwZGF0ZUJvdW5kcygpO1xuICAgIH1cbiAgICBub2RlTGVmdCA9IGxOb2RlLmdldExlZnQoKTtcbiAgICBub2RlUmlnaHQgPSBsTm9kZS5nZXRSaWdodCgpO1xuICAgIG5vZGVUb3AgPSBsTm9kZS5nZXRUb3AoKTtcbiAgICBub2RlQm90dG9tID0gbE5vZGUuZ2V0Qm90dG9tKCk7XG5cbiAgICBpZiAobGVmdCA+IG5vZGVMZWZ0KVxuICAgIHtcbiAgICAgIGxlZnQgPSBub2RlTGVmdDtcbiAgICB9XG5cbiAgICBpZiAocmlnaHQgPCBub2RlUmlnaHQpXG4gICAge1xuICAgICAgcmlnaHQgPSBub2RlUmlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKHRvcCA+IG5vZGVUb3ApXG4gICAge1xuICAgICAgdG9wID0gbm9kZVRvcDtcbiAgICB9XG5cbiAgICBpZiAoYm90dG9tIDwgbm9kZUJvdHRvbSlcbiAgICB7XG4gICAgICBib3R0b20gPSBub2RlQm90dG9tO1xuICAgIH1cbiAgfVxuXG4gIHZhciBib3VuZGluZ1JlY3QgPSBuZXcgUmVjdGFuZ2xlRChsZWZ0LCB0b3AsIHJpZ2h0IC0gbGVmdCwgYm90dG9tIC0gdG9wKTtcbiAgaWYgKGxlZnQgPT0gSW50ZWdlci5NQVhfVkFMVUUpXG4gIHtcbiAgICB0aGlzLmxlZnQgPSB0aGlzLnBhcmVudC5nZXRMZWZ0KCk7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMucGFyZW50LmdldFJpZ2h0KCk7XG4gICAgdGhpcy50b3AgPSB0aGlzLnBhcmVudC5nZXRUb3AoKTtcbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMucGFyZW50LmdldEJvdHRvbSgpO1xuICB9XG4gIFxuICBpZihub2Rlc1swXS5nZXRQYXJlbnQoKS5wYWRkaW5nTGVmdCAhPSB1bmRlZmluZWQpe1xuICAgIG1hcmdpbiA9IG5vZGVzWzBdLmdldFBhcmVudCgpLnBhZGRpbmdMZWZ0O1xuICB9XG4gIGVsc2V7XG4gICAgbWFyZ2luID0gdGhpcy5tYXJnaW47XG4gIH1cblxuICB0aGlzLmxlZnQgPSBib3VuZGluZ1JlY3QueCAtIG1hcmdpbjtcbiAgdGhpcy5yaWdodCA9IGJvdW5kaW5nUmVjdC54ICsgYm91bmRpbmdSZWN0LndpZHRoICsgbWFyZ2luO1xuICB0aGlzLnRvcCA9IGJvdW5kaW5nUmVjdC55IC0gbWFyZ2luO1xuICB0aGlzLmJvdHRvbSA9IGJvdW5kaW5nUmVjdC55ICsgYm91bmRpbmdSZWN0LmhlaWdodCArIG1hcmdpbjtcbn07XG5cbkxHcmFwaC5jYWxjdWxhdGVCb3VuZHMgPSBmdW5jdGlvbiAobm9kZXMpXG57XG4gIHZhciBsZWZ0ID0gSW50ZWdlci5NQVhfVkFMVUU7XG4gIHZhciByaWdodCA9IC1JbnRlZ2VyLk1BWF9WQUxVRTtcbiAgdmFyIHRvcCA9IEludGVnZXIuTUFYX1ZBTFVFO1xuICB2YXIgYm90dG9tID0gLUludGVnZXIuTUFYX1ZBTFVFO1xuICB2YXIgbm9kZUxlZnQ7XG4gIHZhciBub2RlUmlnaHQ7XG4gIHZhciBub2RlVG9wO1xuICB2YXIgbm9kZUJvdHRvbTtcblxuICB2YXIgcyA9IG5vZGVzLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHM7IGkrKylcbiAge1xuICAgIHZhciBsTm9kZSA9IG5vZGVzW2ldO1xuICAgIG5vZGVMZWZ0ID0gbE5vZGUuZ2V0TGVmdCgpO1xuICAgIG5vZGVSaWdodCA9IGxOb2RlLmdldFJpZ2h0KCk7XG4gICAgbm9kZVRvcCA9IGxOb2RlLmdldFRvcCgpO1xuICAgIG5vZGVCb3R0b20gPSBsTm9kZS5nZXRCb3R0b20oKTtcblxuICAgIGlmIChsZWZ0ID4gbm9kZUxlZnQpXG4gICAge1xuICAgICAgbGVmdCA9IG5vZGVMZWZ0O1xuICAgIH1cblxuICAgIGlmIChyaWdodCA8IG5vZGVSaWdodClcbiAgICB7XG4gICAgICByaWdodCA9IG5vZGVSaWdodDtcbiAgICB9XG5cbiAgICBpZiAodG9wID4gbm9kZVRvcClcbiAgICB7XG4gICAgICB0b3AgPSBub2RlVG9wO1xuICAgIH1cblxuICAgIGlmIChib3R0b20gPCBub2RlQm90dG9tKVxuICAgIHtcbiAgICAgIGJvdHRvbSA9IG5vZGVCb3R0b207XG4gICAgfVxuICB9XG5cbiAgdmFyIGJvdW5kaW5nUmVjdCA9IG5ldyBSZWN0YW5nbGVEKGxlZnQsIHRvcCwgcmlnaHQgLSBsZWZ0LCBib3R0b20gLSB0b3ApO1xuXG4gIHJldHVybiBib3VuZGluZ1JlY3Q7XG59O1xuXG5MR3JhcGgucHJvdG90eXBlLmdldEluY2x1c2lvblRyZWVEZXB0aCA9IGZ1bmN0aW9uICgpXG57XG4gIGlmICh0aGlzID09IHRoaXMuZ3JhcGhNYW5hZ2VyLmdldFJvb3QoKSlcbiAge1xuICAgIHJldHVybiAxO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHJldHVybiB0aGlzLnBhcmVudC5nZXRJbmNsdXNpb25UcmVlRGVwdGgoKTtcbiAgfVxufTtcblxuTEdyYXBoLnByb3RvdHlwZS5nZXRFc3RpbWF0ZWRTaXplID0gZnVuY3Rpb24gKClcbntcbiAgaWYgKHRoaXMuZXN0aW1hdGVkU2l6ZSA9PSBJbnRlZ2VyLk1JTl9WQUxVRSkge1xuICAgIHRocm93IFwiYXNzZXJ0IGZhaWxlZFwiO1xuICB9XG4gIHJldHVybiB0aGlzLmVzdGltYXRlZFNpemU7XG59O1xuXG5MR3JhcGgucHJvdG90eXBlLmNhbGNFc3RpbWF0ZWRTaXplID0gZnVuY3Rpb24gKClcbntcbiAgdmFyIHNpemUgPSAwO1xuICB2YXIgbm9kZXMgPSB0aGlzLm5vZGVzO1xuICB2YXIgcyA9IG5vZGVzLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHM7IGkrKylcbiAge1xuICAgIHZhciBsTm9kZSA9IG5vZGVzW2ldO1xuICAgIHNpemUgKz0gbE5vZGUuY2FsY0VzdGltYXRlZFNpemUoKTtcbiAgfVxuXG4gIGlmIChzaXplID09IDApXG4gIHtcbiAgICB0aGlzLmVzdGltYXRlZFNpemUgPSBMYXlvdXRDb25zdGFudHMuRU1QVFlfQ09NUE9VTkRfTk9ERV9TSVpFO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHRoaXMuZXN0aW1hdGVkU2l6ZSA9IHNpemUgLyBNYXRoLnNxcnQodGhpcy5ub2Rlcy5sZW5ndGgpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZXN0aW1hdGVkU2l6ZTtcbn07XG5cbkxHcmFwaC5wcm90b3R5cGUudXBkYXRlQ29ubmVjdGVkID0gZnVuY3Rpb24gKClcbntcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBpZiAodGhpcy5ub2Rlcy5sZW5ndGggPT0gMClcbiAge1xuICAgIHRoaXMuaXNDb25uZWN0ZWQgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB0b0JlVmlzaXRlZCA9IG5ldyBMaXN0KCk7XG4gIHZhciB2aXNpdGVkID0gbmV3IEhhc2hTZXQoKTtcbiAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5ub2Rlc1swXTtcbiAgdmFyIG5laWdoYm9yRWRnZXM7XG4gIHZhciBjdXJyZW50TmVpZ2hib3I7XG4gIHZhciBjaGlsZHJlbk9mTm9kZSA9IGN1cnJlbnROb2RlLndpdGhDaGlsZHJlbigpO1xuICBjaGlsZHJlbk9mTm9kZS5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICB0b0JlVmlzaXRlZC5wdXNoKG5vZGUpO1xuICB9KTtcblxuICB3aGlsZSAoIXRvQmVWaXNpdGVkLmlzRW1wdHkoKSlcbiAge1xuICAgIGN1cnJlbnROb2RlID0gdG9CZVZpc2l0ZWQuc2hpZnQoKS52YWx1ZSgpO1xuICAgIHZpc2l0ZWQuYWRkKGN1cnJlbnROb2RlKTtcblxuICAgIC8vIFRyYXZlcnNlIGFsbCBuZWlnaGJvcnMgb2YgdGhpcyBub2RlXG4gICAgbmVpZ2hib3JFZGdlcyA9IGN1cnJlbnROb2RlLmdldEVkZ2VzKCk7XG4gICAgdmFyIHMgPSBuZWlnaGJvckVkZ2VzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHM7IGkrKylcbiAgICB7XG4gICAgICB2YXIgbmVpZ2hib3JFZGdlID0gbmVpZ2hib3JFZGdlc1tpXTtcbiAgICAgIGN1cnJlbnROZWlnaGJvciA9XG4gICAgICAgICAgICAgIG5laWdoYm9yRWRnZS5nZXRPdGhlckVuZEluR3JhcGgoY3VycmVudE5vZGUsIHRoaXMpO1xuXG4gICAgICAvLyBBZGQgdW52aXNpdGVkIG5laWdoYm9ycyB0byB0aGUgbGlzdCB0byB2aXNpdFxuICAgICAgaWYgKGN1cnJlbnROZWlnaGJvciAhPSBudWxsICYmXG4gICAgICAgICAgICAgICF2aXNpdGVkLmNvbnRhaW5zKGN1cnJlbnROZWlnaGJvcikpXG4gICAgICB7XG4gICAgICAgIHZhciBjaGlsZHJlbk9mTmVpZ2hib3IgPSBjdXJyZW50TmVpZ2hib3Iud2l0aENoaWxkcmVuKCk7XG4gICAgICAgIFxuICAgICAgICBjaGlsZHJlbk9mTmVpZ2hib3IuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgdG9CZVZpc2l0ZWQucHVzaChub2RlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5pc0Nvbm5lY3RlZCA9IGZhbHNlO1xuXG4gIGlmICh2aXNpdGVkLnNpemUoKSA+PSB0aGlzLm5vZGVzLmxlbmd0aClcbiAge1xuICAgIHZhciBub09mVmlzaXRlZEluVGhpc0dyYXBoID0gMDtcbiAgICBcbiAgICB2YXIgcyA9IHZpc2l0ZWQuc2l6ZSgpO1xuICAgICBPYmplY3Qua2V5cyh2aXNpdGVkLnNldCkuZm9yRWFjaChmdW5jdGlvbih2aXNpdGVkSWQpIHtcbiAgICAgIHZhciB2aXNpdGVkTm9kZSA9IHZpc2l0ZWQuc2V0W3Zpc2l0ZWRJZF07XG4gICAgICBpZiAodmlzaXRlZE5vZGUub3duZXIgPT0gc2VsZilcbiAgICAgIHtcbiAgICAgICAgbm9PZlZpc2l0ZWRJblRoaXNHcmFwaCsrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG5vT2ZWaXNpdGVkSW5UaGlzR3JhcGggPT0gdGhpcy5ub2Rlcy5sZW5ndGgpXG4gICAge1xuICAgICAgdGhpcy5pc0Nvbm5lY3RlZCA9IHRydWU7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExHcmFwaDtcbiIsInZhciBMR3JhcGg7XG52YXIgTEVkZ2UgPSByZXF1aXJlKCcuL0xFZGdlJyk7XG5cbmZ1bmN0aW9uIExHcmFwaE1hbmFnZXIobGF5b3V0KSB7XG4gIExHcmFwaCA9IHJlcXVpcmUoJy4vTEdyYXBoJyk7IC8vIEl0IG1heSBiZSBiZXR0ZXIgdG8gaW5pdGlsaXplIHRoaXMgb3V0IG9mIHRoaXMgZnVuY3Rpb24gYnV0IGl0IGdpdmVzIGFuIGVycm9yIChSaWdodC1oYW5kIHNpZGUgb2YgJ2luc3RhbmNlb2YnIGlzIG5vdCBjYWxsYWJsZSkgbm93LlxuICB0aGlzLmxheW91dCA9IGxheW91dDtcblxuICB0aGlzLmdyYXBocyA9IFtdO1xuICB0aGlzLmVkZ2VzID0gW107XG59XG5cbkxHcmFwaE1hbmFnZXIucHJvdG90eXBlLmFkZFJvb3QgPSBmdW5jdGlvbiAoKVxue1xuICB2YXIgbmdyYXBoID0gdGhpcy5sYXlvdXQubmV3R3JhcGgoKTtcbiAgdmFyIG5ub2RlID0gdGhpcy5sYXlvdXQubmV3Tm9kZShudWxsKTtcbiAgdmFyIHJvb3QgPSB0aGlzLmFkZChuZ3JhcGgsIG5ub2RlKTtcbiAgdGhpcy5zZXRSb290R3JhcGgocm9vdCk7XG4gIHJldHVybiB0aGlzLnJvb3RHcmFwaDtcbn07XG5cbkxHcmFwaE1hbmFnZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChuZXdHcmFwaCwgcGFyZW50Tm9kZSwgbmV3RWRnZSwgc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSlcbntcbiAgLy90aGVyZSBhcmUganVzdCAyIHBhcmFtZXRlcnMgYXJlIHBhc3NlZCB0aGVuIGl0IGFkZHMgYW4gTEdyYXBoIGVsc2UgaXQgYWRkcyBhbiBMRWRnZVxuICBpZiAobmV3RWRnZSA9PSBudWxsICYmIHNvdXJjZU5vZGUgPT0gbnVsbCAmJiB0YXJnZXROb2RlID09IG51bGwpIHtcbiAgICBpZiAobmV3R3JhcGggPT0gbnVsbCkge1xuICAgICAgdGhyb3cgXCJHcmFwaCBpcyBudWxsIVwiO1xuICAgIH1cbiAgICBpZiAocGFyZW50Tm9kZSA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBcIlBhcmVudCBub2RlIGlzIG51bGwhXCI7XG4gICAgfVxuICAgIGlmICh0aGlzLmdyYXBocy5pbmRleE9mKG5ld0dyYXBoKSA+IC0xKSB7XG4gICAgICB0aHJvdyBcIkdyYXBoIGFscmVhZHkgaW4gdGhpcyBncmFwaCBtZ3IhXCI7XG4gICAgfVxuXG4gICAgdGhpcy5ncmFwaHMucHVzaChuZXdHcmFwaCk7XG5cbiAgICBpZiAobmV3R3JhcGgucGFyZW50ICE9IG51bGwpIHtcbiAgICAgIHRocm93IFwiQWxyZWFkeSBoYXMgYSBwYXJlbnQhXCI7XG4gICAgfVxuICAgIGlmIChwYXJlbnROb2RlLmNoaWxkICE9IG51bGwpIHtcbiAgICAgIHRocm93ICBcIkFscmVhZHkgaGFzIGEgY2hpbGQhXCI7XG4gICAgfVxuXG4gICAgbmV3R3JhcGgucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICBwYXJlbnROb2RlLmNoaWxkID0gbmV3R3JhcGg7XG5cbiAgICByZXR1cm4gbmV3R3JhcGg7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy9jaGFuZ2UgdGhlIG9yZGVyIG9mIHRoZSBwYXJhbWV0ZXJzXG4gICAgdGFyZ2V0Tm9kZSA9IG5ld0VkZ2U7XG4gICAgc291cmNlTm9kZSA9IHBhcmVudE5vZGU7XG4gICAgbmV3RWRnZSA9IG5ld0dyYXBoO1xuICAgIHZhciBzb3VyY2VHcmFwaCA9IHNvdXJjZU5vZGUuZ2V0T3duZXIoKTtcbiAgICB2YXIgdGFyZ2V0R3JhcGggPSB0YXJnZXROb2RlLmdldE93bmVyKCk7XG5cbiAgICBpZiAoIShzb3VyY2VHcmFwaCAhPSBudWxsICYmIHNvdXJjZUdyYXBoLmdldEdyYXBoTWFuYWdlcigpID09IHRoaXMpKSB7XG4gICAgICB0aHJvdyBcIlNvdXJjZSBub3QgaW4gdGhpcyBncmFwaCBtZ3IhXCI7XG4gICAgfVxuICAgIGlmICghKHRhcmdldEdyYXBoICE9IG51bGwgJiYgdGFyZ2V0R3JhcGguZ2V0R3JhcGhNYW5hZ2VyKCkgPT0gdGhpcykpIHtcbiAgICAgIHRocm93IFwiVGFyZ2V0IG5vdCBpbiB0aGlzIGdyYXBoIG1nciFcIjtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlR3JhcGggPT0gdGFyZ2V0R3JhcGgpXG4gICAge1xuICAgICAgbmV3RWRnZS5pc0ludGVyR3JhcGggPSBmYWxzZTtcbiAgICAgIHJldHVybiBzb3VyY2VHcmFwaC5hZGQobmV3RWRnZSwgc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBuZXdFZGdlLmlzSW50ZXJHcmFwaCA9IHRydWU7XG5cbiAgICAgIC8vIHNldCBzb3VyY2UgYW5kIHRhcmdldFxuICAgICAgbmV3RWRnZS5zb3VyY2UgPSBzb3VyY2VOb2RlO1xuICAgICAgbmV3RWRnZS50YXJnZXQgPSB0YXJnZXROb2RlO1xuXG4gICAgICAvLyBhZGQgZWRnZSB0byBpbnRlci1ncmFwaCBlZGdlIGxpc3RcbiAgICAgIGlmICh0aGlzLmVkZ2VzLmluZGV4T2YobmV3RWRnZSkgPiAtMSkge1xuICAgICAgICB0aHJvdyBcIkVkZ2UgYWxyZWFkeSBpbiBpbnRlci1ncmFwaCBlZGdlIGxpc3QhXCI7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZWRnZXMucHVzaChuZXdFZGdlKTtcblxuICAgICAgLy8gYWRkIGVkZ2UgdG8gc291cmNlIGFuZCB0YXJnZXQgaW5jaWRlbmN5IGxpc3RzXG4gICAgICBpZiAoIShuZXdFZGdlLnNvdXJjZSAhPSBudWxsICYmIG5ld0VkZ2UudGFyZ2V0ICE9IG51bGwpKSB7XG4gICAgICAgIHRocm93IFwiRWRnZSBzb3VyY2UgYW5kL29yIHRhcmdldCBpcyBudWxsIVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoIShuZXdFZGdlLnNvdXJjZS5lZGdlcy5pbmRleE9mKG5ld0VkZ2UpID09IC0xICYmIG5ld0VkZ2UudGFyZ2V0LmVkZ2VzLmluZGV4T2YobmV3RWRnZSkgPT0gLTEpKSB7XG4gICAgICAgIHRocm93IFwiRWRnZSBhbHJlYWR5IGluIHNvdXJjZSBhbmQvb3IgdGFyZ2V0IGluY2lkZW5jeSBsaXN0IVwiO1xuICAgICAgfVxuXG4gICAgICBuZXdFZGdlLnNvdXJjZS5lZGdlcy5wdXNoKG5ld0VkZ2UpO1xuICAgICAgbmV3RWRnZS50YXJnZXQuZWRnZXMucHVzaChuZXdFZGdlKTtcblxuICAgICAgcmV0dXJuIG5ld0VkZ2U7XG4gICAgfVxuICB9XG59O1xuXG5MR3JhcGhNYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAobE9iaikge1xuICBpZiAobE9iaiBpbnN0YW5jZW9mIExHcmFwaCkge1xuICAgIHZhciBncmFwaCA9IGxPYmo7XG4gICAgaWYgKGdyYXBoLmdldEdyYXBoTWFuYWdlcigpICE9IHRoaXMpIHtcbiAgICAgIHRocm93IFwiR3JhcGggbm90IGluIHRoaXMgZ3JhcGggbWdyXCI7XG4gICAgfVxuICAgIGlmICghKGdyYXBoID09IHRoaXMucm9vdEdyYXBoIHx8IChncmFwaC5wYXJlbnQgIT0gbnVsbCAmJiBncmFwaC5wYXJlbnQuZ3JhcGhNYW5hZ2VyID09IHRoaXMpKSkge1xuICAgICAgdGhyb3cgXCJJbnZhbGlkIHBhcmVudCBub2RlIVwiO1xuICAgIH1cblxuICAgIC8vIGZpcnN0IHRoZSBlZGdlcyAobWFrZSBhIGNvcHkgdG8gZG8gaXQgc2FmZWx5KVxuICAgIHZhciBlZGdlc1RvQmVSZW1vdmVkID0gW107XG5cbiAgICBlZGdlc1RvQmVSZW1vdmVkID0gZWRnZXNUb0JlUmVtb3ZlZC5jb25jYXQoZ3JhcGguZ2V0RWRnZXMoKSk7XG5cbiAgICB2YXIgZWRnZTtcbiAgICB2YXIgcyA9IGVkZ2VzVG9CZVJlbW92ZWQubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgczsgaSsrKVxuICAgIHtcbiAgICAgIGVkZ2UgPSBlZGdlc1RvQmVSZW1vdmVkW2ldO1xuICAgICAgZ3JhcGgucmVtb3ZlKGVkZ2UpO1xuICAgIH1cblxuICAgIC8vIHRoZW4gdGhlIG5vZGVzIChtYWtlIGEgY29weSB0byBkbyBpdCBzYWZlbHkpXG4gICAgdmFyIG5vZGVzVG9CZVJlbW92ZWQgPSBbXTtcblxuICAgIG5vZGVzVG9CZVJlbW92ZWQgPSBub2Rlc1RvQmVSZW1vdmVkLmNvbmNhdChncmFwaC5nZXROb2RlcygpKTtcblxuICAgIHZhciBub2RlO1xuICAgIHMgPSBub2Rlc1RvQmVSZW1vdmVkLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHM7IGkrKylcbiAgICB7XG4gICAgICBub2RlID0gbm9kZXNUb0JlUmVtb3ZlZFtpXTtcbiAgICAgIGdyYXBoLnJlbW92ZShub2RlKTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBpZiBncmFwaCBpcyB0aGUgcm9vdFxuICAgIGlmIChncmFwaCA9PSB0aGlzLnJvb3RHcmFwaClcbiAgICB7XG4gICAgICB0aGlzLnNldFJvb3RHcmFwaChudWxsKTtcbiAgICB9XG5cbiAgICAvLyBub3cgcmVtb3ZlIHRoZSBncmFwaCBpdHNlbGZcbiAgICB2YXIgaW5kZXggPSB0aGlzLmdyYXBocy5pbmRleE9mKGdyYXBoKTtcbiAgICB0aGlzLmdyYXBocy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgLy8gYWxzbyByZXNldCB0aGUgcGFyZW50IG9mIHRoZSBncmFwaFxuICAgIGdyYXBoLnBhcmVudCA9IG51bGw7XG4gIH1cbiAgZWxzZSBpZiAobE9iaiBpbnN0YW5jZW9mIExFZGdlKSB7XG4gICAgZWRnZSA9IGxPYmo7XG4gICAgaWYgKGVkZ2UgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgXCJFZGdlIGlzIG51bGwhXCI7XG4gICAgfVxuICAgIGlmICghZWRnZS5pc0ludGVyR3JhcGgpIHtcbiAgICAgIHRocm93IFwiTm90IGFuIGludGVyLWdyYXBoIGVkZ2UhXCI7XG4gICAgfVxuICAgIGlmICghKGVkZ2Uuc291cmNlICE9IG51bGwgJiYgZWRnZS50YXJnZXQgIT0gbnVsbCkpIHtcbiAgICAgIHRocm93IFwiU291cmNlIGFuZC9vciB0YXJnZXQgaXMgbnVsbCFcIjtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgZWRnZSBmcm9tIHNvdXJjZSBhbmQgdGFyZ2V0IG5vZGVzJyBpbmNpZGVuY3kgbGlzdHNcblxuICAgIGlmICghKGVkZ2Uuc291cmNlLmVkZ2VzLmluZGV4T2YoZWRnZSkgIT0gLTEgJiYgZWRnZS50YXJnZXQuZWRnZXMuaW5kZXhPZihlZGdlKSAhPSAtMSkpIHtcbiAgICAgIHRocm93IFwiU291cmNlIGFuZC9vciB0YXJnZXQgZG9lc24ndCBrbm93IHRoaXMgZWRnZSFcIjtcbiAgICB9XG5cbiAgICB2YXIgaW5kZXggPSBlZGdlLnNvdXJjZS5lZGdlcy5pbmRleE9mKGVkZ2UpO1xuICAgIGVkZ2Uuc291cmNlLmVkZ2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgaW5kZXggPSBlZGdlLnRhcmdldC5lZGdlcy5pbmRleE9mKGVkZ2UpO1xuICAgIGVkZ2UudGFyZ2V0LmVkZ2VzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAvLyByZW1vdmUgZWRnZSBmcm9tIG93bmVyIGdyYXBoIG1hbmFnZXIncyBpbnRlci1ncmFwaCBlZGdlIGxpc3RcblxuICAgIGlmICghKGVkZ2Uuc291cmNlLm93bmVyICE9IG51bGwgJiYgZWRnZS5zb3VyY2Uub3duZXIuZ2V0R3JhcGhNYW5hZ2VyKCkgIT0gbnVsbCkpIHtcbiAgICAgIHRocm93IFwiRWRnZSBvd25lciBncmFwaCBvciBvd25lciBncmFwaCBtYW5hZ2VyIGlzIG51bGwhXCI7XG4gICAgfVxuICAgIGlmIChlZGdlLnNvdXJjZS5vd25lci5nZXRHcmFwaE1hbmFnZXIoKS5lZGdlcy5pbmRleE9mKGVkZ2UpID09IC0xKSB7XG4gICAgICB0aHJvdyBcIk5vdCBpbiBvd25lciBncmFwaCBtYW5hZ2VyJ3MgZWRnZSBsaXN0IVwiO1xuICAgIH1cblxuICAgIHZhciBpbmRleCA9IGVkZ2Uuc291cmNlLm93bmVyLmdldEdyYXBoTWFuYWdlcigpLmVkZ2VzLmluZGV4T2YoZWRnZSk7XG4gICAgZWRnZS5zb3VyY2Uub3duZXIuZ2V0R3JhcGhNYW5hZ2VyKCkuZWRnZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufTtcblxuTEdyYXBoTWFuYWdlci5wcm90b3R5cGUudXBkYXRlQm91bmRzID0gZnVuY3Rpb24gKClcbntcbiAgdGhpcy5yb290R3JhcGgudXBkYXRlQm91bmRzKHRydWUpO1xufTtcblxuTEdyYXBoTWFuYWdlci5wcm90b3R5cGUuZ2V0R3JhcGhzID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHRoaXMuZ3JhcGhzO1xufTtcblxuTEdyYXBoTWFuYWdlci5wcm90b3R5cGUuZ2V0QWxsTm9kZXMgPSBmdW5jdGlvbiAoKVxue1xuICBpZiAodGhpcy5hbGxOb2RlcyA9PSBudWxsKVxuICB7XG4gICAgdmFyIG5vZGVMaXN0ID0gW107XG4gICAgdmFyIGdyYXBocyA9IHRoaXMuZ2V0R3JhcGhzKCk7XG4gICAgdmFyIHMgPSBncmFwaHMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgczsgaSsrKVxuICAgIHtcbiAgICAgIG5vZGVMaXN0ID0gbm9kZUxpc3QuY29uY2F0KGdyYXBoc1tpXS5nZXROb2RlcygpKTtcbiAgICB9XG4gICAgdGhpcy5hbGxOb2RlcyA9IG5vZGVMaXN0O1xuICB9XG4gIHJldHVybiB0aGlzLmFsbE5vZGVzO1xufTtcblxuTEdyYXBoTWFuYWdlci5wcm90b3R5cGUucmVzZXRBbGxOb2RlcyA9IGZ1bmN0aW9uICgpXG57XG4gIHRoaXMuYWxsTm9kZXMgPSBudWxsO1xufTtcblxuTEdyYXBoTWFuYWdlci5wcm90b3R5cGUucmVzZXRBbGxFZGdlcyA9IGZ1bmN0aW9uICgpXG57XG4gIHRoaXMuYWxsRWRnZXMgPSBudWxsO1xufTtcblxuTEdyYXBoTWFuYWdlci5wcm90b3R5cGUucmVzZXRBbGxOb2Rlc1RvQXBwbHlHcmF2aXRhdGlvbiA9IGZ1bmN0aW9uICgpXG57XG4gIHRoaXMuYWxsTm9kZXNUb0FwcGx5R3Jhdml0YXRpb24gPSBudWxsO1xufTtcblxuTEdyYXBoTWFuYWdlci5wcm90b3R5cGUuZ2V0QWxsRWRnZXMgPSBmdW5jdGlvbiAoKVxue1xuICBpZiAodGhpcy5hbGxFZGdlcyA9PSBudWxsKVxuICB7XG4gICAgdmFyIGVkZ2VMaXN0ID0gW107XG4gICAgdmFyIGdyYXBocyA9IHRoaXMuZ2V0R3JhcGhzKCk7XG4gICAgdmFyIHMgPSBncmFwaHMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JhcGhzLmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIGVkZ2VMaXN0ID0gZWRnZUxpc3QuY29uY2F0KGdyYXBoc1tpXS5nZXRFZGdlcygpKTtcbiAgICB9XG5cbiAgICBlZGdlTGlzdCA9IGVkZ2VMaXN0LmNvbmNhdCh0aGlzLmVkZ2VzKTtcblxuICAgIHRoaXMuYWxsRWRnZXMgPSBlZGdlTGlzdDtcbiAgfVxuICByZXR1cm4gdGhpcy5hbGxFZGdlcztcbn07XG5cbkxHcmFwaE1hbmFnZXIucHJvdG90eXBlLmdldEFsbE5vZGVzVG9BcHBseUdyYXZpdGF0aW9uID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHRoaXMuYWxsTm9kZXNUb0FwcGx5R3Jhdml0YXRpb247XG59O1xuXG5MR3JhcGhNYW5hZ2VyLnByb3RvdHlwZS5zZXRBbGxOb2Rlc1RvQXBwbHlHcmF2aXRhdGlvbiA9IGZ1bmN0aW9uIChub2RlTGlzdClcbntcbiAgaWYgKHRoaXMuYWxsTm9kZXNUb0FwcGx5R3Jhdml0YXRpb24gIT0gbnVsbCkge1xuICAgIHRocm93IFwiYXNzZXJ0IGZhaWxlZFwiO1xuICB9XG5cbiAgdGhpcy5hbGxOb2Rlc1RvQXBwbHlHcmF2aXRhdGlvbiA9IG5vZGVMaXN0O1xufTtcblxuTEdyYXBoTWFuYWdlci5wcm90b3R5cGUuZ2V0Um9vdCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLnJvb3RHcmFwaDtcbn07XG5cbkxHcmFwaE1hbmFnZXIucHJvdG90eXBlLnNldFJvb3RHcmFwaCA9IGZ1bmN0aW9uIChncmFwaClcbntcbiAgaWYgKGdyYXBoLmdldEdyYXBoTWFuYWdlcigpICE9IHRoaXMpIHtcbiAgICB0aHJvdyBcIlJvb3Qgbm90IGluIHRoaXMgZ3JhcGggbWdyIVwiO1xuICB9XG5cbiAgdGhpcy5yb290R3JhcGggPSBncmFwaDtcbiAgLy8gcm9vdCBncmFwaCBtdXN0IGhhdmUgYSByb290IG5vZGUgYXNzb2NpYXRlZCB3aXRoIGl0IGZvciBjb252ZW5pZW5jZVxuICBpZiAoZ3JhcGgucGFyZW50ID09IG51bGwpXG4gIHtcbiAgICBncmFwaC5wYXJlbnQgPSB0aGlzLmxheW91dC5uZXdOb2RlKFwiUm9vdCBub2RlXCIpO1xuICB9XG59O1xuXG5MR3JhcGhNYW5hZ2VyLnByb3RvdHlwZS5nZXRMYXlvdXQgPSBmdW5jdGlvbiAoKVxue1xuICByZXR1cm4gdGhpcy5sYXlvdXQ7XG59O1xuXG5MR3JhcGhNYW5hZ2VyLnByb3RvdHlwZS5pc09uZUFuY2VzdG9yT2ZPdGhlciA9IGZ1bmN0aW9uIChmaXJzdE5vZGUsIHNlY29uZE5vZGUpXG57XG4gIGlmICghKGZpcnN0Tm9kZSAhPSBudWxsICYmIHNlY29uZE5vZGUgIT0gbnVsbCkpIHtcbiAgICB0aHJvdyBcImFzc2VydCBmYWlsZWRcIjtcbiAgfVxuXG4gIGlmIChmaXJzdE5vZGUgPT0gc2Vjb25kTm9kZSlcbiAge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIC8vIElzIHNlY29uZCBub2RlIGFuIGFuY2VzdG9yIG9mIHRoZSBmaXJzdCBvbmU/XG4gIHZhciBvd25lckdyYXBoID0gZmlyc3ROb2RlLmdldE93bmVyKCk7XG4gIHZhciBwYXJlbnROb2RlO1xuXG4gIGRvXG4gIHtcbiAgICBwYXJlbnROb2RlID0gb3duZXJHcmFwaC5nZXRQYXJlbnQoKTtcblxuICAgIGlmIChwYXJlbnROb2RlID09IG51bGwpXG4gICAge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHBhcmVudE5vZGUgPT0gc2Vjb25kTm9kZSlcbiAgICB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBvd25lckdyYXBoID0gcGFyZW50Tm9kZS5nZXRPd25lcigpO1xuICAgIGlmIChvd25lckdyYXBoID09IG51bGwpXG4gICAge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9IHdoaWxlICh0cnVlKTtcbiAgLy8gSXMgZmlyc3Qgbm9kZSBhbiBhbmNlc3RvciBvZiB0aGUgc2Vjb25kIG9uZT9cbiAgb3duZXJHcmFwaCA9IHNlY29uZE5vZGUuZ2V0T3duZXIoKTtcblxuICBkb1xuICB7XG4gICAgcGFyZW50Tm9kZSA9IG93bmVyR3JhcGguZ2V0UGFyZW50KCk7XG5cbiAgICBpZiAocGFyZW50Tm9kZSA9PSBudWxsKVxuICAgIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChwYXJlbnROb2RlID09IGZpcnN0Tm9kZSlcbiAgICB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBvd25lckdyYXBoID0gcGFyZW50Tm9kZS5nZXRPd25lcigpO1xuICAgIGlmIChvd25lckdyYXBoID09IG51bGwpXG4gICAge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9IHdoaWxlICh0cnVlKTtcblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5MR3JhcGhNYW5hZ2VyLnByb3RvdHlwZS5jYWxjTG93ZXN0Q29tbW9uQW5jZXN0b3JzID0gZnVuY3Rpb24gKClcbntcbiAgdmFyIGVkZ2U7XG4gIHZhciBzb3VyY2VOb2RlO1xuICB2YXIgdGFyZ2V0Tm9kZTtcbiAgdmFyIHNvdXJjZUFuY2VzdG9yR3JhcGg7XG4gIHZhciB0YXJnZXRBbmNlc3RvckdyYXBoO1xuXG4gIHZhciBlZGdlcyA9IHRoaXMuZ2V0QWxsRWRnZXMoKTtcbiAgdmFyIHMgPSBlZGdlcy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgczsgaSsrKVxuICB7XG4gICAgZWRnZSA9IGVkZ2VzW2ldO1xuXG4gICAgc291cmNlTm9kZSA9IGVkZ2Uuc291cmNlO1xuICAgIHRhcmdldE5vZGUgPSBlZGdlLnRhcmdldDtcbiAgICBlZGdlLmxjYSA9IG51bGw7XG4gICAgZWRnZS5zb3VyY2VJbkxjYSA9IHNvdXJjZU5vZGU7XG4gICAgZWRnZS50YXJnZXRJbkxjYSA9IHRhcmdldE5vZGU7XG5cbiAgICBpZiAoc291cmNlTm9kZSA9PSB0YXJnZXROb2RlKVxuICAgIHtcbiAgICAgIGVkZ2UubGNhID0gc291cmNlTm9kZS5nZXRPd25lcigpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgc291cmNlQW5jZXN0b3JHcmFwaCA9IHNvdXJjZU5vZGUuZ2V0T3duZXIoKTtcblxuICAgIHdoaWxlIChlZGdlLmxjYSA9PSBudWxsKVxuICAgIHtcbiAgICAgIGVkZ2UudGFyZ2V0SW5MY2EgPSB0YXJnZXROb2RlOyAgXG4gICAgICB0YXJnZXRBbmNlc3RvckdyYXBoID0gdGFyZ2V0Tm9kZS5nZXRPd25lcigpO1xuXG4gICAgICB3aGlsZSAoZWRnZS5sY2EgPT0gbnVsbClcbiAgICAgIHtcbiAgICAgICAgaWYgKHRhcmdldEFuY2VzdG9yR3JhcGggPT0gc291cmNlQW5jZXN0b3JHcmFwaClcbiAgICAgICAge1xuICAgICAgICAgIGVkZ2UubGNhID0gdGFyZ2V0QW5jZXN0b3JHcmFwaDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXJnZXRBbmNlc3RvckdyYXBoID09IHRoaXMucm9vdEdyYXBoKVxuICAgICAgICB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWRnZS5sY2EgIT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IFwiYXNzZXJ0IGZhaWxlZFwiO1xuICAgICAgICB9XG4gICAgICAgIGVkZ2UudGFyZ2V0SW5MY2EgPSB0YXJnZXRBbmNlc3RvckdyYXBoLmdldFBhcmVudCgpO1xuICAgICAgICB0YXJnZXRBbmNlc3RvckdyYXBoID0gZWRnZS50YXJnZXRJbkxjYS5nZXRPd25lcigpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc291cmNlQW5jZXN0b3JHcmFwaCA9PSB0aGlzLnJvb3RHcmFwaClcbiAgICAgIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChlZGdlLmxjYSA9PSBudWxsKVxuICAgICAge1xuICAgICAgICBlZGdlLnNvdXJjZUluTGNhID0gc291cmNlQW5jZXN0b3JHcmFwaC5nZXRQYXJlbnQoKTtcbiAgICAgICAgc291cmNlQW5jZXN0b3JHcmFwaCA9IGVkZ2Uuc291cmNlSW5MY2EuZ2V0T3duZXIoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZWRnZS5sY2EgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgXCJhc3NlcnQgZmFpbGVkXCI7XG4gICAgfVxuICB9XG59O1xuXG5MR3JhcGhNYW5hZ2VyLnByb3RvdHlwZS5jYWxjTG93ZXN0Q29tbW9uQW5jZXN0b3IgPSBmdW5jdGlvbiAoZmlyc3ROb2RlLCBzZWNvbmROb2RlKVxue1xuICBpZiAoZmlyc3ROb2RlID09IHNlY29uZE5vZGUpXG4gIHtcbiAgICByZXR1cm4gZmlyc3ROb2RlLmdldE93bmVyKCk7XG4gIH1cbiAgdmFyIGZpcnN0T3duZXJHcmFwaCA9IGZpcnN0Tm9kZS5nZXRPd25lcigpO1xuXG4gIGRvXG4gIHtcbiAgICBpZiAoZmlyc3RPd25lckdyYXBoID09IG51bGwpXG4gICAge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciBzZWNvbmRPd25lckdyYXBoID0gc2Vjb25kTm9kZS5nZXRPd25lcigpO1xuXG4gICAgZG9cbiAgICB7XG4gICAgICBpZiAoc2Vjb25kT3duZXJHcmFwaCA9PSBudWxsKVxuICAgICAge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKHNlY29uZE93bmVyR3JhcGggPT0gZmlyc3RPd25lckdyYXBoKVxuICAgICAge1xuICAgICAgICByZXR1cm4gc2Vjb25kT3duZXJHcmFwaDtcbiAgICAgIH1cbiAgICAgIHNlY29uZE93bmVyR3JhcGggPSBzZWNvbmRPd25lckdyYXBoLmdldFBhcmVudCgpLmdldE93bmVyKCk7XG4gICAgfSB3aGlsZSAodHJ1ZSk7XG5cbiAgICBmaXJzdE93bmVyR3JhcGggPSBmaXJzdE93bmVyR3JhcGguZ2V0UGFyZW50KCkuZ2V0T3duZXIoKTtcbiAgfSB3aGlsZSAodHJ1ZSk7XG5cbiAgcmV0dXJuIGZpcnN0T3duZXJHcmFwaDtcbn07XG5cbkxHcmFwaE1hbmFnZXIucHJvdG90eXBlLmNhbGNJbmNsdXNpb25UcmVlRGVwdGhzID0gZnVuY3Rpb24gKGdyYXBoLCBkZXB0aCkge1xuICBpZiAoZ3JhcGggPT0gbnVsbCAmJiBkZXB0aCA9PSBudWxsKSB7XG4gICAgZ3JhcGggPSB0aGlzLnJvb3RHcmFwaDtcbiAgICBkZXB0aCA9IDE7XG4gIH1cbiAgdmFyIG5vZGU7XG5cbiAgdmFyIG5vZGVzID0gZ3JhcGguZ2V0Tm9kZXMoKTtcbiAgdmFyIHMgPSBub2Rlcy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgczsgaSsrKVxuICB7XG4gICAgbm9kZSA9IG5vZGVzW2ldO1xuICAgIG5vZGUuaW5jbHVzaW9uVHJlZURlcHRoID0gZGVwdGg7XG5cbiAgICBpZiAobm9kZS5jaGlsZCAhPSBudWxsKVxuICAgIHtcbiAgICAgIHRoaXMuY2FsY0luY2x1c2lvblRyZWVEZXB0aHMobm9kZS5jaGlsZCwgZGVwdGggKyAxKTtcbiAgICB9XG4gIH1cbn07XG5cbkxHcmFwaE1hbmFnZXIucHJvdG90eXBlLmluY2x1ZGVzSW52YWxpZEVkZ2UgPSBmdW5jdGlvbiAoKVxue1xuICB2YXIgZWRnZTtcblxuICB2YXIgcyA9IHRoaXMuZWRnZXMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHM7IGkrKylcbiAge1xuICAgIGVkZ2UgPSB0aGlzLmVkZ2VzW2ldO1xuXG4gICAgaWYgKHRoaXMuaXNPbmVBbmNlc3Rvck9mT3RoZXIoZWRnZS5zb3VyY2UsIGVkZ2UudGFyZ2V0KSlcbiAgICB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMR3JhcGhNYW5hZ2VyO1xuIiwiZnVuY3Rpb24gTEdyYXBoT2JqZWN0KHZHcmFwaE9iamVjdCkge1xuICB0aGlzLnZHcmFwaE9iamVjdCA9IHZHcmFwaE9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMR3JhcGhPYmplY3Q7XG4iLCJ2YXIgTEdyYXBoT2JqZWN0ID0gcmVxdWlyZSgnLi9MR3JhcGhPYmplY3QnKTtcbnZhciBJbnRlZ2VyID0gcmVxdWlyZSgnLi9JbnRlZ2VyJyk7XG52YXIgUmVjdGFuZ2xlRCA9IHJlcXVpcmUoJy4vUmVjdGFuZ2xlRCcpO1xudmFyIExheW91dENvbnN0YW50cyA9IHJlcXVpcmUoJy4vTGF5b3V0Q29uc3RhbnRzJyk7XG52YXIgUmFuZG9tU2VlZCA9IHJlcXVpcmUoJy4vUmFuZG9tU2VlZCcpO1xudmFyIFBvaW50RCA9IHJlcXVpcmUoJy4vUG9pbnREJyk7XG52YXIgSGFzaFNldCA9IHJlcXVpcmUoJy4vSGFzaFNldCcpO1xuXG5mdW5jdGlvbiBMTm9kZShnbSwgbG9jLCBzaXplLCB2Tm9kZSkge1xuICAvL0FsdGVybmF0aXZlIGNvbnN0cnVjdG9yIDEgOiBMTm9kZShMR3JhcGhNYW5hZ2VyIGdtLCBQb2ludCBsb2MsIERpbWVuc2lvbiBzaXplLCBPYmplY3Qgdk5vZGUpXG4gIGlmIChzaXplID09IG51bGwgJiYgdk5vZGUgPT0gbnVsbCkge1xuICAgIHZOb2RlID0gbG9jO1xuICB9XG5cbiAgTEdyYXBoT2JqZWN0LmNhbGwodGhpcywgdk5vZGUpO1xuXG4gIC8vQWx0ZXJuYXRpdmUgY29uc3RydWN0b3IgMiA6IExOb2RlKExheW91dCBsYXlvdXQsIE9iamVjdCB2Tm9kZSlcbiAgaWYgKGdtLmdyYXBoTWFuYWdlciAhPSBudWxsKVxuICAgIGdtID0gZ20uZ3JhcGhNYW5hZ2VyO1xuXG4gIHRoaXMuZXN0aW1hdGVkU2l6ZSA9IEludGVnZXIuTUlOX1ZBTFVFO1xuICB0aGlzLmluY2x1c2lvblRyZWVEZXB0aCA9IEludGVnZXIuTUFYX1ZBTFVFO1xuICB0aGlzLnZHcmFwaE9iamVjdCA9IHZOb2RlO1xuICB0aGlzLmVkZ2VzID0gW107XG4gIHRoaXMuZ3JhcGhNYW5hZ2VyID0gZ207XG5cbiAgaWYgKHNpemUgIT0gbnVsbCAmJiBsb2MgIT0gbnVsbClcbiAgICB0aGlzLnJlY3QgPSBuZXcgUmVjdGFuZ2xlRChsb2MueCwgbG9jLnksIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcbiAgZWxzZVxuICAgIHRoaXMucmVjdCA9IG5ldyBSZWN0YW5nbGVEKCk7XG59XG5cbkxOb2RlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoTEdyYXBoT2JqZWN0LnByb3RvdHlwZSk7XG5mb3IgKHZhciBwcm9wIGluIExHcmFwaE9iamVjdCkge1xuICBMTm9kZVtwcm9wXSA9IExHcmFwaE9iamVjdFtwcm9wXTtcbn1cblxuTE5vZGUucHJvdG90eXBlLmdldEVkZ2VzID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHRoaXMuZWRnZXM7XG59O1xuXG5MTm9kZS5wcm90b3R5cGUuZ2V0Q2hpbGQgPSBmdW5jdGlvbiAoKVxue1xuICByZXR1cm4gdGhpcy5jaGlsZDtcbn07XG5cbkxOb2RlLnByb3RvdHlwZS5nZXRPd25lciA9IGZ1bmN0aW9uICgpXG57XG4vLyAgaWYgKHRoaXMub3duZXIgIT0gbnVsbCkge1xuLy8gICAgaWYgKCEodGhpcy5vd25lciA9PSBudWxsIHx8IHRoaXMub3duZXIuZ2V0Tm9kZXMoKS5pbmRleE9mKHRoaXMpID4gLTEpKSB7XG4vLyAgICAgIHRocm93IFwiYXNzZXJ0IGZhaWxlZFwiO1xuLy8gICAgfVxuLy8gIH1cblxuICByZXR1cm4gdGhpcy5vd25lcjtcbn07XG5cbkxOb2RlLnByb3RvdHlwZS5nZXRXaWR0aCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLnJlY3Qud2lkdGg7XG59O1xuXG5MTm9kZS5wcm90b3R5cGUuc2V0V2lkdGggPSBmdW5jdGlvbiAod2lkdGgpXG57XG4gIHRoaXMucmVjdC53aWR0aCA9IHdpZHRoO1xufTtcblxuTE5vZGUucHJvdG90eXBlLmdldEhlaWdodCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLnJlY3QuaGVpZ2h0O1xufTtcblxuTE5vZGUucHJvdG90eXBlLnNldEhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQpXG57XG4gIHRoaXMucmVjdC5oZWlnaHQgPSBoZWlnaHQ7XG59O1xuXG5MTm9kZS5wcm90b3R5cGUuZ2V0Q2VudGVyWCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLnJlY3QueCArIHRoaXMucmVjdC53aWR0aCAvIDI7XG59O1xuXG5MTm9kZS5wcm90b3R5cGUuZ2V0Q2VudGVyWSA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLnJlY3QueSArIHRoaXMucmVjdC5oZWlnaHQgLyAyO1xufTtcblxuTE5vZGUucHJvdG90eXBlLmdldENlbnRlciA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiBuZXcgUG9pbnREKHRoaXMucmVjdC54ICsgdGhpcy5yZWN0LndpZHRoIC8gMixcbiAgICAgICAgICB0aGlzLnJlY3QueSArIHRoaXMucmVjdC5oZWlnaHQgLyAyKTtcbn07XG5cbkxOb2RlLnByb3RvdHlwZS5nZXRMb2NhdGlvbiA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiBuZXcgUG9pbnREKHRoaXMucmVjdC54LCB0aGlzLnJlY3QueSk7XG59O1xuXG5MTm9kZS5wcm90b3R5cGUuZ2V0UmVjdCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLnJlY3Q7XG59O1xuXG5MTm9kZS5wcm90b3R5cGUuZ2V0RGlhZ29uYWwgPSBmdW5jdGlvbiAoKVxue1xuICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMucmVjdC53aWR0aCAqIHRoaXMucmVjdC53aWR0aCArXG4gICAgICAgICAgdGhpcy5yZWN0LmhlaWdodCAqIHRoaXMucmVjdC5oZWlnaHQpO1xufTtcblxuTE5vZGUucHJvdG90eXBlLnNldFJlY3QgPSBmdW5jdGlvbiAodXBwZXJMZWZ0LCBkaW1lbnNpb24pXG57XG4gIHRoaXMucmVjdC54ID0gdXBwZXJMZWZ0Lng7XG4gIHRoaXMucmVjdC55ID0gdXBwZXJMZWZ0Lnk7XG4gIHRoaXMucmVjdC53aWR0aCA9IGRpbWVuc2lvbi53aWR0aDtcbiAgdGhpcy5yZWN0LmhlaWdodCA9IGRpbWVuc2lvbi5oZWlnaHQ7XG59O1xuXG5MTm9kZS5wcm90b3R5cGUuc2V0Q2VudGVyID0gZnVuY3Rpb24gKGN4LCBjeSlcbntcbiAgdGhpcy5yZWN0LnggPSBjeCAtIHRoaXMucmVjdC53aWR0aCAvIDI7XG4gIHRoaXMucmVjdC55ID0gY3kgLSB0aGlzLnJlY3QuaGVpZ2h0IC8gMjtcbn07XG5cbkxOb2RlLnByb3RvdHlwZS5zZXRMb2NhdGlvbiA9IGZ1bmN0aW9uICh4LCB5KVxue1xuICB0aGlzLnJlY3QueCA9IHg7XG4gIHRoaXMucmVjdC55ID0geTtcbn07XG5cbkxOb2RlLnByb3RvdHlwZS5tb3ZlQnkgPSBmdW5jdGlvbiAoZHgsIGR5KVxue1xuICB0aGlzLnJlY3QueCArPSBkeDtcbiAgdGhpcy5yZWN0LnkgKz0gZHk7XG59O1xuXG5MTm9kZS5wcm90b3R5cGUuZ2V0RWRnZUxpc3RUb05vZGUgPSBmdW5jdGlvbiAodG8pXG57XG4gIHZhciBlZGdlTGlzdCA9IFtdO1xuICB2YXIgZWRnZTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHNlbGYuZWRnZXMuZm9yRWFjaChmdW5jdGlvbihlZGdlKSB7XG4gICAgXG4gICAgaWYgKGVkZ2UudGFyZ2V0ID09IHRvKVxuICAgIHtcbiAgICAgIGlmIChlZGdlLnNvdXJjZSAhPSBzZWxmKVxuICAgICAgICB0aHJvdyBcIkluY29ycmVjdCBlZGdlIHNvdXJjZSFcIjtcblxuICAgICAgZWRnZUxpc3QucHVzaChlZGdlKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBlZGdlTGlzdDtcbn07XG5cbkxOb2RlLnByb3RvdHlwZS5nZXRFZGdlc0JldHdlZW4gPSBmdW5jdGlvbiAob3RoZXIpXG57XG4gIHZhciBlZGdlTGlzdCA9IFtdO1xuICB2YXIgZWRnZTtcbiAgXG4gIHZhciBzZWxmID0gdGhpcztcbiAgc2VsZi5lZGdlcy5mb3JFYWNoKGZ1bmN0aW9uKGVkZ2UpIHtcblxuICAgIGlmICghKGVkZ2Uuc291cmNlID09IHNlbGYgfHwgZWRnZS50YXJnZXQgPT0gc2VsZikpXG4gICAgICB0aHJvdyBcIkluY29ycmVjdCBlZGdlIHNvdXJjZSBhbmQvb3IgdGFyZ2V0XCI7XG5cbiAgICBpZiAoKGVkZ2UudGFyZ2V0ID09IG90aGVyKSB8fCAoZWRnZS5zb3VyY2UgPT0gb3RoZXIpKVxuICAgIHtcbiAgICAgIGVkZ2VMaXN0LnB1c2goZWRnZSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZWRnZUxpc3Q7XG59O1xuXG5MTm9kZS5wcm90b3R5cGUuZ2V0TmVpZ2hib3JzTGlzdCA9IGZ1bmN0aW9uICgpXG57XG4gIHZhciBuZWlnaGJvcnMgPSBuZXcgSGFzaFNldCgpO1xuICB2YXIgZWRnZTtcbiAgXG4gIHZhciBzZWxmID0gdGhpcztcbiAgc2VsZi5lZGdlcy5mb3JFYWNoKGZ1bmN0aW9uKGVkZ2UpIHtcblxuICAgIGlmIChlZGdlLnNvdXJjZSA9PSBzZWxmKVxuICAgIHtcbiAgICAgIG5laWdoYm9ycy5hZGQoZWRnZS50YXJnZXQpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgaWYgKGVkZ2UudGFyZ2V0ICE9IHNlbGYpIHtcbiAgICAgICAgdGhyb3cgXCJJbmNvcnJlY3QgaW5jaWRlbmN5IVwiO1xuICAgICAgfVxuICAgIFxuICAgICAgbmVpZ2hib3JzLmFkZChlZGdlLnNvdXJjZSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbmVpZ2hib3JzO1xufTtcblxuTE5vZGUucHJvdG90eXBlLndpdGhDaGlsZHJlbiA9IGZ1bmN0aW9uICgpXG57XG4gIHZhciB3aXRoTmVpZ2hib3JzTGlzdCA9IG5ldyBTZXQoKTtcbiAgdmFyIGNoaWxkTm9kZTtcbiAgdmFyIGNoaWxkcmVuO1xuXG4gIHdpdGhOZWlnaGJvcnNMaXN0LmFkZCh0aGlzKTtcblxuICBpZiAodGhpcy5jaGlsZCAhPSBudWxsKVxuICB7XG4gICAgdmFyIG5vZGVzID0gdGhpcy5jaGlsZC5nZXROb2RlcygpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgY2hpbGROb2RlID0gbm9kZXNbaV07XG4gICAgICBjaGlsZHJlbiA9IGNoaWxkTm9kZS53aXRoQ2hpbGRyZW4oKTtcbiAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xuICAgICAgICB3aXRoTmVpZ2hib3JzTGlzdC5hZGQobm9kZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gd2l0aE5laWdoYm9yc0xpc3Q7XG59O1xuXG5MTm9kZS5wcm90b3R5cGUuZ2V0Tm9PZkNoaWxkcmVuID0gZnVuY3Rpb24gKClcbntcbiAgdmFyIG5vT2ZDaGlsZHJlbiA9IDA7XG4gIHZhciBjaGlsZE5vZGU7XG5cbiAgaWYodGhpcy5jaGlsZCA9PSBudWxsKXtcbiAgICBub09mQ2hpbGRyZW4gPSAxO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHZhciBub2RlcyA9IHRoaXMuY2hpbGQuZ2V0Tm9kZXMoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIGNoaWxkTm9kZSA9IG5vZGVzW2ldO1xuXG4gICAgICBub09mQ2hpbGRyZW4gKz0gY2hpbGROb2RlLmdldE5vT2ZDaGlsZHJlbigpO1xuICAgIH1cbiAgfVxuICBcbiAgaWYobm9PZkNoaWxkcmVuID09IDApe1xuICAgIG5vT2ZDaGlsZHJlbiA9IDE7XG4gIH1cbiAgcmV0dXJuIG5vT2ZDaGlsZHJlbjtcbn07XG5cbkxOb2RlLnByb3RvdHlwZS5nZXRFc3RpbWF0ZWRTaXplID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5lc3RpbWF0ZWRTaXplID09IEludGVnZXIuTUlOX1ZBTFVFKSB7XG4gICAgdGhyb3cgXCJhc3NlcnQgZmFpbGVkXCI7XG4gIH1cbiAgcmV0dXJuIHRoaXMuZXN0aW1hdGVkU2l6ZTtcbn07XG5cbkxOb2RlLnByb3RvdHlwZS5jYWxjRXN0aW1hdGVkU2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuY2hpbGQgPT0gbnVsbClcbiAge1xuICAgIHJldHVybiB0aGlzLmVzdGltYXRlZFNpemUgPSAodGhpcy5yZWN0LndpZHRoICsgdGhpcy5yZWN0LmhlaWdodCkgLyAyO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIHRoaXMuZXN0aW1hdGVkU2l6ZSA9IHRoaXMuY2hpbGQuY2FsY0VzdGltYXRlZFNpemUoKTtcbiAgICB0aGlzLnJlY3Qud2lkdGggPSB0aGlzLmVzdGltYXRlZFNpemU7XG4gICAgdGhpcy5yZWN0LmhlaWdodCA9IHRoaXMuZXN0aW1hdGVkU2l6ZTtcblxuICAgIHJldHVybiB0aGlzLmVzdGltYXRlZFNpemU7XG4gIH1cbn07XG5cbkxOb2RlLnByb3RvdHlwZS5zY2F0dGVyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcmFuZG9tQ2VudGVyWDtcbiAgdmFyIHJhbmRvbUNlbnRlclk7XG5cbiAgdmFyIG1pblggPSAtTGF5b3V0Q29uc3RhbnRzLklOSVRJQUxfV09STERfQk9VTkRBUlk7XG4gIHZhciBtYXhYID0gTGF5b3V0Q29uc3RhbnRzLklOSVRJQUxfV09STERfQk9VTkRBUlk7XG4gIHJhbmRvbUNlbnRlclggPSBMYXlvdXRDb25zdGFudHMuV09STERfQ0VOVEVSX1ggK1xuICAgICAgICAgIChSYW5kb21TZWVkLm5leHREb3VibGUoKSAqIChtYXhYIC0gbWluWCkpICsgbWluWDtcblxuICB2YXIgbWluWSA9IC1MYXlvdXRDb25zdGFudHMuSU5JVElBTF9XT1JMRF9CT1VOREFSWTtcbiAgdmFyIG1heFkgPSBMYXlvdXRDb25zdGFudHMuSU5JVElBTF9XT1JMRF9CT1VOREFSWTtcbiAgcmFuZG9tQ2VudGVyWSA9IExheW91dENvbnN0YW50cy5XT1JMRF9DRU5URVJfWSArXG4gICAgICAgICAgKFJhbmRvbVNlZWQubmV4dERvdWJsZSgpICogKG1heFkgLSBtaW5ZKSkgKyBtaW5ZO1xuXG4gIHRoaXMucmVjdC54ID0gcmFuZG9tQ2VudGVyWDtcbiAgdGhpcy5yZWN0LnkgPSByYW5kb21DZW50ZXJZXG59O1xuXG5MTm9kZS5wcm90b3R5cGUudXBkYXRlQm91bmRzID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5nZXRDaGlsZCgpID09IG51bGwpIHtcbiAgICB0aHJvdyBcImFzc2VydCBmYWlsZWRcIjtcbiAgfVxuICBpZiAodGhpcy5nZXRDaGlsZCgpLmdldE5vZGVzKCkubGVuZ3RoICE9IDApXG4gIHtcbiAgICAvLyB3cmFwIHRoZSBjaGlsZHJlbiBub2RlcyBieSByZS1hcnJhbmdpbmcgdGhlIGJvdW5kYXJpZXNcbiAgICB2YXIgY2hpbGRHcmFwaCA9IHRoaXMuZ2V0Q2hpbGQoKTtcbiAgICBjaGlsZEdyYXBoLnVwZGF0ZUJvdW5kcyh0cnVlKTtcblxuICAgIHRoaXMucmVjdC54ID0gY2hpbGRHcmFwaC5nZXRMZWZ0KCk7XG4gICAgdGhpcy5yZWN0LnkgPSBjaGlsZEdyYXBoLmdldFRvcCgpO1xuXG4gICAgdGhpcy5zZXRXaWR0aChjaGlsZEdyYXBoLmdldFJpZ2h0KCkgLSBjaGlsZEdyYXBoLmdldExlZnQoKSk7XG4gICAgdGhpcy5zZXRIZWlnaHQoY2hpbGRHcmFwaC5nZXRCb3R0b20oKSAtIGNoaWxkR3JhcGguZ2V0VG9wKCkpO1xuICAgIFxuICAgIC8vIFVwZGF0ZSBjb21wb3VuZCBib3VuZHMgY29uc2lkZXJpbmcgaXRzIGxhYmVsIHByb3BlcnRpZXMgICAgXG4gICAgaWYoTGF5b3V0Q29uc3RhbnRzLk5PREVfRElNRU5TSU9OU19JTkNMVURFX0xBQkVMUyl7XG4gICAgICAgIFxuICAgICAgdmFyIHdpZHRoID0gY2hpbGRHcmFwaC5nZXRSaWdodCgpIC0gY2hpbGRHcmFwaC5nZXRMZWZ0KCk7XG4gICAgICB2YXIgaGVpZ2h0ID0gY2hpbGRHcmFwaC5nZXRCb3R0b20oKSAtIGNoaWxkR3JhcGguZ2V0VG9wKCk7XG5cbiAgICAgIGlmKHRoaXMubGFiZWxXaWR0aCA+IHdpZHRoKXtcbiAgICAgICAgdGhpcy5yZWN0LnggLT0gKHRoaXMubGFiZWxXaWR0aCAtIHdpZHRoKSAvIDI7XG4gICAgICAgIHRoaXMuc2V0V2lkdGgodGhpcy5sYWJlbFdpZHRoKTtcbiAgICAgIH1cblxuICAgICAgaWYodGhpcy5sYWJlbEhlaWdodCA+IGhlaWdodCl7XG4gICAgICAgIGlmKHRoaXMubGFiZWxQb3MgPT0gXCJjZW50ZXJcIil7XG4gICAgICAgICAgdGhpcy5yZWN0LnkgLT0gKHRoaXMubGFiZWxIZWlnaHQgLSBoZWlnaHQpIC8gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMubGFiZWxQb3MgPT0gXCJ0b3BcIil7XG4gICAgICAgICAgdGhpcy5yZWN0LnkgLT0gKHRoaXMubGFiZWxIZWlnaHQgLSBoZWlnaHQpOyBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEhlaWdodCh0aGlzLmxhYmVsSGVpZ2h0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbkxOb2RlLnByb3RvdHlwZS5nZXRJbmNsdXNpb25UcmVlRGVwdGggPSBmdW5jdGlvbiAoKVxue1xuICBpZiAodGhpcy5pbmNsdXNpb25UcmVlRGVwdGggPT0gSW50ZWdlci5NQVhfVkFMVUUpIHtcbiAgICB0aHJvdyBcImFzc2VydCBmYWlsZWRcIjtcbiAgfVxuICByZXR1cm4gdGhpcy5pbmNsdXNpb25UcmVlRGVwdGg7XG59O1xuXG5MTm9kZS5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKHRyYW5zKVxue1xuICB2YXIgbGVmdCA9IHRoaXMucmVjdC54O1xuXG4gIGlmIChsZWZ0ID4gTGF5b3V0Q29uc3RhbnRzLldPUkxEX0JPVU5EQVJZKVxuICB7XG4gICAgbGVmdCA9IExheW91dENvbnN0YW50cy5XT1JMRF9CT1VOREFSWTtcbiAgfVxuICBlbHNlIGlmIChsZWZ0IDwgLUxheW91dENvbnN0YW50cy5XT1JMRF9CT1VOREFSWSlcbiAge1xuICAgIGxlZnQgPSAtTGF5b3V0Q29uc3RhbnRzLldPUkxEX0JPVU5EQVJZO1xuICB9XG5cbiAgdmFyIHRvcCA9IHRoaXMucmVjdC55O1xuXG4gIGlmICh0b3AgPiBMYXlvdXRDb25zdGFudHMuV09STERfQk9VTkRBUlkpXG4gIHtcbiAgICB0b3AgPSBMYXlvdXRDb25zdGFudHMuV09STERfQk9VTkRBUlk7XG4gIH1cbiAgZWxzZSBpZiAodG9wIDwgLUxheW91dENvbnN0YW50cy5XT1JMRF9CT1VOREFSWSlcbiAge1xuICAgIHRvcCA9IC1MYXlvdXRDb25zdGFudHMuV09STERfQk9VTkRBUlk7XG4gIH1cblxuICB2YXIgbGVmdFRvcCA9IG5ldyBQb2ludEQobGVmdCwgdG9wKTtcbiAgdmFyIHZMZWZ0VG9wID0gdHJhbnMuaW52ZXJzZVRyYW5zZm9ybVBvaW50KGxlZnRUb3ApO1xuXG4gIHRoaXMuc2V0TG9jYXRpb24odkxlZnRUb3AueCwgdkxlZnRUb3AueSk7XG59O1xuXG5MTm9kZS5wcm90b3R5cGUuZ2V0TGVmdCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLnJlY3QueDtcbn07XG5cbkxOb2RlLnByb3RvdHlwZS5nZXRSaWdodCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLnJlY3QueCArIHRoaXMucmVjdC53aWR0aDtcbn07XG5cbkxOb2RlLnByb3RvdHlwZS5nZXRUb3AgPSBmdW5jdGlvbiAoKVxue1xuICByZXR1cm4gdGhpcy5yZWN0Lnk7XG59O1xuXG5MTm9kZS5wcm90b3R5cGUuZ2V0Qm90dG9tID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHRoaXMucmVjdC55ICsgdGhpcy5yZWN0LmhlaWdodDtcbn07XG5cbkxOb2RlLnByb3RvdHlwZS5nZXRQYXJlbnQgPSBmdW5jdGlvbiAoKVxue1xuICBpZiAodGhpcy5vd25lciA9PSBudWxsKVxuICB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gdGhpcy5vd25lci5nZXRQYXJlbnQoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTE5vZGU7XG4iLCJ2YXIgTGF5b3V0Q29uc3RhbnRzID0gcmVxdWlyZSgnLi9MYXlvdXRDb25zdGFudHMnKTtcbnZhciBIYXNoTWFwID0gcmVxdWlyZSgnLi9IYXNoTWFwJyk7XG52YXIgTEdyYXBoTWFuYWdlciA9IHJlcXVpcmUoJy4vTEdyYXBoTWFuYWdlcicpO1xudmFyIExOb2RlID0gcmVxdWlyZSgnLi9MTm9kZScpO1xudmFyIExFZGdlID0gcmVxdWlyZSgnLi9MRWRnZScpO1xudmFyIExHcmFwaCA9IHJlcXVpcmUoJy4vTEdyYXBoJyk7XG52YXIgUG9pbnREID0gcmVxdWlyZSgnLi9Qb2ludEQnKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuL1RyYW5zZm9ybScpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCcuL0VtaXR0ZXInKTtcbnZhciBIYXNoU2V0ID0gcmVxdWlyZSgnLi9IYXNoU2V0Jyk7XG5cbmZ1bmN0aW9uIExheW91dChpc1JlbW90ZVVzZSkge1xuICBFbWl0dGVyLmNhbGwoIHRoaXMgKTtcblxuICAvL0xheW91dCBRdWFsaXR5OiAwOnByb29mLCAxOmRlZmF1bHQsIDI6ZHJhZnRcbiAgdGhpcy5sYXlvdXRRdWFsaXR5ID0gTGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfUVVBTElUWTtcbiAgLy9XaGV0aGVyIGxheW91dCBzaG91bGQgY3JlYXRlIGJlbmRwb2ludHMgYXMgbmVlZGVkIG9yIG5vdFxuICB0aGlzLmNyZWF0ZUJlbmRzQXNOZWVkZWQgPVxuICAgICAgICAgIExheW91dENvbnN0YW50cy5ERUZBVUxUX0NSRUFURV9CRU5EU19BU19ORUVERUQ7XG4gIC8vV2hldGhlciBsYXlvdXQgc2hvdWxkIGJlIGluY3JlbWVudGFsIG9yIG5vdFxuICB0aGlzLmluY3JlbWVudGFsID0gTGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfSU5DUkVNRU5UQUw7XG4gIC8vV2hldGhlciB3ZSBhbmltYXRlIGZyb20gYmVmb3JlIHRvIGFmdGVyIGxheW91dCBub2RlIHBvc2l0aW9uc1xuICB0aGlzLmFuaW1hdGlvbk9uTGF5b3V0ID1cbiAgICAgICAgICBMYXlvdXRDb25zdGFudHMuREVGQVVMVF9BTklNQVRJT05fT05fTEFZT1VUO1xuICAvL1doZXRoZXIgd2UgYW5pbWF0ZSB0aGUgbGF5b3V0IHByb2Nlc3Mgb3Igbm90XG4gIHRoaXMuYW5pbWF0aW9uRHVyaW5nTGF5b3V0ID0gTGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfQU5JTUFUSU9OX0RVUklOR19MQVlPVVQ7XG4gIC8vTnVtYmVyIGl0ZXJhdGlvbnMgdGhhdCBzaG91bGQgYmUgZG9uZSBiZXR3ZWVuIHR3byBzdWNjZXNzaXZlIGFuaW1hdGlvbnNcbiAgdGhpcy5hbmltYXRpb25QZXJpb2QgPSBMYXlvdXRDb25zdGFudHMuREVGQVVMVF9BTklNQVRJT05fUEVSSU9EO1xuICAvKipcbiAgICogV2hldGhlciBvciBub3QgbGVhZiBub2RlcyAobm9uLWNvbXBvdW5kIG5vZGVzKSBhcmUgb2YgdW5pZm9ybSBzaXplcy4gV2hlblxuICAgKiB0aGV5IGFyZSwgYm90aCBzcHJpbmcgYW5kIHJlcHVsc2lvbiBmb3JjZXMgYmV0d2VlbiB0d28gbGVhZiBub2RlcyBjYW4gYmVcbiAgICogY2FsY3VsYXRlZCB3aXRob3V0IHRoZSBleHBlbnNpdmUgY2xpcHBpbmcgcG9pbnQgY2FsY3VsYXRpb25zLCByZXN1bHRpbmdcbiAgICogaW4gbWFqb3Igc3BlZWQtdXAuXG4gICAqL1xuICB0aGlzLnVuaWZvcm1MZWFmTm9kZVNpemVzID1cbiAgICAgICAgICBMYXlvdXRDb25zdGFudHMuREVGQVVMVF9VTklGT1JNX0xFQUZfTk9ERV9TSVpFUztcbiAgLyoqXG4gICAqIFRoaXMgaXMgdXNlZCBmb3IgY3JlYXRpb24gb2YgYmVuZHBvaW50cyBieSB1c2luZyBkdW1teSBub2RlcyBhbmQgZWRnZXMuXG4gICAqIE1hcHMgYW4gTEVkZ2UgdG8gaXRzIGR1bW15IGJlbmRwb2ludCBwYXRoLlxuICAgKi9cbiAgdGhpcy5lZGdlVG9EdW1teU5vZGVzID0gbmV3IEhhc2hNYXAoKTtcbiAgdGhpcy5ncmFwaE1hbmFnZXIgPSBuZXcgTEdyYXBoTWFuYWdlcih0aGlzKTtcbiAgdGhpcy5pc0xheW91dEZpbmlzaGVkID0gZmFsc2U7XG4gIHRoaXMuaXNTdWJMYXlvdXQgPSBmYWxzZTtcbiAgdGhpcy5pc1JlbW90ZVVzZSA9IGZhbHNlO1xuXG4gIGlmIChpc1JlbW90ZVVzZSAhPSBudWxsKSB7XG4gICAgdGhpcy5pc1JlbW90ZVVzZSA9IGlzUmVtb3RlVXNlO1xuICB9XG59XG5cbkxheW91dC5SQU5ET01fU0VFRCA9IDE7XG5cbkxheW91dC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBFbWl0dGVyLnByb3RvdHlwZSApO1xuXG5MYXlvdXQucHJvdG90eXBlLmdldEdyYXBoTWFuYWdlciA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZ3JhcGhNYW5hZ2VyO1xufTtcblxuTGF5b3V0LnByb3RvdHlwZS5nZXRBbGxOb2RlcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZ3JhcGhNYW5hZ2VyLmdldEFsbE5vZGVzKCk7XG59O1xuXG5MYXlvdXQucHJvdG90eXBlLmdldEFsbEVkZ2VzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5ncmFwaE1hbmFnZXIuZ2V0QWxsRWRnZXMoKTtcbn07XG5cbkxheW91dC5wcm90b3R5cGUuZ2V0QWxsTm9kZXNUb0FwcGx5R3Jhdml0YXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmdyYXBoTWFuYWdlci5nZXRBbGxOb2Rlc1RvQXBwbHlHcmF2aXRhdGlvbigpO1xufTtcblxuTGF5b3V0LnByb3RvdHlwZS5uZXdHcmFwaE1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBnbSA9IG5ldyBMR3JhcGhNYW5hZ2VyKHRoaXMpO1xuICB0aGlzLmdyYXBoTWFuYWdlciA9IGdtO1xuICByZXR1cm4gZ207XG59O1xuXG5MYXlvdXQucHJvdG90eXBlLm5ld0dyYXBoID0gZnVuY3Rpb24gKHZHcmFwaClcbntcbiAgcmV0dXJuIG5ldyBMR3JhcGgobnVsbCwgdGhpcy5ncmFwaE1hbmFnZXIsIHZHcmFwaCk7XG59O1xuXG5MYXlvdXQucHJvdG90eXBlLm5ld05vZGUgPSBmdW5jdGlvbiAodk5vZGUpXG57XG4gIHJldHVybiBuZXcgTE5vZGUodGhpcy5ncmFwaE1hbmFnZXIsIHZOb2RlKTtcbn07XG5cbkxheW91dC5wcm90b3R5cGUubmV3RWRnZSA9IGZ1bmN0aW9uICh2RWRnZSlcbntcbiAgcmV0dXJuIG5ldyBMRWRnZShudWxsLCBudWxsLCB2RWRnZSk7XG59O1xuXG5MYXlvdXQucHJvdG90eXBlLmNoZWNrTGF5b3V0U3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gKHRoaXMuZ3JhcGhNYW5hZ2VyLmdldFJvb3QoKSA9PSBudWxsKVxuICAgICAgICAgIHx8IHRoaXMuZ3JhcGhNYW5hZ2VyLmdldFJvb3QoKS5nZXROb2RlcygpLmxlbmd0aCA9PSAwXG4gICAgICAgICAgfHwgdGhpcy5ncmFwaE1hbmFnZXIuaW5jbHVkZXNJbnZhbGlkRWRnZSgpO1xufTtcblxuTGF5b3V0LnByb3RvdHlwZS5ydW5MYXlvdXQgPSBmdW5jdGlvbiAoKVxue1xuICB0aGlzLmlzTGF5b3V0RmluaXNoZWQgPSBmYWxzZTtcbiAgXG4gIGlmICh0aGlzLnRpbGluZ1ByZUxheW91dCkge1xuICAgIHRoaXMudGlsaW5nUHJlTGF5b3V0KCk7XG4gIH1cblxuICB0aGlzLmluaXRQYXJhbWV0ZXJzKCk7XG4gIHZhciBpc0xheW91dFN1Y2Nlc3NmdWxsO1xuXG4gIGlmICh0aGlzLmNoZWNrTGF5b3V0U3VjY2VzcygpKVxuICB7XG4gICAgaXNMYXlvdXRTdWNjZXNzZnVsbCA9IGZhbHNlO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIGlzTGF5b3V0U3VjY2Vzc2Z1bGwgPSB0aGlzLmxheW91dCgpO1xuICB9XG4gIFxuICBpZiAoTGF5b3V0Q29uc3RhbnRzLkFOSU1BVEUgPT09ICdkdXJpbmcnKSB7XG4gICAgLy8gSWYgdGhpcyBpcyBhICdkdXJpbmcnIGxheW91dCBhbmltYXRpb24uIExheW91dCBpcyBub3QgZmluaXNoZWQgeWV0LiBcbiAgICAvLyBXZSBuZWVkIHRvIHBlcmZvcm0gdGhlc2UgaW4gaW5kZXguanMgd2hlbiBsYXlvdXQgaXMgcmVhbGx5IGZpbmlzaGVkLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBcbiAgaWYgKGlzTGF5b3V0U3VjY2Vzc2Z1bGwpXG4gIHtcbiAgICBpZiAoIXRoaXMuaXNTdWJMYXlvdXQpXG4gICAge1xuICAgICAgdGhpcy5kb1Bvc3RMYXlvdXQoKTtcbiAgICB9XG4gIH1cblxuICBpZiAodGhpcy50aWxpbmdQb3N0TGF5b3V0KSB7XG4gICAgdGhpcy50aWxpbmdQb3N0TGF5b3V0KCk7XG4gIH1cblxuICB0aGlzLmlzTGF5b3V0RmluaXNoZWQgPSB0cnVlO1xuXG4gIHJldHVybiBpc0xheW91dFN1Y2Nlc3NmdWxsO1xufTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBwZXJmb3JtcyB0aGUgb3BlcmF0aW9ucyByZXF1aXJlZCBhZnRlciBsYXlvdXQuXG4gKi9cbkxheW91dC5wcm90b3R5cGUuZG9Qb3N0TGF5b3V0ID0gZnVuY3Rpb24gKClcbntcbiAgLy9hc3NlcnQgIWlzU3ViTGF5b3V0IDogXCJTaG91bGQgbm90IGJlIGNhbGxlZCBvbiBzdWItbGF5b3V0IVwiO1xuICAvLyBQcm9wYWdhdGUgZ2VvbWV0cmljIGNoYW5nZXMgdG8gdi1sZXZlbCBvYmplY3RzXG4gIGlmKCF0aGlzLmluY3JlbWVudGFsKXtcbiAgICB0aGlzLnRyYW5zZm9ybSgpO1xuICB9XG4gIHRoaXMudXBkYXRlKCk7XG59O1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHVwZGF0ZXMgdGhlIGdlb21ldHJ5IG9mIHRoZSB0YXJnZXQgZ3JhcGggYWNjb3JkaW5nIHRvXG4gKiBjYWxjdWxhdGVkIGxheW91dC5cbiAqL1xuTGF5b3V0LnByb3RvdHlwZS51cGRhdGUyID0gZnVuY3Rpb24gKCkge1xuICAvLyB1cGRhdGUgYmVuZCBwb2ludHNcbiAgaWYgKHRoaXMuY3JlYXRlQmVuZHNBc05lZWRlZClcbiAge1xuICAgIHRoaXMuY3JlYXRlQmVuZHBvaW50c0Zyb21EdW1teU5vZGVzKCk7XG5cbiAgICAvLyByZXNldCBhbGwgZWRnZXMsIHNpbmNlIHRoZSB0b3BvbG9neSBoYXMgY2hhbmdlZFxuICAgIHRoaXMuZ3JhcGhNYW5hZ2VyLnJlc2V0QWxsRWRnZXMoKTtcbiAgfVxuXG4gIC8vIHBlcmZvcm0gZWRnZSwgbm9kZSBhbmQgcm9vdCB1cGRhdGVzIGlmIGxheW91dCBpcyBub3QgY2FsbGVkXG4gIC8vIHJlbW90ZWx5XG4gIGlmICghdGhpcy5pc1JlbW90ZVVzZSlcbiAge1xuICAgIC8vIHVwZGF0ZSBhbGwgZWRnZXNcbiAgICB2YXIgZWRnZTtcbiAgICB2YXIgYWxsRWRnZXMgPSB0aGlzLmdyYXBoTWFuYWdlci5nZXRBbGxFZGdlcygpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsRWRnZXMubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgZWRnZSA9IGFsbEVkZ2VzW2ldO1xuLy8gICAgICB0aGlzLnVwZGF0ZShlZGdlKTtcbiAgICB9XG5cbiAgICAvLyByZWN1cnNpdmVseSB1cGRhdGUgbm9kZXNcbiAgICB2YXIgbm9kZTtcbiAgICB2YXIgbm9kZXMgPSB0aGlzLmdyYXBoTWFuYWdlci5nZXRSb290KCkuZ2V0Tm9kZXMoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIG5vZGUgPSBub2Rlc1tpXTtcbi8vICAgICAgdGhpcy51cGRhdGUobm9kZSk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHJvb3QgZ3JhcGhcbiAgICB0aGlzLnVwZGF0ZSh0aGlzLmdyYXBoTWFuYWdlci5nZXRSb290KCkpO1xuICB9XG59O1xuXG5MYXlvdXQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgdGhpcy51cGRhdGUyKCk7XG4gIH1cbiAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgTE5vZGUpIHtcbiAgICB2YXIgbm9kZSA9IG9iajtcbiAgICBpZiAobm9kZS5nZXRDaGlsZCgpICE9IG51bGwpXG4gICAge1xuICAgICAgLy8gc2luY2Ugbm9kZSBpcyBjb21wb3VuZCwgcmVjdXJzaXZlbHkgdXBkYXRlIGNoaWxkIG5vZGVzXG4gICAgICB2YXIgbm9kZXMgPSBub2RlLmdldENoaWxkKCkuZ2V0Tm9kZXMoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspXG4gICAgICB7XG4gICAgICAgIHVwZGF0ZShub2Rlc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIGwtbGV2ZWwgbm9kZSBpcyBhc3NvY2lhdGVkIHdpdGggYSB2LWxldmVsIGdyYXBoIG9iamVjdCxcbiAgICAvLyB0aGVuIGl0IGlzIGFzc3VtZWQgdGhhdCB0aGUgdi1sZXZlbCBub2RlIGltcGxlbWVudHMgdGhlXG4gICAgLy8gaW50ZXJmYWNlIFVwZGF0YWJsZS5cbiAgICBpZiAobm9kZS52R3JhcGhPYmplY3QgIT0gbnVsbClcbiAgICB7XG4gICAgICAvLyBjYXN0IHRvIFVwZGF0YWJsZSB3aXRob3V0IGFueSB0eXBlIGNoZWNrXG4gICAgICB2YXIgdk5vZGUgPSBub2RlLnZHcmFwaE9iamVjdDtcblxuICAgICAgLy8gY2FsbCB0aGUgdXBkYXRlIG1ldGhvZCBvZiB0aGUgaW50ZXJmYWNlXG4gICAgICB2Tm9kZS51cGRhdGUobm9kZSk7XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIExFZGdlKSB7XG4gICAgdmFyIGVkZ2UgPSBvYmo7XG4gICAgLy8gaWYgdGhlIGwtbGV2ZWwgZWRnZSBpcyBhc3NvY2lhdGVkIHdpdGggYSB2LWxldmVsIGdyYXBoIG9iamVjdCxcbiAgICAvLyB0aGVuIGl0IGlzIGFzc3VtZWQgdGhhdCB0aGUgdi1sZXZlbCBlZGdlIGltcGxlbWVudHMgdGhlXG4gICAgLy8gaW50ZXJmYWNlIFVwZGF0YWJsZS5cblxuICAgIGlmIChlZGdlLnZHcmFwaE9iamVjdCAhPSBudWxsKVxuICAgIHtcbiAgICAgIC8vIGNhc3QgdG8gVXBkYXRhYmxlIHdpdGhvdXQgYW55IHR5cGUgY2hlY2tcbiAgICAgIHZhciB2RWRnZSA9IGVkZ2UudkdyYXBoT2JqZWN0O1xuXG4gICAgICAvLyBjYWxsIHRoZSB1cGRhdGUgbWV0aG9kIG9mIHRoZSBpbnRlcmZhY2VcbiAgICAgIHZFZGdlLnVwZGF0ZShlZGdlKTtcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgTEdyYXBoKSB7XG4gICAgdmFyIGdyYXBoID0gb2JqO1xuICAgIC8vIGlmIHRoZSBsLWxldmVsIGdyYXBoIGlzIGFzc29jaWF0ZWQgd2l0aCBhIHYtbGV2ZWwgZ3JhcGggb2JqZWN0LFxuICAgIC8vIHRoZW4gaXQgaXMgYXNzdW1lZCB0aGF0IHRoZSB2LWxldmVsIG9iamVjdCBpbXBsZW1lbnRzIHRoZVxuICAgIC8vIGludGVyZmFjZSBVcGRhdGFibGUuXG5cbiAgICBpZiAoZ3JhcGgudkdyYXBoT2JqZWN0ICE9IG51bGwpXG4gICAge1xuICAgICAgLy8gY2FzdCB0byBVcGRhdGFibGUgd2l0aG91dCBhbnkgdHlwZSBjaGVja1xuICAgICAgdmFyIHZHcmFwaCA9IGdyYXBoLnZHcmFwaE9iamVjdDtcblxuICAgICAgLy8gY2FsbCB0aGUgdXBkYXRlIG1ldGhvZCBvZiB0aGUgaW50ZXJmYWNlXG4gICAgICB2R3JhcGgudXBkYXRlKGdyYXBoKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBzZXQgYWxsIGxheW91dCBwYXJhbWV0ZXJzIHRvIGRlZmF1bHQgdmFsdWVzXG4gKiBkZXRlcm1pbmVkIGF0IGNvbXBpbGUgdGltZS5cbiAqL1xuTGF5b3V0LnByb3RvdHlwZS5pbml0UGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLmlzU3ViTGF5b3V0KVxuICB7XG4gICAgdGhpcy5sYXlvdXRRdWFsaXR5ID0gTGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfUVVBTElUWTtcbiAgICB0aGlzLmFuaW1hdGlvbkR1cmluZ0xheW91dCA9IExheW91dENvbnN0YW50cy5ERUZBVUxUX0FOSU1BVElPTl9EVVJJTkdfTEFZT1VUO1xuICAgIHRoaXMuYW5pbWF0aW9uUGVyaW9kID0gTGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfQU5JTUFUSU9OX1BFUklPRDtcbiAgICB0aGlzLmFuaW1hdGlvbk9uTGF5b3V0ID0gTGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfQU5JTUFUSU9OX09OX0xBWU9VVDtcbiAgICB0aGlzLmluY3JlbWVudGFsID0gTGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfSU5DUkVNRU5UQUw7XG4gICAgdGhpcy5jcmVhdGVCZW5kc0FzTmVlZGVkID0gTGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfQ1JFQVRFX0JFTkRTX0FTX05FRURFRDtcbiAgICB0aGlzLnVuaWZvcm1MZWFmTm9kZVNpemVzID0gTGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfVU5JRk9STV9MRUFGX05PREVfU0laRVM7XG4gIH1cblxuICBpZiAodGhpcy5hbmltYXRpb25EdXJpbmdMYXlvdXQpXG4gIHtcbiAgICB0aGlzLmFuaW1hdGlvbk9uTGF5b3V0ID0gZmFsc2U7XG4gIH1cbn07XG5cbkxheW91dC5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKG5ld0xlZnRUb3ApIHtcbiAgaWYgKG5ld0xlZnRUb3AgPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy50cmFuc2Zvcm0obmV3IFBvaW50RCgwLCAwKSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gY3JlYXRlIGEgdHJhbnNmb3JtYXRpb24gb2JqZWN0IChmcm9tIEVjbGlwc2UgdG8gbGF5b3V0KS4gV2hlbiBhblxuICAgIC8vIGludmVyc2UgdHJhbnNmb3JtIGlzIGFwcGxpZWQsIHdlIGdldCB1cHBlci1sZWZ0IGNvb3JkaW5hdGUgb2YgdGhlXG4gICAgLy8gZHJhd2luZyBvciB0aGUgcm9vdCBncmFwaCBhdCBnaXZlbiBpbnB1dCBjb29yZGluYXRlIChzb21lIG1hcmdpbnNcbiAgICAvLyBhbHJlYWR5IGluY2x1ZGVkIGluIGNhbGN1bGF0aW9uIG9mIGxlZnQtdG9wKS5cblxuICAgIHZhciB0cmFucyA9IG5ldyBUcmFuc2Zvcm0oKTtcbiAgICB2YXIgbGVmdFRvcCA9IHRoaXMuZ3JhcGhNYW5hZ2VyLmdldFJvb3QoKS51cGRhdGVMZWZ0VG9wKCk7XG5cbiAgICBpZiAobGVmdFRvcCAhPSBudWxsKVxuICAgIHtcbiAgICAgIHRyYW5zLnNldFdvcmxkT3JnWChuZXdMZWZ0VG9wLngpO1xuICAgICAgdHJhbnMuc2V0V29ybGRPcmdZKG5ld0xlZnRUb3AueSk7XG5cbiAgICAgIHRyYW5zLnNldERldmljZU9yZ1gobGVmdFRvcC54KTtcbiAgICAgIHRyYW5zLnNldERldmljZU9yZ1kobGVmdFRvcC55KTtcblxuICAgICAgdmFyIG5vZGVzID0gdGhpcy5nZXRBbGxOb2RlcygpO1xuICAgICAgdmFyIG5vZGU7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspXG4gICAgICB7XG4gICAgICAgIG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgbm9kZS50cmFuc2Zvcm0odHJhbnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuTGF5b3V0LnByb3RvdHlwZS5wb3NpdGlvbk5vZGVzUmFuZG9tbHkgPSBmdW5jdGlvbiAoZ3JhcGgpIHtcblxuICBpZiAoZ3JhcGggPT0gdW5kZWZpbmVkKSB7XG4gICAgLy9hc3NlcnQgIXRoaXMuaW5jcmVtZW50YWw7XG4gICAgdGhpcy5wb3NpdGlvbk5vZGVzUmFuZG9tbHkodGhpcy5nZXRHcmFwaE1hbmFnZXIoKS5nZXRSb290KCkpO1xuICAgIHRoaXMuZ2V0R3JhcGhNYW5hZ2VyKCkuZ2V0Um9vdCgpLnVwZGF0ZUJvdW5kcyh0cnVlKTtcbiAgfVxuICBlbHNlIHtcbiAgICB2YXIgbE5vZGU7XG4gICAgdmFyIGNoaWxkR3JhcGg7XG5cbiAgICB2YXIgbm9kZXMgPSBncmFwaC5nZXROb2RlcygpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgbE5vZGUgPSBub2Rlc1tpXTtcbiAgICAgIGNoaWxkR3JhcGggPSBsTm9kZS5nZXRDaGlsZCgpO1xuXG4gICAgICBpZiAoY2hpbGRHcmFwaCA9PSBudWxsKVxuICAgICAge1xuICAgICAgICBsTm9kZS5zY2F0dGVyKCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChjaGlsZEdyYXBoLmdldE5vZGVzKCkubGVuZ3RoID09IDApXG4gICAgICB7XG4gICAgICAgIGxOb2RlLnNjYXR0ZXIoKTtcbiAgICAgIH1cbiAgICAgIGVsc2VcbiAgICAgIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbk5vZGVzUmFuZG9tbHkoY2hpbGRHcmFwaCk7XG4gICAgICAgIGxOb2RlLnVwZGF0ZUJvdW5kcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGEgbGlzdCBvZiB0cmVlcyB3aGVyZSBlYWNoIHRyZWUgaXMgcmVwcmVzZW50ZWQgYXMgYVxuICogbGlzdCBvZiBsLW5vZGVzLiBUaGUgbWV0aG9kIHJldHVybnMgYSBsaXN0IG9mIHNpemUgMCB3aGVuOlxuICogLSBUaGUgZ3JhcGggaXMgbm90IGZsYXQgb3JcbiAqIC0gT25lIG9mIHRoZSBjb21wb25lbnQocykgb2YgdGhlIGdyYXBoIGlzIG5vdCBhIHRyZWUuXG4gKi9cbkxheW91dC5wcm90b3R5cGUuZ2V0RmxhdEZvcmVzdCA9IGZ1bmN0aW9uICgpXG57XG4gIHZhciBmbGF0Rm9yZXN0ID0gW107XG4gIHZhciBpc0ZvcmVzdCA9IHRydWU7XG5cbiAgLy8gUXVpY2sgcmVmZXJlbmNlIGZvciBhbGwgbm9kZXMgaW4gdGhlIGdyYXBoIG1hbmFnZXIgYXNzb2NpYXRlZCB3aXRoXG4gIC8vIHRoaXMgbGF5b3V0LiBUaGUgbGlzdCBzaG91bGQgbm90IGJlIGNoYW5nZWQuXG4gIHZhciBhbGxOb2RlcyA9IHRoaXMuZ3JhcGhNYW5hZ2VyLmdldFJvb3QoKS5nZXROb2RlcygpO1xuXG4gIC8vIEZpcnN0IGJlIHN1cmUgdGhhdCB0aGUgZ3JhcGggaXMgZmxhdFxuICB2YXIgaXNGbGF0ID0gdHJ1ZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbE5vZGVzLmxlbmd0aDsgaSsrKVxuICB7XG4gICAgaWYgKGFsbE5vZGVzW2ldLmdldENoaWxkKCkgIT0gbnVsbClcbiAgICB7XG4gICAgICBpc0ZsYXQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm4gZW1wdHkgZm9yZXN0IGlmIHRoZSBncmFwaCBpcyBub3QgZmxhdC5cbiAgaWYgKCFpc0ZsYXQpXG4gIHtcbiAgICByZXR1cm4gZmxhdEZvcmVzdDtcbiAgfVxuXG4gIC8vIFJ1biBCRlMgZm9yIGVhY2ggY29tcG9uZW50IG9mIHRoZSBncmFwaC5cblxuICB2YXIgdmlzaXRlZCA9IG5ldyBIYXNoU2V0KCk7XG4gIHZhciB0b0JlVmlzaXRlZCA9IFtdO1xuICB2YXIgcGFyZW50cyA9IG5ldyBIYXNoTWFwKCk7XG4gIHZhciB1blByb2Nlc3NlZE5vZGVzID0gW107XG5cbiAgdW5Qcm9jZXNzZWROb2RlcyA9IHVuUHJvY2Vzc2VkTm9kZXMuY29uY2F0KGFsbE5vZGVzKTtcblxuICAvLyBFYWNoIGl0ZXJhdGlvbiBvZiB0aGlzIGxvb3AgZmluZHMgYSBjb21wb25lbnQgb2YgdGhlIGdyYXBoIGFuZFxuICAvLyBkZWNpZGVzIHdoZXRoZXIgaXQgaXMgYSB0cmVlIG9yIG5vdC4gSWYgaXQgaXMgYSB0cmVlLCBhZGRzIGl0IHRvIHRoZVxuICAvLyBmb3Jlc3QgYW5kIGNvbnRpbnVlZCB3aXRoIHRoZSBuZXh0IGNvbXBvbmVudC5cblxuICB3aGlsZSAodW5Qcm9jZXNzZWROb2Rlcy5sZW5ndGggPiAwICYmIGlzRm9yZXN0KVxuICB7XG4gICAgdG9CZVZpc2l0ZWQucHVzaCh1blByb2Nlc3NlZE5vZGVzWzBdKTtcblxuICAgIC8vIFN0YXJ0IHRoZSBCRlMuIEVhY2ggaXRlcmF0aW9uIG9mIHRoaXMgbG9vcCB2aXNpdHMgYSBub2RlIGluIGFcbiAgICAvLyBCRlMgbWFubmVyLlxuICAgIHdoaWxlICh0b0JlVmlzaXRlZC5sZW5ndGggPiAwICYmIGlzRm9yZXN0KVxuICAgIHtcbiAgICAgIC8vcG9vbCBvcGVyYXRpb25cbiAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRvQmVWaXNpdGVkWzBdO1xuICAgICAgdG9CZVZpc2l0ZWQuc3BsaWNlKDAsIDEpO1xuICAgICAgdmlzaXRlZC5hZGQoY3VycmVudE5vZGUpO1xuXG4gICAgICAvLyBUcmF2ZXJzZSBhbGwgbmVpZ2hib3JzIG9mIHRoaXMgbm9kZVxuICAgICAgdmFyIG5laWdoYm9yRWRnZXMgPSBjdXJyZW50Tm9kZS5nZXRFZGdlcygpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5laWdoYm9yRWRnZXMubGVuZ3RoOyBpKyspXG4gICAgICB7XG4gICAgICAgIHZhciBjdXJyZW50TmVpZ2hib3IgPVxuICAgICAgICAgICAgICAgIG5laWdoYm9yRWRnZXNbaV0uZ2V0T3RoZXJFbmQoY3VycmVudE5vZGUpO1xuXG4gICAgICAgIC8vIElmIEJGUyBpcyBub3QgZ3Jvd2luZyBmcm9tIHRoaXMgbmVpZ2hib3IuXG4gICAgICAgIGlmIChwYXJlbnRzLmdldChjdXJyZW50Tm9kZSkgIT0gY3VycmVudE5laWdoYm9yKVxuICAgICAgICB7XG4gICAgICAgICAgLy8gV2UgaGF2ZW4ndCBwcmV2aW91c2x5IHZpc2l0ZWQgdGhpcyBuZWlnaGJvci5cbiAgICAgICAgICBpZiAoIXZpc2l0ZWQuY29udGFpbnMoY3VycmVudE5laWdoYm9yKSlcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0b0JlVmlzaXRlZC5wdXNoKGN1cnJlbnROZWlnaGJvcik7XG4gICAgICAgICAgICBwYXJlbnRzLnB1dChjdXJyZW50TmVpZ2hib3IsIGN1cnJlbnROb2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gU2luY2Ugd2UgaGF2ZSBwcmV2aW91c2x5IHZpc2l0ZWQgdGhpcyBuZWlnaGJvciBhbmRcbiAgICAgICAgICAvLyB0aGlzIG5laWdoYm9yIGlzIG5vdCBwYXJlbnQgb2YgY3VycmVudE5vZGUsIGdpdmVuXG4gICAgICAgICAgLy8gZ3JhcGggY29udGFpbnMgYSBjb21wb25lbnQgdGhhdCBpcyBub3QgdHJlZSwgaGVuY2VcbiAgICAgICAgICAvLyBpdCBpcyBub3QgYSBmb3Jlc3QuXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlzRm9yZXN0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUaGUgZ3JhcGggY29udGFpbnMgYSBjb21wb25lbnQgdGhhdCBpcyBub3QgYSB0cmVlLiBFbXB0eVxuICAgIC8vIHByZXZpb3VzbHkgZm91bmQgdHJlZXMuIFRoZSBtZXRob2Qgd2lsbCBlbmQuXG4gICAgaWYgKCFpc0ZvcmVzdClcbiAgICB7XG4gICAgICBmbGF0Rm9yZXN0ID0gW107XG4gICAgfVxuICAgIC8vIFNhdmUgY3VycmVudGx5IHZpc2l0ZWQgbm9kZXMgYXMgYSB0cmVlIGluIG91ciBmb3Jlc3QuIFJlc2V0XG4gICAgLy8gdmlzaXRlZCBhbmQgcGFyZW50cyBsaXN0cy4gQ29udGludWUgd2l0aCB0aGUgbmV4dCBjb21wb25lbnQgb2ZcbiAgICAvLyB0aGUgZ3JhcGgsIGlmIGFueS5cbiAgICBlbHNlXG4gICAge1xuICAgICAgdmFyIHRlbXAgPSBbXTtcbiAgICAgIHZpc2l0ZWQuYWRkQWxsVG8odGVtcCk7XG4gICAgICBmbGF0Rm9yZXN0LnB1c2godGVtcCk7XG4gICAgICAvL2ZsYXRGb3Jlc3QgPSBmbGF0Rm9yZXN0LmNvbmNhdCh0ZW1wKTtcbiAgICAgIC8vdW5Qcm9jZXNzZWROb2Rlcy5yZW1vdmVBbGwodmlzaXRlZCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGVtcFtpXTtcbiAgICAgICAgdmFyIGluZGV4ID0gdW5Qcm9jZXNzZWROb2Rlcy5pbmRleE9mKHZhbHVlKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICB1blByb2Nlc3NlZE5vZGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZpc2l0ZWQgPSBuZXcgSGFzaFNldCgpO1xuICAgICAgcGFyZW50cyA9IG5ldyBIYXNoTWFwKCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZsYXRGb3Jlc3Q7XG59O1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgZHVtbXkgbm9kZXMgKGFuIGwtbGV2ZWwgbm9kZSB3aXRoIG1pbmltYWwgZGltZW5zaW9ucylcbiAqIGZvciB0aGUgZ2l2ZW4gZWRnZSAob25lIHBlciBiZW5kcG9pbnQpLiBUaGUgZXhpc3RpbmcgbC1sZXZlbCBzdHJ1Y3R1cmVcbiAqIGlzIHVwZGF0ZWQgYWNjb3JkaW5nbHkuXG4gKi9cbkxheW91dC5wcm90b3R5cGUuY3JlYXRlRHVtbXlOb2Rlc0ZvckJlbmRwb2ludHMgPSBmdW5jdGlvbiAoZWRnZSlcbntcbiAgdmFyIGR1bW15Tm9kZXMgPSBbXTtcbiAgdmFyIHByZXYgPSBlZGdlLnNvdXJjZTtcblxuICB2YXIgZ3JhcGggPSB0aGlzLmdyYXBoTWFuYWdlci5jYWxjTG93ZXN0Q29tbW9uQW5jZXN0b3IoZWRnZS5zb3VyY2UsIGVkZ2UudGFyZ2V0KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVkZ2UuYmVuZHBvaW50cy5sZW5ndGg7IGkrKylcbiAge1xuICAgIC8vIGNyZWF0ZSBuZXcgZHVtbXkgbm9kZVxuICAgIHZhciBkdW1teU5vZGUgPSB0aGlzLm5ld05vZGUobnVsbCk7XG4gICAgZHVtbXlOb2RlLnNldFJlY3QobmV3IFBvaW50KDAsIDApLCBuZXcgRGltZW5zaW9uKDEsIDEpKTtcblxuICAgIGdyYXBoLmFkZChkdW1teU5vZGUpO1xuXG4gICAgLy8gY3JlYXRlIG5ldyBkdW1teSBlZGdlIGJldHdlZW4gcHJldiBhbmQgZHVtbXkgbm9kZVxuICAgIHZhciBkdW1teUVkZ2UgPSB0aGlzLm5ld0VkZ2UobnVsbCk7XG4gICAgdGhpcy5ncmFwaE1hbmFnZXIuYWRkKGR1bW15RWRnZSwgcHJldiwgZHVtbXlOb2RlKTtcblxuICAgIGR1bW15Tm9kZXMuYWRkKGR1bW15Tm9kZSk7XG4gICAgcHJldiA9IGR1bW15Tm9kZTtcbiAgfVxuXG4gIHZhciBkdW1teUVkZ2UgPSB0aGlzLm5ld0VkZ2UobnVsbCk7XG4gIHRoaXMuZ3JhcGhNYW5hZ2VyLmFkZChkdW1teUVkZ2UsIHByZXYsIGVkZ2UudGFyZ2V0KTtcblxuICB0aGlzLmVkZ2VUb0R1bW15Tm9kZXMucHV0KGVkZ2UsIGR1bW15Tm9kZXMpO1xuXG4gIC8vIHJlbW92ZSByZWFsIGVkZ2UgZnJvbSBncmFwaCBtYW5hZ2VyIGlmIGl0IGlzIGludGVyLWdyYXBoXG4gIGlmIChlZGdlLmlzSW50ZXJHcmFwaCgpKVxuICB7XG4gICAgdGhpcy5ncmFwaE1hbmFnZXIucmVtb3ZlKGVkZ2UpO1xuICB9XG4gIC8vIGVsc2UsIHJlbW92ZSB0aGUgZWRnZSBmcm9tIHRoZSBjdXJyZW50IGdyYXBoXG4gIGVsc2VcbiAge1xuICAgIGdyYXBoLnJlbW92ZShlZGdlKTtcbiAgfVxuXG4gIHJldHVybiBkdW1teU5vZGVzO1xufTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGJlbmRwb2ludHMgZm9yIGVkZ2VzIGZyb20gdGhlIGR1bW15IG5vZGVzXG4gKiBhdCBsLWxldmVsLlxuICovXG5MYXlvdXQucHJvdG90eXBlLmNyZWF0ZUJlbmRwb2ludHNGcm9tRHVtbXlOb2RlcyA9IGZ1bmN0aW9uICgpXG57XG4gIHZhciBlZGdlcyA9IFtdO1xuICBlZGdlcyA9IGVkZ2VzLmNvbmNhdCh0aGlzLmdyYXBoTWFuYWdlci5nZXRBbGxFZGdlcygpKTtcbiAgZWRnZXMgPSB0aGlzLmVkZ2VUb0R1bW15Tm9kZXMua2V5U2V0KCkuY29uY2F0KGVkZ2VzKTtcblxuICBmb3IgKHZhciBrID0gMDsgayA8IGVkZ2VzLmxlbmd0aDsgaysrKVxuICB7XG4gICAgdmFyIGxFZGdlID0gZWRnZXNba107XG5cbiAgICBpZiAobEVkZ2UuYmVuZHBvaW50cy5sZW5ndGggPiAwKVxuICAgIHtcbiAgICAgIHZhciBwYXRoID0gdGhpcy5lZGdlVG9EdW1teU5vZGVzLmdldChsRWRnZSk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKylcbiAgICAgIHtcbiAgICAgICAgdmFyIGR1bW15Tm9kZSA9IHBhdGhbaV07XG4gICAgICAgIHZhciBwID0gbmV3IFBvaW50RChkdW1teU5vZGUuZ2V0Q2VudGVyWCgpLFxuICAgICAgICAgICAgICAgIGR1bW15Tm9kZS5nZXRDZW50ZXJZKCkpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBiZW5kcG9pbnQncyBsb2NhdGlvbiBhY2NvcmRpbmcgdG8gZHVtbXkgbm9kZVxuICAgICAgICB2YXIgZWJwID0gbEVkZ2UuYmVuZHBvaW50cy5nZXQoaSk7XG4gICAgICAgIGVicC54ID0gcC54O1xuICAgICAgICBlYnAueSA9IHAueTtcblxuICAgICAgICAvLyByZW1vdmUgdGhlIGR1bW15IG5vZGUsIGR1bW15IGVkZ2VzIGluY2lkZW50IHdpdGggdGhpc1xuICAgICAgICAvLyBkdW1teSBub2RlIGlzIGFsc28gcmVtb3ZlZCAod2l0aGluIHRoZSByZW1vdmUgbWV0aG9kKVxuICAgICAgICBkdW1teU5vZGUuZ2V0T3duZXIoKS5yZW1vdmUoZHVtbXlOb2RlKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWRkIHRoZSByZWFsIGVkZ2UgdG8gZ3JhcGhcbiAgICAgIHRoaXMuZ3JhcGhNYW5hZ2VyLmFkZChsRWRnZSwgbEVkZ2Uuc291cmNlLCBsRWRnZS50YXJnZXQpO1xuICAgIH1cbiAgfVxufTtcblxuTGF5b3V0LnRyYW5zZm9ybSA9IGZ1bmN0aW9uIChzbGlkZXJWYWx1ZSwgZGVmYXVsdFZhbHVlLCBtaW5EaXYsIG1heE11bCkge1xuICBpZiAobWluRGl2ICE9IHVuZGVmaW5lZCAmJiBtYXhNdWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHZhbHVlID0gZGVmYXVsdFZhbHVlO1xuXG4gICAgaWYgKHNsaWRlclZhbHVlIDw9IDUwKVxuICAgIHtcbiAgICAgIHZhciBtaW5WYWx1ZSA9IGRlZmF1bHRWYWx1ZSAvIG1pbkRpdjtcbiAgICAgIHZhbHVlIC09ICgoZGVmYXVsdFZhbHVlIC0gbWluVmFsdWUpIC8gNTApICogKDUwIC0gc2xpZGVyVmFsdWUpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgdmFyIG1heFZhbHVlID0gZGVmYXVsdFZhbHVlICogbWF4TXVsO1xuICAgICAgdmFsdWUgKz0gKChtYXhWYWx1ZSAtIGRlZmF1bHRWYWx1ZSkgLyA1MCkgKiAoc2xpZGVyVmFsdWUgLSA1MCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGVsc2Uge1xuICAgIHZhciBhLCBiO1xuXG4gICAgaWYgKHNsaWRlclZhbHVlIDw9IDUwKVxuICAgIHtcbiAgICAgIGEgPSA5LjAgKiBkZWZhdWx0VmFsdWUgLyA1MDAuMDtcbiAgICAgIGIgPSBkZWZhdWx0VmFsdWUgLyAxMC4wO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgYSA9IDkuMCAqIGRlZmF1bHRWYWx1ZSAvIDUwLjA7XG4gICAgICBiID0gLTggKiBkZWZhdWx0VmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIChhICogc2xpZGVyVmFsdWUgKyBiKTtcbiAgfVxufTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBmaW5kcyBhbmQgcmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBnaXZlbiBub2RlcywgYXNzdW1pbmdcbiAqIHRoYXQgdGhlIGdpdmVuIG5vZGVzIGZvcm0gYSB0cmVlIGluIHRoZW1zZWx2ZXMuXG4gKi9cbkxheW91dC5maW5kQ2VudGVyT2ZUcmVlID0gZnVuY3Rpb24gKG5vZGVzKVxue1xuICB2YXIgbGlzdCA9IFtdO1xuICBsaXN0ID0gbGlzdC5jb25jYXQobm9kZXMpO1xuXG4gIHZhciByZW1vdmVkTm9kZXMgPSBbXTtcbiAgdmFyIHJlbWFpbmluZ0RlZ3JlZXMgPSBuZXcgSGFzaE1hcCgpO1xuICB2YXIgZm91bmRDZW50ZXIgPSBmYWxzZTtcbiAgdmFyIGNlbnRlck5vZGUgPSBudWxsO1xuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PSAxIHx8IGxpc3QubGVuZ3RoID09IDIpXG4gIHtcbiAgICBmb3VuZENlbnRlciA9IHRydWU7XG4gICAgY2VudGVyTm9kZSA9IGxpc3RbMF07XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspXG4gIHtcbiAgICB2YXIgbm9kZSA9IGxpc3RbaV07XG4gICAgdmFyIGRlZ3JlZSA9IG5vZGUuZ2V0TmVpZ2hib3JzTGlzdCgpLnNpemUoKTtcbiAgICByZW1haW5pbmdEZWdyZWVzLnB1dChub2RlLCBub2RlLmdldE5laWdoYm9yc0xpc3QoKS5zaXplKCkpO1xuXG4gICAgaWYgKGRlZ3JlZSA9PSAxKVxuICAgIHtcbiAgICAgIHJlbW92ZWROb2Rlcy5wdXNoKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciB0ZW1wTGlzdCA9IFtdO1xuICB0ZW1wTGlzdCA9IHRlbXBMaXN0LmNvbmNhdChyZW1vdmVkTm9kZXMpO1xuXG4gIHdoaWxlICghZm91bmRDZW50ZXIpXG4gIHtcbiAgICB2YXIgdGVtcExpc3QyID0gW107XG4gICAgdGVtcExpc3QyID0gdGVtcExpc3QyLmNvbmNhdCh0ZW1wTGlzdCk7XG4gICAgdGVtcExpc3QgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKylcbiAgICB7XG4gICAgICB2YXIgbm9kZSA9IGxpc3RbaV07XG5cbiAgICAgIHZhciBpbmRleCA9IGxpc3QuaW5kZXhPZihub2RlKTtcbiAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG5laWdoYm91cnMgPSBub2RlLmdldE5laWdoYm9yc0xpc3QoKTtcblxuICAgICAgT2JqZWN0LmtleXMobmVpZ2hib3Vycy5zZXQpLmZvckVhY2goZnVuY3Rpb24oaikge1xuICAgICAgICB2YXIgbmVpZ2hib3VyID0gbmVpZ2hib3Vycy5zZXRbal07XG4gICAgICAgIGlmIChyZW1vdmVkTm9kZXMuaW5kZXhPZihuZWlnaGJvdXIpIDwgMClcbiAgICAgICAge1xuICAgICAgICAgIHZhciBvdGhlckRlZ3JlZSA9IHJlbWFpbmluZ0RlZ3JlZXMuZ2V0KG5laWdoYm91cik7XG4gICAgICAgICAgdmFyIG5ld0RlZ3JlZSA9IG90aGVyRGVncmVlIC0gMTtcblxuICAgICAgICAgIGlmIChuZXdEZWdyZWUgPT0gMSlcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZW1wTGlzdC5wdXNoKG5laWdoYm91cik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVtYWluaW5nRGVncmVlcy5wdXQobmVpZ2hib3VyLCBuZXdEZWdyZWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVkTm9kZXMgPSByZW1vdmVkTm9kZXMuY29uY2F0KHRlbXBMaXN0KTtcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PSAxIHx8IGxpc3QubGVuZ3RoID09IDIpXG4gICAge1xuICAgICAgZm91bmRDZW50ZXIgPSB0cnVlO1xuICAgICAgY2VudGVyTm9kZSA9IGxpc3RbMF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNlbnRlck5vZGU7XG59O1xuXG4vKipcbiAqIER1cmluZyB0aGUgY29hcnNlbmluZyBwcm9jZXNzLCB0aGlzIGxheW91dCBtYXkgYmUgcmVmZXJlbmNlZCBieSB0d28gZ3JhcGggbWFuYWdlcnNcbiAqIHRoaXMgc2V0dGVyIGZ1bmN0aW9uIGdyYW50cyBhY2Nlc3MgdG8gY2hhbmdlIHRoZSBjdXJyZW50bHkgYmVpbmcgdXNlZCBncmFwaCBtYW5hZ2VyXG4gKi9cbkxheW91dC5wcm90b3R5cGUuc2V0R3JhcGhNYW5hZ2VyID0gZnVuY3Rpb24gKGdtKVxue1xuICB0aGlzLmdyYXBoTWFuYWdlciA9IGdtO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMYXlvdXQ7XG4iLCJmdW5jdGlvbiBMYXlvdXRDb25zdGFudHMoKSB7XG59XG5cbi8qKlxuICogTGF5b3V0IFF1YWxpdHlcbiAqL1xuTGF5b3V0Q29uc3RhbnRzLlBST09GX1FVQUxJVFkgPSAwO1xuTGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfUVVBTElUWSA9IDE7XG5MYXlvdXRDb25zdGFudHMuRFJBRlRfUVVBTElUWSA9IDI7XG5cbi8qKlxuICogRGVmYXVsdCBwYXJhbWV0ZXJzXG4gKi9cbkxheW91dENvbnN0YW50cy5ERUZBVUxUX0NSRUFURV9CRU5EU19BU19ORUVERUQgPSBmYWxzZTtcbi8vTGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfSU5DUkVNRU5UQUwgPSB0cnVlO1xuTGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfSU5DUkVNRU5UQUwgPSBmYWxzZTtcbkxheW91dENvbnN0YW50cy5ERUZBVUxUX0FOSU1BVElPTl9PTl9MQVlPVVQgPSB0cnVlO1xuTGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfQU5JTUFUSU9OX0RVUklOR19MQVlPVVQgPSBmYWxzZTtcbkxheW91dENvbnN0YW50cy5ERUZBVUxUX0FOSU1BVElPTl9QRVJJT0QgPSA1MDtcbkxheW91dENvbnN0YW50cy5ERUZBVUxUX1VOSUZPUk1fTEVBRl9OT0RFX1NJWkVTID0gZmFsc2U7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBTZWN0aW9uOiBHZW5lcmFsIG90aGVyIGNvbnN0YW50c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qXG4gKiBNYXJnaW5zIG9mIGEgZ3JhcGggdG8gYmUgYXBwbGllZCBvbiBib3VkaW5nIHJlY3RhbmdsZSBvZiBpdHMgY29udGVudHMuIFdlXG4gKiBhc3N1bWUgbWFyZ2lucyBvbiBhbGwgZm91ciBzaWRlcyB0byBiZSB1bmlmb3JtLlxuICovXG5MYXlvdXRDb25zdGFudHMuREVGQVVMVF9HUkFQSF9NQVJHSU4gPSAxNTtcblxuLypcbiAqIFdoZXRoZXIgdG8gY29uc2lkZXIgbGFiZWxzIGluIG5vZGUgZGltZW5zaW9ucyBvciBub3RcbiAqL1xuTGF5b3V0Q29uc3RhbnRzLk5PREVfRElNRU5TSU9OU19JTkNMVURFX0xBQkVMUyA9IGZhbHNlO1xuXG4vKlxuICogRGVmYXVsdCBkaW1lbnNpb24gb2YgYSBub24tY29tcG91bmQgbm9kZS5cbiAqL1xuTGF5b3V0Q29uc3RhbnRzLlNJTVBMRV9OT0RFX1NJWkUgPSA0MDtcblxuLypcbiAqIERlZmF1bHQgZGltZW5zaW9uIG9mIGEgbm9uLWNvbXBvdW5kIG5vZGUuXG4gKi9cbkxheW91dENvbnN0YW50cy5TSU1QTEVfTk9ERV9IQUxGX1NJWkUgPSBMYXlvdXRDb25zdGFudHMuU0lNUExFX05PREVfU0laRSAvIDI7XG5cbi8qXG4gKiBFbXB0eSBjb21wb3VuZCBub2RlIHNpemUuIFdoZW4gYSBjb21wb3VuZCBub2RlIGlzIGVtcHR5LCBpdHMgYm90aFxuICogZGltZW5zaW9ucyBzaG91bGQgYmUgb2YgdGhpcyB2YWx1ZS5cbiAqL1xuTGF5b3V0Q29uc3RhbnRzLkVNUFRZX0NPTVBPVU5EX05PREVfU0laRSA9IDQwO1xuXG4vKlxuICogTWluaW11bSBsZW5ndGggdGhhdCBhbiBlZGdlIHNob3VsZCB0YWtlIGR1cmluZyBsYXlvdXRcbiAqL1xuTGF5b3V0Q29uc3RhbnRzLk1JTl9FREdFX0xFTkdUSCA9IDE7XG5cbi8qXG4gKiBXb3JsZCBib3VuZGFyaWVzIHRoYXQgbGF5b3V0IG9wZXJhdGVzIG9uXG4gKi9cbkxheW91dENvbnN0YW50cy5XT1JMRF9CT1VOREFSWSA9IDEwMDAwMDA7XG5cbi8qXG4gKiBXb3JsZCBib3VuZGFyaWVzIHRoYXQgcmFuZG9tIHBvc2l0aW9uaW5nIGNhbiBiZSBwZXJmb3JtZWQgd2l0aFxuICovXG5MYXlvdXRDb25zdGFudHMuSU5JVElBTF9XT1JMRF9CT1VOREFSWSA9IExheW91dENvbnN0YW50cy5XT1JMRF9CT1VOREFSWSAvIDEwMDA7XG5cbi8qXG4gKiBDb29yZGluYXRlcyBvZiB0aGUgd29ybGQgY2VudGVyXG4gKi9cbkxheW91dENvbnN0YW50cy5XT1JMRF9DRU5URVJfWCA9IDEyMDA7XG5MYXlvdXRDb25zdGFudHMuV09STERfQ0VOVEVSX1kgPSA5MDA7XG5cbm1vZHVsZS5leHBvcnRzID0gTGF5b3V0Q29uc3RhbnRzO1xuIiwiLypcbiAqVGhpcyBjbGFzcyBpcyB0aGUgamF2YXNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUG9pbnQuamF2YSBjbGFzcyBpbiBqZGtcbiAqL1xuZnVuY3Rpb24gUG9pbnQoeCwgeSwgcCkge1xuICB0aGlzLnggPSBudWxsO1xuICB0aGlzLnkgPSBudWxsO1xuICBpZiAoeCA9PSBudWxsICYmIHkgPT0gbnVsbCAmJiBwID09IG51bGwpIHtcbiAgICB0aGlzLnggPSAwO1xuICAgIHRoaXMueSA9IDA7XG4gIH1cbiAgZWxzZSBpZiAodHlwZW9mIHggPT0gJ251bWJlcicgJiYgdHlwZW9mIHkgPT0gJ251bWJlcicgJiYgcCA9PSBudWxsKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG4gIGVsc2UgaWYgKHguY29uc3RydWN0b3IubmFtZSA9PSAnUG9pbnQnICYmIHkgPT0gbnVsbCAmJiBwID09IG51bGwpIHtcbiAgICBwID0geDtcbiAgICB0aGlzLnggPSBwLng7XG4gICAgdGhpcy55ID0gcC55O1xuICB9XG59XG5cblBvaW50LnByb3RvdHlwZS5nZXRYID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy54O1xufVxuXG5Qb2ludC5wcm90b3R5cGUuZ2V0WSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMueTtcbn1cblxuUG9pbnQucHJvdG90eXBlLmdldExvY2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCwgdGhpcy55KTtcbn1cblxuUG9pbnQucHJvdG90eXBlLnNldExvY2F0aW9uID0gZnVuY3Rpb24gKHgsIHksIHApIHtcbiAgaWYgKHguY29uc3RydWN0b3IubmFtZSA9PSAnUG9pbnQnICYmIHkgPT0gbnVsbCAmJiBwID09IG51bGwpIHtcbiAgICBwID0geDtcbiAgICB0aGlzLnNldExvY2F0aW9uKHAueCwgcC55KTtcbiAgfVxuICBlbHNlIGlmICh0eXBlb2YgeCA9PSAnbnVtYmVyJyAmJiB0eXBlb2YgeSA9PSAnbnVtYmVyJyAmJiBwID09IG51bGwpIHtcbiAgICAvL2lmIGJvdGggcGFyYW1ldGVycyBhcmUgaW50ZWdlciBqdXN0IG1vdmUgKHgseSkgbG9jYXRpb25cbiAgICBpZiAocGFyc2VJbnQoeCkgPT0geCAmJiBwYXJzZUludCh5KSA9PSB5KSB7XG4gICAgICB0aGlzLm1vdmUoeCwgeSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy54ID0gTWF0aC5mbG9vcih4ICsgMC41KTtcbiAgICAgIHRoaXMueSA9IE1hdGguZmxvb3IoeSArIDAuNSk7XG4gICAgfVxuICB9XG59XG5cblBvaW50LnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgdGhpcy54ID0geDtcbiAgdGhpcy55ID0geTtcbn1cblxuUG9pbnQucHJvdG90eXBlLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uIChkeCwgZHkpIHtcbiAgdGhpcy54ICs9IGR4O1xuICB0aGlzLnkgKz0gZHk7XG59XG5cblBvaW50LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGlmIChvYmouY29uc3RydWN0b3IubmFtZSA9PSBcIlBvaW50XCIpIHtcbiAgICB2YXIgcHQgPSBvYmo7XG4gICAgcmV0dXJuICh0aGlzLnggPT0gcHQueCkgJiYgKHRoaXMueSA9PSBwdC55KTtcbiAgfVxuICByZXR1cm4gdGhpcyA9PSBvYmo7XG59XG5cblBvaW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBQb2ludCgpLmNvbnN0cnVjdG9yLm5hbWUgKyBcIlt4PVwiICsgdGhpcy54ICsgXCIseT1cIiArIHRoaXMueSArIFwiXVwiO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBvaW50O1xuIiwiZnVuY3Rpb24gUG9pbnREKHgsIHkpIHtcbiAgaWYgKHggPT0gbnVsbCAmJiB5ID09IG51bGwpIHtcbiAgICB0aGlzLnggPSAwO1xuICAgIHRoaXMueSA9IDA7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG59XG5cblBvaW50RC5wcm90b3R5cGUuZ2V0WCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLng7XG59O1xuXG5Qb2ludEQucHJvdG90eXBlLmdldFkgPSBmdW5jdGlvbiAoKVxue1xuICByZXR1cm4gdGhpcy55O1xufTtcblxuUG9pbnRELnByb3RvdHlwZS5zZXRYID0gZnVuY3Rpb24gKHgpXG57XG4gIHRoaXMueCA9IHg7XG59O1xuXG5Qb2ludEQucHJvdG90eXBlLnNldFkgPSBmdW5jdGlvbiAoeSlcbntcbiAgdGhpcy55ID0geTtcbn07XG5cblBvaW50RC5wcm90b3R5cGUuZ2V0RGlmZmVyZW5jZSA9IGZ1bmN0aW9uIChwdClcbntcbiAgcmV0dXJuIG5ldyBEaW1lbnNpb25EKHRoaXMueCAtIHB0LngsIHRoaXMueSAtIHB0LnkpO1xufTtcblxuUG9pbnRELnByb3RvdHlwZS5nZXRDb3B5ID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIG5ldyBQb2ludEQodGhpcy54LCB0aGlzLnkpO1xufTtcblxuUG9pbnRELnByb3RvdHlwZS50cmFuc2xhdGUgPSBmdW5jdGlvbiAoZGltKVxue1xuICB0aGlzLnggKz0gZGltLndpZHRoO1xuICB0aGlzLnkgKz0gZGltLmhlaWdodDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvaW50RDtcbiIsImZ1bmN0aW9uIFJhbmRvbVNlZWQoKSB7XG59XG5SYW5kb21TZWVkLnNlZWQgPSAxO1xuUmFuZG9tU2VlZC54ID0gMDtcblxuUmFuZG9tU2VlZC5uZXh0RG91YmxlID0gZnVuY3Rpb24gKCkge1xuICBSYW5kb21TZWVkLnggPSBNYXRoLnNpbihSYW5kb21TZWVkLnNlZWQrKykgKiAxMDAwMDtcbiAgcmV0dXJuIFJhbmRvbVNlZWQueCAtIE1hdGguZmxvb3IoUmFuZG9tU2VlZC54KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmFuZG9tU2VlZDtcbiIsImZ1bmN0aW9uIFJlY3RhbmdsZUQoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICB0aGlzLnggPSAwO1xuICB0aGlzLnkgPSAwO1xuICB0aGlzLndpZHRoID0gMDtcbiAgdGhpcy5oZWlnaHQgPSAwO1xuXG4gIGlmICh4ICE9IG51bGwgJiYgeSAhPSBudWxsICYmIHdpZHRoICE9IG51bGwgJiYgaGVpZ2h0ICE9IG51bGwpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG59XG5cblJlY3RhbmdsZUQucHJvdG90eXBlLmdldFggPSBmdW5jdGlvbiAoKVxue1xuICByZXR1cm4gdGhpcy54O1xufTtcblxuUmVjdGFuZ2xlRC5wcm90b3R5cGUuc2V0WCA9IGZ1bmN0aW9uICh4KVxue1xuICB0aGlzLnggPSB4O1xufTtcblxuUmVjdGFuZ2xlRC5wcm90b3R5cGUuZ2V0WSA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLnk7XG59O1xuXG5SZWN0YW5nbGVELnByb3RvdHlwZS5zZXRZID0gZnVuY3Rpb24gKHkpXG57XG4gIHRoaXMueSA9IHk7XG59O1xuXG5SZWN0YW5nbGVELnByb3RvdHlwZS5nZXRXaWR0aCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLndpZHRoO1xufTtcblxuUmVjdGFuZ2xlRC5wcm90b3R5cGUuc2V0V2lkdGggPSBmdW5jdGlvbiAod2lkdGgpXG57XG4gIHRoaXMud2lkdGggPSB3aWR0aDtcbn07XG5cblJlY3RhbmdsZUQucHJvdG90eXBlLmdldEhlaWdodCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLmhlaWdodDtcbn07XG5cblJlY3RhbmdsZUQucHJvdG90eXBlLnNldEhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQpXG57XG4gIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xufTtcblxuUmVjdGFuZ2xlRC5wcm90b3R5cGUuZ2V0UmlnaHQgPSBmdW5jdGlvbiAoKVxue1xuICByZXR1cm4gdGhpcy54ICsgdGhpcy53aWR0aDtcbn07XG5cblJlY3RhbmdsZUQucHJvdG90eXBlLmdldEJvdHRvbSA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLnkgKyB0aGlzLmhlaWdodDtcbn07XG5cblJlY3RhbmdsZUQucHJvdG90eXBlLmludGVyc2VjdHMgPSBmdW5jdGlvbiAoYSlcbntcbiAgaWYgKHRoaXMuZ2V0UmlnaHQoKSA8IGEueClcbiAge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLmdldEJvdHRvbSgpIDwgYS55KVxuICB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGEuZ2V0UmlnaHQoKSA8IHRoaXMueClcbiAge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChhLmdldEJvdHRvbSgpIDwgdGhpcy55KVxuICB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5SZWN0YW5nbGVELnByb3RvdHlwZS5nZXRDZW50ZXJYID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHRoaXMueCArIHRoaXMud2lkdGggLyAyO1xufTtcblxuUmVjdGFuZ2xlRC5wcm90b3R5cGUuZ2V0TWluWCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLmdldFgoKTtcbn07XG5cblJlY3RhbmdsZUQucHJvdG90eXBlLmdldE1heFggPSBmdW5jdGlvbiAoKVxue1xuICByZXR1cm4gdGhpcy5nZXRYKCkgKyB0aGlzLndpZHRoO1xufTtcblxuUmVjdGFuZ2xlRC5wcm90b3R5cGUuZ2V0Q2VudGVyWSA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLnkgKyB0aGlzLmhlaWdodCAvIDI7XG59O1xuXG5SZWN0YW5nbGVELnByb3RvdHlwZS5nZXRNaW5ZID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHRoaXMuZ2V0WSgpO1xufTtcblxuUmVjdGFuZ2xlRC5wcm90b3R5cGUuZ2V0TWF4WSA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLmdldFkoKSArIHRoaXMuaGVpZ2h0O1xufTtcblxuUmVjdGFuZ2xlRC5wcm90b3R5cGUuZ2V0V2lkdGhIYWxmID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHRoaXMud2lkdGggLyAyO1xufTtcblxuUmVjdGFuZ2xlRC5wcm90b3R5cGUuZ2V0SGVpZ2h0SGFsZiA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLmhlaWdodCAvIDI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlY3RhbmdsZUQ7XG4iLCJ2YXIgUG9pbnREID0gcmVxdWlyZSgnLi9Qb2ludEQnKTtcblxuZnVuY3Rpb24gVHJhbnNmb3JtKHgsIHkpIHtcbiAgdGhpcy5sd29ybGRPcmdYID0gMC4wO1xuICB0aGlzLmx3b3JsZE9yZ1kgPSAwLjA7XG4gIHRoaXMubGRldmljZU9yZ1ggPSAwLjA7XG4gIHRoaXMubGRldmljZU9yZ1kgPSAwLjA7XG4gIHRoaXMubHdvcmxkRXh0WCA9IDEuMDtcbiAgdGhpcy5sd29ybGRFeHRZID0gMS4wO1xuICB0aGlzLmxkZXZpY2VFeHRYID0gMS4wO1xuICB0aGlzLmxkZXZpY2VFeHRZID0gMS4wO1xufVxuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLmdldFdvcmxkT3JnWCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLmx3b3JsZE9yZ1g7XG59XG5cblRyYW5zZm9ybS5wcm90b3R5cGUuc2V0V29ybGRPcmdYID0gZnVuY3Rpb24gKHdveClcbntcbiAgdGhpcy5sd29ybGRPcmdYID0gd294O1xufVxuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLmdldFdvcmxkT3JnWSA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLmx3b3JsZE9yZ1k7XG59XG5cblRyYW5zZm9ybS5wcm90b3R5cGUuc2V0V29ybGRPcmdZID0gZnVuY3Rpb24gKHdveSlcbntcbiAgdGhpcy5sd29ybGRPcmdZID0gd295O1xufVxuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLmdldFdvcmxkRXh0WCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLmx3b3JsZEV4dFg7XG59XG5cblRyYW5zZm9ybS5wcm90b3R5cGUuc2V0V29ybGRFeHRYID0gZnVuY3Rpb24gKHdleClcbntcbiAgdGhpcy5sd29ybGRFeHRYID0gd2V4O1xufVxuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLmdldFdvcmxkRXh0WSA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLmx3b3JsZEV4dFk7XG59XG5cblRyYW5zZm9ybS5wcm90b3R5cGUuc2V0V29ybGRFeHRZID0gZnVuY3Rpb24gKHdleSlcbntcbiAgdGhpcy5sd29ybGRFeHRZID0gd2V5O1xufVxuXG4vKiBEZXZpY2UgcmVsYXRlZCAqL1xuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLmdldERldmljZU9yZ1ggPSBmdW5jdGlvbiAoKVxue1xuICByZXR1cm4gdGhpcy5sZGV2aWNlT3JnWDtcbn1cblxuVHJhbnNmb3JtLnByb3RvdHlwZS5zZXREZXZpY2VPcmdYID0gZnVuY3Rpb24gKGRveClcbntcbiAgdGhpcy5sZGV2aWNlT3JnWCA9IGRveDtcbn1cblxuVHJhbnNmb3JtLnByb3RvdHlwZS5nZXREZXZpY2VPcmdZID0gZnVuY3Rpb24gKClcbntcbiAgcmV0dXJuIHRoaXMubGRldmljZU9yZ1k7XG59XG5cblRyYW5zZm9ybS5wcm90b3R5cGUuc2V0RGV2aWNlT3JnWSA9IGZ1bmN0aW9uIChkb3kpXG57XG4gIHRoaXMubGRldmljZU9yZ1kgPSBkb3k7XG59XG5cblRyYW5zZm9ybS5wcm90b3R5cGUuZ2V0RGV2aWNlRXh0WCA9IGZ1bmN0aW9uICgpXG57XG4gIHJldHVybiB0aGlzLmxkZXZpY2VFeHRYO1xufVxuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLnNldERldmljZUV4dFggPSBmdW5jdGlvbiAoZGV4KVxue1xuICB0aGlzLmxkZXZpY2VFeHRYID0gZGV4O1xufVxuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLmdldERldmljZUV4dFkgPSBmdW5jdGlvbiAoKVxue1xuICByZXR1cm4gdGhpcy5sZGV2aWNlRXh0WTtcbn1cblxuVHJhbnNmb3JtLnByb3RvdHlwZS5zZXREZXZpY2VFeHRZID0gZnVuY3Rpb24gKGRleSlcbntcbiAgdGhpcy5sZGV2aWNlRXh0WSA9IGRleTtcbn1cblxuVHJhbnNmb3JtLnByb3RvdHlwZS50cmFuc2Zvcm1YID0gZnVuY3Rpb24gKHgpXG57XG4gIHZhciB4RGV2aWNlID0gMC4wO1xuICB2YXIgd29ybGRFeHRYID0gdGhpcy5sd29ybGRFeHRYO1xuICBpZiAod29ybGRFeHRYICE9IDAuMClcbiAge1xuICAgIHhEZXZpY2UgPSB0aGlzLmxkZXZpY2VPcmdYICtcbiAgICAgICAgICAgICgoeCAtIHRoaXMubHdvcmxkT3JnWCkgKiB0aGlzLmxkZXZpY2VFeHRYIC8gd29ybGRFeHRYKTtcbiAgfVxuXG4gIHJldHVybiB4RGV2aWNlO1xufVxuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLnRyYW5zZm9ybVkgPSBmdW5jdGlvbiAoeSlcbntcbiAgdmFyIHlEZXZpY2UgPSAwLjA7XG4gIHZhciB3b3JsZEV4dFkgPSB0aGlzLmx3b3JsZEV4dFk7XG4gIGlmICh3b3JsZEV4dFkgIT0gMC4wKVxuICB7XG4gICAgeURldmljZSA9IHRoaXMubGRldmljZU9yZ1kgK1xuICAgICAgICAgICAgKCh5IC0gdGhpcy5sd29ybGRPcmdZKSAqIHRoaXMubGRldmljZUV4dFkgLyB3b3JsZEV4dFkpO1xuICB9XG5cblxuICByZXR1cm4geURldmljZTtcbn1cblxuVHJhbnNmb3JtLnByb3RvdHlwZS5pbnZlcnNlVHJhbnNmb3JtWCA9IGZ1bmN0aW9uICh4KVxue1xuICB2YXIgeFdvcmxkID0gMC4wO1xuICB2YXIgZGV2aWNlRXh0WCA9IHRoaXMubGRldmljZUV4dFg7XG4gIGlmIChkZXZpY2VFeHRYICE9IDAuMClcbiAge1xuICAgIHhXb3JsZCA9IHRoaXMubHdvcmxkT3JnWCArXG4gICAgICAgICAgICAoKHggLSB0aGlzLmxkZXZpY2VPcmdYKSAqIHRoaXMubHdvcmxkRXh0WCAvIGRldmljZUV4dFgpO1xuICB9XG5cblxuICByZXR1cm4geFdvcmxkO1xufVxuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLmludmVyc2VUcmFuc2Zvcm1ZID0gZnVuY3Rpb24gKHkpXG57XG4gIHZhciB5V29ybGQgPSAwLjA7XG4gIHZhciBkZXZpY2VFeHRZID0gdGhpcy5sZGV2aWNlRXh0WTtcbiAgaWYgKGRldmljZUV4dFkgIT0gMC4wKVxuICB7XG4gICAgeVdvcmxkID0gdGhpcy5sd29ybGRPcmdZICtcbiAgICAgICAgICAgICgoeSAtIHRoaXMubGRldmljZU9yZ1kpICogdGhpcy5sd29ybGRFeHRZIC8gZGV2aWNlRXh0WSk7XG4gIH1cbiAgcmV0dXJuIHlXb3JsZDtcbn1cblxuVHJhbnNmb3JtLnByb3RvdHlwZS5pbnZlcnNlVHJhbnNmb3JtUG9pbnQgPSBmdW5jdGlvbiAoaW5Qb2ludClcbntcbiAgdmFyIG91dFBvaW50ID1cbiAgICAgICAgICBuZXcgUG9pbnREKHRoaXMuaW52ZXJzZVRyYW5zZm9ybVgoaW5Qb2ludC54KSxcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW52ZXJzZVRyYW5zZm9ybVkoaW5Qb2ludC55KSk7XG4gIHJldHVybiBvdXRQb2ludDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2Zvcm07XG4iLCJmdW5jdGlvbiBVbmlxdWVJREdlbmVyZXRvcigpIHtcbn1cblxuVW5pcXVlSURHZW5lcmV0b3IubGFzdElEID0gMDtcblxuVW5pcXVlSURHZW5lcmV0b3IuY3JlYXRlSUQgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGlmIChVbmlxdWVJREdlbmVyZXRvci5pc1ByaW1pdGl2ZShvYmopKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBpZiAob2JqLnVuaXF1ZUlEICE9IG51bGwpIHtcbiAgICByZXR1cm4gb2JqLnVuaXF1ZUlEO1xuICB9XG4gIG9iai51bmlxdWVJRCA9IFVuaXF1ZUlER2VuZXJldG9yLmdldFN0cmluZygpO1xuICBVbmlxdWVJREdlbmVyZXRvci5sYXN0SUQrKztcbiAgcmV0dXJuIG9iai51bmlxdWVJRDtcbn1cblxuVW5pcXVlSURHZW5lcmV0b3IuZ2V0U3RyaW5nID0gZnVuY3Rpb24gKGlkKSB7XG4gIGlmIChpZCA9PSBudWxsKVxuICAgIGlkID0gVW5pcXVlSURHZW5lcmV0b3IubGFzdElEO1xuICByZXR1cm4gXCJPYmplY3QjXCIgKyBpZCArIFwiXCI7XG59XG5cblVuaXF1ZUlER2VuZXJldG9yLmlzUHJpbWl0aXZlID0gZnVuY3Rpb24gKGFyZykge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBhcmc7XG4gIHJldHVybiBhcmcgPT0gbnVsbCB8fCAodHlwZSAhPSBcIm9iamVjdFwiICYmIHR5cGUgIT0gXCJmdW5jdGlvblwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVbmlxdWVJREdlbmVyZXRvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIERpbWVuc2lvbkQgPSByZXF1aXJlKCcuL0RpbWVuc2lvbkQnKTtcbnZhciBIYXNoTWFwID0gcmVxdWlyZSgnLi9IYXNoTWFwJyk7XG52YXIgSGFzaFNldCA9IHJlcXVpcmUoJy4vSGFzaFNldCcpO1xudmFyIElHZW9tZXRyeSA9IHJlcXVpcmUoJy4vSUdlb21ldHJ5Jyk7XG52YXIgSU1hdGggPSByZXF1aXJlKCcuL0lNYXRoJyk7XG52YXIgSW50ZWdlciA9IHJlcXVpcmUoJy4vSW50ZWdlcicpO1xudmFyIFBvaW50ID0gcmVxdWlyZSgnLi9Qb2ludCcpO1xudmFyIFBvaW50RCA9IHJlcXVpcmUoJy4vUG9pbnREJyk7XG52YXIgUmFuZG9tU2VlZCA9IHJlcXVpcmUoJy4vUmFuZG9tU2VlZCcpO1xudmFyIFJlY3RhbmdsZUQgPSByZXF1aXJlKCcuL1JlY3RhbmdsZUQnKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuL1RyYW5zZm9ybScpO1xudmFyIFVuaXF1ZUlER2VuZXJldG9yID0gcmVxdWlyZSgnLi9VbmlxdWVJREdlbmVyZXRvcicpO1xudmFyIExHcmFwaE9iamVjdCA9IHJlcXVpcmUoJy4vTEdyYXBoT2JqZWN0Jyk7XG52YXIgTEdyYXBoID0gcmVxdWlyZSgnLi9MR3JhcGgnKTtcbnZhciBMRWRnZSA9IHJlcXVpcmUoJy4vTEVkZ2UnKTtcbnZhciBMR3JhcGhNYW5hZ2VyID0gcmVxdWlyZSgnLi9MR3JhcGhNYW5hZ2VyJyk7XG52YXIgTE5vZGUgPSByZXF1aXJlKCcuL0xOb2RlJyk7XG52YXIgTGF5b3V0ID0gcmVxdWlyZSgnLi9MYXlvdXQnKTtcbnZhciBMYXlvdXRDb25zdGFudHMgPSByZXF1aXJlKCcuL0xheW91dENvbnN0YW50cycpO1xudmFyIEZETGF5b3V0ID0gcmVxdWlyZSgnLi9GRExheW91dCcpO1xudmFyIEZETGF5b3V0Q29uc3RhbnRzID0gcmVxdWlyZSgnLi9GRExheW91dENvbnN0YW50cycpO1xudmFyIEZETGF5b3V0RWRnZSA9IHJlcXVpcmUoJy4vRkRMYXlvdXRFZGdlJyk7XG52YXIgRkRMYXlvdXROb2RlID0gcmVxdWlyZSgnLi9GRExheW91dE5vZGUnKTtcbnZhciBDb1NFQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9Db1NFQ29uc3RhbnRzJyk7XG52YXIgQ29TRUVkZ2UgPSByZXF1aXJlKCcuL0NvU0VFZGdlJyk7XG52YXIgQ29TRUdyYXBoID0gcmVxdWlyZSgnLi9Db1NFR3JhcGgnKTtcbnZhciBDb1NFR3JhcGhNYW5hZ2VyID0gcmVxdWlyZSgnLi9Db1NFR3JhcGhNYW5hZ2VyJyk7XG52YXIgQ29TRUxheW91dCA9IHJlcXVpcmUoJy4vQ29TRUxheW91dCcpO1xudmFyIENvU0VOb2RlID0gcmVxdWlyZSgnLi9Db1NFTm9kZScpO1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gIC8vIENhbGxlZCBvbiBgbGF5b3V0cmVhZHlgXG4gIHJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gIH0sXG4gIC8vIENhbGxlZCBvbiBgbGF5b3V0c3RvcGBcbiAgc3RvcDogZnVuY3Rpb24gKCkge1xuICB9LFxuICAvLyBpbmNsdWRlIGxhYmVscyBpbiBub2RlIGRpbWVuc2lvbnNcbiAgbm9kZURpbWVuc2lvbnNJbmNsdWRlTGFiZWxzOiBmYWxzZSxcbiAgLy8gbnVtYmVyIG9mIHRpY2tzIHBlciBmcmFtZTsgaGlnaGVyIGlzIGZhc3RlciBidXQgbW9yZSBqZXJreVxuICByZWZyZXNoOiAzMCxcbiAgLy8gV2hldGhlciB0byBmaXQgdGhlIG5ldHdvcmsgdmlldyBhZnRlciB3aGVuIGRvbmVcbiAgZml0OiB0cnVlLFxuICAvLyBQYWRkaW5nIG9uIGZpdFxuICBwYWRkaW5nOiAxMCxcbiAgLy8gV2hldGhlciB0byBlbmFibGUgaW5jcmVtZW50YWwgbW9kZVxuICByYW5kb21pemU6IHRydWUsXG4gIC8vIE5vZGUgcmVwdWxzaW9uIChub24gb3ZlcmxhcHBpbmcpIG11bHRpcGxpZXJcbiAgbm9kZVJlcHVsc2lvbjogNDUwMCxcbiAgLy8gSWRlYWwgZWRnZSAobm9uIG5lc3RlZCkgbGVuZ3RoXG4gIGlkZWFsRWRnZUxlbmd0aDogNTAsXG4gIC8vIERpdmlzb3IgdG8gY29tcHV0ZSBlZGdlIGZvcmNlc1xuICBlZGdlRWxhc3RpY2l0eTogMC40NSxcbiAgLy8gTmVzdGluZyBmYWN0b3IgKG11bHRpcGxpZXIpIHRvIGNvbXB1dGUgaWRlYWwgZWRnZSBsZW5ndGggZm9yIG5lc3RlZCBlZGdlc1xuICBuZXN0aW5nRmFjdG9yOiAwLjEsXG4gIC8vIEdyYXZpdHkgZm9yY2UgKGNvbnN0YW50KVxuICBncmF2aXR5OiAwLjI1LFxuICAvLyBNYXhpbXVtIG51bWJlciBvZiBpdGVyYXRpb25zIHRvIHBlcmZvcm1cbiAgbnVtSXRlcjogMjUwMCxcbiAgLy8gRm9yIGVuYWJsaW5nIHRpbGluZ1xuICB0aWxlOiB0cnVlLFxuICAvLyBUeXBlIG9mIGxheW91dCBhbmltYXRpb24uIFRoZSBvcHRpb24gc2V0IGlzIHsnZHVyaW5nJywgJ2VuZCcsIGZhbHNlfVxuICBhbmltYXRlOiAnZW5kJyxcbiAgLy8gRHVyYXRpb24gZm9yIGFuaW1hdGU6ZW5kXG4gIGFuaW1hdGlvbkR1cmF0aW9uOiA1MDAsXG4gIC8vIFJlcHJlc2VudHMgdGhlIGFtb3VudCBvZiB0aGUgdmVydGljYWwgc3BhY2UgdG8gcHV0IGJldHdlZW4gdGhlIHplcm8gZGVncmVlIG1lbWJlcnMgZHVyaW5nIHRoZSB0aWxpbmcgb3BlcmF0aW9uKGNhbiBhbHNvIGJlIGEgZnVuY3Rpb24pXG4gIHRpbGluZ1BhZGRpbmdWZXJ0aWNhbDogMTAsXG4gIC8vIFJlcHJlc2VudHMgdGhlIGFtb3VudCBvZiB0aGUgaG9yaXpvbnRhbCBzcGFjZSB0byBwdXQgYmV0d2VlbiB0aGUgemVybyBkZWdyZWUgbWVtYmVycyBkdXJpbmcgdGhlIHRpbGluZyBvcGVyYXRpb24oY2FuIGFsc28gYmUgYSBmdW5jdGlvbilcbiAgdGlsaW5nUGFkZGluZ0hvcml6b250YWw6IDEwLFxuICAvLyBHcmF2aXR5IHJhbmdlIChjb25zdGFudCkgZm9yIGNvbXBvdW5kc1xuICBncmF2aXR5UmFuZ2VDb21wb3VuZDogMS41LFxuICAvLyBHcmF2aXR5IGZvcmNlIChjb25zdGFudCkgZm9yIGNvbXBvdW5kc1xuICBncmF2aXR5Q29tcG91bmQ6IDEuMCxcbiAgLy8gR3Jhdml0eSByYW5nZSAoY29uc3RhbnQpXG4gIGdyYXZpdHlSYW5nZTogMy44LFxuICAvLyBJbml0aWFsIGNvb2xpbmcgZmFjdG9yIGZvciBpbmNyZW1lbnRhbCBsYXlvdXRcbiAgaW5pdGlhbEVuZXJneU9uSW5jcmVtZW50YWw6IDAuNVxufTtcblxuZnVuY3Rpb24gZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKSB7XG4gIHZhciBvYmogPSB7fTtcblxuICBmb3IgKHZhciBpIGluIGRlZmF1bHRzKSB7XG4gICAgb2JqW2ldID0gZGVmYXVsdHNbaV07XG4gIH1cblxuICBmb3IgKHZhciBpIGluIG9wdGlvbnMpIHtcbiAgICBvYmpbaV0gPSBvcHRpb25zW2ldO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbmZ1bmN0aW9uIF9Db1NFTGF5b3V0KF9vcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IGV4dGVuZChkZWZhdWx0cywgX29wdGlvbnMpO1xuICBnZXRVc2VyT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xufVxuXG52YXIgZ2V0VXNlck9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBpZiAob3B0aW9ucy5ub2RlUmVwdWxzaW9uICE9IG51bGwpXG4gICAgQ29TRUNvbnN0YW50cy5ERUZBVUxUX1JFUFVMU0lPTl9TVFJFTkdUSCA9IEZETGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfUkVQVUxTSU9OX1NUUkVOR1RIID0gb3B0aW9ucy5ub2RlUmVwdWxzaW9uO1xuICBpZiAob3B0aW9ucy5pZGVhbEVkZ2VMZW5ndGggIT0gbnVsbClcbiAgICBDb1NFQ29uc3RhbnRzLkRFRkFVTFRfRURHRV9MRU5HVEggPSBGRExheW91dENvbnN0YW50cy5ERUZBVUxUX0VER0VfTEVOR1RIID0gb3B0aW9ucy5pZGVhbEVkZ2VMZW5ndGg7XG4gIGlmIChvcHRpb25zLmVkZ2VFbGFzdGljaXR5ICE9IG51bGwpXG4gICAgQ29TRUNvbnN0YW50cy5ERUZBVUxUX1NQUklOR19TVFJFTkdUSCA9IEZETGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfU1BSSU5HX1NUUkVOR1RIID0gb3B0aW9ucy5lZGdlRWxhc3RpY2l0eTtcbiAgaWYgKG9wdGlvbnMubmVzdGluZ0ZhY3RvciAhPSBudWxsKVxuICAgIENvU0VDb25zdGFudHMuUEVSX0xFVkVMX0lERUFMX0VER0VfTEVOR1RIX0ZBQ1RPUiA9IEZETGF5b3V0Q29uc3RhbnRzLlBFUl9MRVZFTF9JREVBTF9FREdFX0xFTkdUSF9GQUNUT1IgPSBvcHRpb25zLm5lc3RpbmdGYWN0b3I7XG4gIGlmIChvcHRpb25zLmdyYXZpdHkgIT0gbnVsbClcbiAgICBDb1NFQ29uc3RhbnRzLkRFRkFVTFRfR1JBVklUWV9TVFJFTkdUSCA9IEZETGF5b3V0Q29uc3RhbnRzLkRFRkFVTFRfR1JBVklUWV9TVFJFTkdUSCA9IG9wdGlvbnMuZ3Jhdml0eTtcbiAgaWYgKG9wdGlvbnMubnVtSXRlciAhPSBudWxsKVxuICAgIENvU0VDb25zdGFudHMuTUFYX0lURVJBVElPTlMgPSBGRExheW91dENvbnN0YW50cy5NQVhfSVRFUkFUSU9OUyA9IG9wdGlvbnMubnVtSXRlcjtcbiAgaWYgKG9wdGlvbnMuZ3Jhdml0eVJhbmdlICE9IG51bGwpXG4gICAgQ29TRUNvbnN0YW50cy5ERUZBVUxUX0dSQVZJVFlfUkFOR0VfRkFDVE9SID0gRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9HUkFWSVRZX1JBTkdFX0ZBQ1RPUiA9IG9wdGlvbnMuZ3Jhdml0eVJhbmdlO1xuICBpZihvcHRpb25zLmdyYXZpdHlDb21wb3VuZCAhPSBudWxsKVxuICAgIENvU0VDb25zdGFudHMuREVGQVVMVF9DT01QT1VORF9HUkFWSVRZX1NUUkVOR1RIID0gRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9DT01QT1VORF9HUkFWSVRZX1NUUkVOR1RIID0gb3B0aW9ucy5ncmF2aXR5Q29tcG91bmQ7XG4gIGlmKG9wdGlvbnMuZ3Jhdml0eVJhbmdlQ29tcG91bmQgIT0gbnVsbClcbiAgICBDb1NFQ29uc3RhbnRzLkRFRkFVTFRfQ09NUE9VTkRfR1JBVklUWV9SQU5HRV9GQUNUT1IgPSBGRExheW91dENvbnN0YW50cy5ERUZBVUxUX0NPTVBPVU5EX0dSQVZJVFlfUkFOR0VfRkFDVE9SID0gb3B0aW9ucy5ncmF2aXR5UmFuZ2VDb21wb3VuZDtcbiAgaWYgKG9wdGlvbnMuaW5pdGlhbEVuZXJneU9uSW5jcmVtZW50YWwgIT0gbnVsbClcbiAgICBDb1NFQ29uc3RhbnRzLkRFRkFVTFRfQ09PTElOR19GQUNUT1JfSU5DUkVNRU5UQUwgPSBGRExheW91dENvbnN0YW50cy5ERUZBVUxUX0NPT0xJTkdfRkFDVE9SX0lOQ1JFTUVOVEFMID0gb3B0aW9ucy5pbml0aWFsRW5lcmd5T25JbmNyZW1lbnRhbDtcblxuICBDb1NFQ29uc3RhbnRzLk5PREVfRElNRU5TSU9OU19JTkNMVURFX0xBQkVMUyA9IEZETGF5b3V0Q29uc3RhbnRzLk5PREVfRElNRU5TSU9OU19JTkNMVURFX0xBQkVMUyA9IExheW91dENvbnN0YW50cy5OT0RFX0RJTUVOU0lPTlNfSU5DTFVERV9MQUJFTFMgPSBvcHRpb25zLm5vZGVEaW1lbnNpb25zSW5jbHVkZUxhYmVscztcbiAgQ29TRUNvbnN0YW50cy5ERUZBVUxUX0lOQ1JFTUVOVEFMID0gRkRMYXlvdXRDb25zdGFudHMuREVGQVVMVF9JTkNSRU1FTlRBTCA9IExheW91dENvbnN0YW50cy5ERUZBVUxUX0lOQ1JFTUVOVEFMID1cbiAgICAgICAgICAhKG9wdGlvbnMucmFuZG9taXplKTtcbiAgQ29TRUNvbnN0YW50cy5BTklNQVRFID0gRkRMYXlvdXRDb25zdGFudHMuQU5JTUFURSA9IExheW91dENvbnN0YW50cy5BTklNQVRFID0gb3B0aW9ucy5hbmltYXRlO1xuICBDb1NFQ29uc3RhbnRzLlRJTEUgPSBvcHRpb25zLnRpbGU7XG4gIENvU0VDb25zdGFudHMuVElMSU5HX1BBRERJTkdfVkVSVElDQUwgPSBcbiAgICAgICAgICB0eXBlb2Ygb3B0aW9ucy50aWxpbmdQYWRkaW5nVmVydGljYWwgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLnRpbGluZ1BhZGRpbmdWZXJ0aWNhbC5jYWxsKCkgOiBvcHRpb25zLnRpbGluZ1BhZGRpbmdWZXJ0aWNhbDtcbiAgQ29TRUNvbnN0YW50cy5USUxJTkdfUEFERElOR19IT1JJWk9OVEFMID0gXG4gICAgICAgICAgdHlwZW9mIG9wdGlvbnMudGlsaW5nUGFkZGluZ0hvcml6b250YWwgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLnRpbGluZ1BhZGRpbmdIb3Jpem9udGFsLmNhbGwoKSA6IG9wdGlvbnMudGlsaW5nUGFkZGluZ0hvcml6b250YWw7XG59O1xuXG5fQ29TRUxheW91dC5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcmVhZHk7XG4gIHZhciBmcmFtZUlkO1xuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgdmFyIGlkVG9MTm9kZSA9IHRoaXMuaWRUb0xOb2RlID0ge307XG4gIHZhciBsYXlvdXQgPSB0aGlzLmxheW91dCA9IG5ldyBDb1NFTGF5b3V0KCk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgXG4gIHNlbGYuc3RvcHBlZCA9IGZhbHNlO1xuXG4gIHRoaXMuY3kgPSB0aGlzLm9wdGlvbnMuY3k7XG5cbiAgdGhpcy5jeS50cmlnZ2VyKHsgdHlwZTogJ2xheW91dHN0YXJ0JywgbGF5b3V0OiB0aGlzIH0pO1xuXG4gIHZhciBnbSA9IGxheW91dC5uZXdHcmFwaE1hbmFnZXIoKTtcbiAgdGhpcy5nbSA9IGdtO1xuXG4gIHZhciBub2RlcyA9IHRoaXMub3B0aW9ucy5lbGVzLm5vZGVzKCk7XG4gIHZhciBlZGdlcyA9IHRoaXMub3B0aW9ucy5lbGVzLmVkZ2VzKCk7XG5cbiAgdGhpcy5yb290ID0gZ20uYWRkUm9vdCgpO1xuICB0aGlzLnByb2Nlc3NDaGlsZHJlbkxpc3QodGhpcy5yb290LCB0aGlzLmdldFRvcE1vc3ROb2Rlcyhub2RlcyksIGxheW91dCk7XG5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVkZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGVkZ2UgPSBlZGdlc1tpXTtcbiAgICB2YXIgc291cmNlTm9kZSA9IHRoaXMuaWRUb0xOb2RlW2VkZ2UuZGF0YShcInNvdXJjZVwiKV07XG4gICAgdmFyIHRhcmdldE5vZGUgPSB0aGlzLmlkVG9MTm9kZVtlZGdlLmRhdGEoXCJ0YXJnZXRcIildO1xuICAgIGlmKHNvdXJjZU5vZGUuZ2V0RWRnZXNCZXR3ZWVuKHRhcmdldE5vZGUpLmxlbmd0aCA9PSAwKXtcbiAgICAgIHZhciBlMSA9IGdtLmFkZChsYXlvdXQubmV3RWRnZSgpLCBzb3VyY2VOb2RlLCB0YXJnZXROb2RlKTtcbiAgICAgIGUxLmlkID0gZWRnZS5pZCgpO1xuICAgIH1cbiAgfVxuICBcbiAgIHZhciBnZXRQb3NpdGlvbnMgPSBmdW5jdGlvbihlbGUsIGkpe1xuICAgIGlmKHR5cGVvZiBlbGUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGVsZSA9IGk7XG4gICAgfVxuICAgIHZhciB0aGVJZCA9IGVsZS5kYXRhKCdpZCcpO1xuICAgIHZhciBsTm9kZSA9IHNlbGYuaWRUb0xOb2RlW3RoZUlkXTtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiBsTm9kZS5nZXRSZWN0KCkuZ2V0Q2VudGVyWCgpLFxuICAgICAgeTogbE5vZGUuZ2V0UmVjdCgpLmdldENlbnRlclkoKVxuICAgIH07XG4gIH07XG4gIFxuICAvKlxuICAgKiBSZXBvc2l0aW9uIG5vZGVzIGluIGl0ZXJhdGlvbnMgYW5pbWF0ZWRseVxuICAgKi9cbiAgdmFyIGl0ZXJhdGVBbmltYXRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBUaGlncyB0byBwZXJmb3JtIGFmdGVyIG5vZGVzIGFyZSByZXBvc2l0aW9uZWQgb24gc2NyZWVuXG4gICAgdmFyIGFmdGVyUmVwb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKG9wdGlvbnMuZml0KSB7XG4gICAgICAgIG9wdGlvbnMuY3kuZml0KG9wdGlvbnMuZWxlcy5ub2RlcygpLCBvcHRpb25zLnBhZGRpbmcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJlYWR5KSB7XG4gICAgICAgIHJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5jeS5vbmUoJ2xheW91dHJlYWR5Jywgb3B0aW9ucy5yZWFkeSk7XG4gICAgICAgIHNlbGYuY3kudHJpZ2dlcih7dHlwZTogJ2xheW91dHJlYWR5JywgbGF5b3V0OiBzZWxmfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB2YXIgdGlja3NQZXJGcmFtZSA9IHNlbGYub3B0aW9ucy5yZWZyZXNoO1xuICAgIHZhciBpc0RvbmU7XG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRpY2tzUGVyRnJhbWUgJiYgIWlzRG9uZTsgaSsrICl7XG4gICAgICBpc0RvbmUgPSBzZWxmLnN0b3BwZWQgfHwgc2VsZi5sYXlvdXQudGljaygpO1xuICAgIH1cbiAgICBcbiAgICAvLyBJZiBsYXlvdXQgaXMgZG9uZVxuICAgIGlmIChpc0RvbmUpIHtcbiAgICAgIC8vIElmIHRoZSBsYXlvdXQgaXMgbm90IGEgc3VibGF5b3V0IGFuZCBpdCBpcyBzdWNjZXNzZnVsIHBlcmZvcm0gcG9zdCBsYXlvdXQuXG4gICAgICBpZiAobGF5b3V0LmNoZWNrTGF5b3V0U3VjY2VzcygpICYmICFsYXlvdXQuaXNTdWJMYXlvdXQpIHtcbiAgICAgICAgbGF5b3V0LmRvUG9zdExheW91dCgpO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBJZiBsYXlvdXQgaGFzIGEgdGlsaW5nUG9zdExheW91dCBmdW5jdGlvbiBwcm9wZXJ0eSBjYWxsIGl0LlxuICAgICAgaWYgKGxheW91dC50aWxpbmdQb3N0TGF5b3V0KSB7XG4gICAgICAgIGxheW91dC50aWxpbmdQb3N0TGF5b3V0KCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGxheW91dC5pc0xheW91dEZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgIFxuICAgICAgc2VsZi5vcHRpb25zLmVsZXMubm9kZXMoKS5wb3NpdGlvbnMoZ2V0UG9zaXRpb25zKTtcbiAgICAgIFxuICAgICAgYWZ0ZXJSZXBvc2l0aW9uKCk7XG4gICAgICBcbiAgICAgIC8vIHRyaWdnZXIgbGF5b3V0c3RvcCB3aGVuIHRoZSBsYXlvdXQgc3RvcHMgKGUuZy4gZmluaXNoZXMpXG4gICAgICBzZWxmLmN5Lm9uZSgnbGF5b3V0c3RvcCcsIHNlbGYub3B0aW9ucy5zdG9wKTtcbiAgICAgIHNlbGYuY3kudHJpZ2dlcih7IHR5cGU6ICdsYXlvdXRzdG9wJywgbGF5b3V0OiBzZWxmIH0pO1xuXG4gICAgICBpZiAoZnJhbWVJZCkge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShmcmFtZUlkKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgcmVhZHkgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgdmFyIGFuaW1hdGlvbkRhdGEgPSBzZWxmLmxheW91dC5nZXRQb3NpdGlvbnNEYXRhKCk7IC8vIEdldCBwb3NpdGlvbnMgb2YgbGF5b3V0IG5vZGVzIG5vdGUgdGhhdCBhbGwgbm9kZXMgbWF5IG5vdCBiZSBsYXlvdXQgbm9kZXMgYmVjYXVzZSBvZiB0aWxpbmdcbiAgICBcbiAgICAvLyBQb3NpdGlvbiBub2RlcywgZm9yIHRoZSBub2RlcyB3aG9zZSBpZCBkb2VzIG5vdCBpbmNsdWRlZCBpbiBkYXRhIChiZWNhdXNlIHRoZXkgYXJlIHJlbW92ZWQgZnJvbSB0aGVpciBwYXJlbnRzIGFuZCBpbmNsdWRlZCBpbiBkdW1teSBjb21wb3VuZHMpXG4gICAgLy8gdXNlIHBvc2l0aW9uIG9mIHRoZWlyIGFuY2VzdG9ycyBvciBkdW1teSBhbmNlc3RvcnNcbiAgICBvcHRpb25zLmVsZXMubm9kZXMoKS5wb3NpdGlvbnMoZnVuY3Rpb24gKGVsZSwgaSkge1xuICAgICAgaWYgKHR5cGVvZiBlbGUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgZWxlID0gaTtcbiAgICAgIH1cbiAgICAgIHZhciB0aGVJZCA9IGVsZS5pZCgpO1xuICAgICAgdmFyIHBOb2RlID0gYW5pbWF0aW9uRGF0YVt0aGVJZF07XG4gICAgICB2YXIgdGVtcCA9IGVsZTtcbiAgICAgIC8vIElmIHBOb2RlIGlzIHVuZGVmaW5lZCBzZWFyY2ggdW50aWwgZmluZGluZyBwb3NpdGlvbiBkYXRhIG9mIGl0cyBmaXJzdCBhbmNlc3RvciAoSXQgbWF5IGJlIGR1bW15IGFzIHdlbGwpXG4gICAgICB3aGlsZSAocE5vZGUgPT0gbnVsbCkge1xuICAgICAgICBwTm9kZSA9IGFuaW1hdGlvbkRhdGFbdGVtcC5kYXRhKCdwYXJlbnQnKV0gfHwgYW5pbWF0aW9uRGF0YVsnRHVtbXlDb21wb3VuZF8nICsgdGVtcC5kYXRhKCdwYXJlbnQnKV07XG4gICAgICAgIGFuaW1hdGlvbkRhdGFbdGhlSWRdID0gcE5vZGU7XG4gICAgICAgIHRlbXAgPSB0ZW1wLnBhcmVudCgpWzBdO1xuICAgICAgICBpZih0ZW1wID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKHBOb2RlICE9IG51bGwpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHBOb2RlLngsXG4gICAgICAgICAgeTogcE5vZGUueVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiBlbGUueCxcbiAgICAgICAgICB5OiBlbGUueVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWZ0ZXJSZXBvc2l0aW9uKCk7XG5cbiAgICBmcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGl0ZXJhdGVBbmltYXRlZCk7XG4gIH07XG4gIFxuICAvKlxuICAqIExpc3RlbiAnbGF5b3V0c3RhcnRlZCcgZXZlbnQgYW5kIHN0YXJ0IGFuaW1hdGVkIGl0ZXJhdGlvbiBpZiBhbmltYXRlIG9wdGlvbiBpcyAnZHVyaW5nJ1xuICAqL1xuICBsYXlvdXQuYWRkTGlzdGVuZXIoJ2xheW91dHN0YXJ0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHNlbGYub3B0aW9ucy5hbmltYXRlID09PSAnZHVyaW5nJykge1xuICAgICAgZnJhbWVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShpdGVyYXRlQW5pbWF0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIFxuICBsYXlvdXQucnVuTGF5b3V0KCk7IC8vIFJ1biBjb3NlIGxheW91dFxuICBcbiAgLypcbiAgICogSWYgYW5pbWF0ZSBvcHRpb24gaXMgbm90ICdkdXJpbmcnICgnZW5kJyBvciBmYWxzZSkgcGVyZm9ybSB0aGVzZSBoZXJlIChJZiBpdCBpcyAnZHVyaW5nJyBzaW1pbGFyIHRoaW5ncyBhcmUgYWxyZWFkeSBwZXJmb3JtZWQpXG4gICAqL1xuICBpZih0aGlzLm9wdGlvbnMuYW5pbWF0ZSAhPT0gXCJkdXJpbmdcIil7XG4gICAgc2VsZi5vcHRpb25zLmVsZXMubm9kZXMoKS5ub3QoXCI6cGFyZW50XCIpLmxheW91dFBvc2l0aW9ucyhzZWxmLCBzZWxmLm9wdGlvbnMsIGdldFBvc2l0aW9ucyk7IC8vIFVzZSBsYXlvdXQgcG9zaXRpb25zIHRvIHJlcG9zaXRpb24gdGhlIG5vZGVzIGl0IGNvbnNpZGVycyB0aGUgb3B0aW9ucyBwYXJhbWV0ZXJcbiAgICByZWFkeSA9IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7IC8vIGNoYWluaW5nXG59O1xuXG4vL0dldCB0aGUgdG9wIG1vc3Qgb25lcyBvZiBhIGxpc3Qgb2Ygbm9kZXNcbl9Db1NFTGF5b3V0LnByb3RvdHlwZS5nZXRUb3BNb3N0Tm9kZXMgPSBmdW5jdGlvbihub2Rlcykge1xuICB2YXIgbm9kZXNNYXAgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbm9kZXNNYXBbbm9kZXNbaV0uaWQoKV0gPSB0cnVlO1xuICB9XG4gIHZhciByb290cyA9IG5vZGVzLmZpbHRlcihmdW5jdGlvbiAoZWxlLCBpKSB7XG4gICAgICBpZih0eXBlb2YgZWxlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIGVsZSA9IGk7XG4gICAgICB9XG4gICAgICB2YXIgcGFyZW50ID0gZWxlLnBhcmVudCgpWzBdO1xuICAgICAgd2hpbGUocGFyZW50ICE9IG51bGwpe1xuICAgICAgICBpZihub2Rlc01hcFtwYXJlbnQuaWQoKV0pe1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50KClbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJvb3RzO1xufTtcblxuX0NvU0VMYXlvdXQucHJvdG90eXBlLnByb2Nlc3NDaGlsZHJlbkxpc3QgPSBmdW5jdGlvbiAocGFyZW50LCBjaGlsZHJlbiwgbGF5b3V0KSB7XG4gIHZhciBzaXplID0gY2hpbGRyZW4ubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIHZhciB0aGVDaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgIHZhciBjaGlsZHJlbl9vZl9jaGlsZHJlbiA9IHRoZUNoaWxkLmNoaWxkcmVuKCk7XG4gICAgdmFyIHRoZU5vZGU7ICAgIFxuXG4gICAgdmFyIGRpbWVuc2lvbnMgPSB0aGVDaGlsZC5sYXlvdXREaW1lbnNpb25zKHtcbiAgICAgIG5vZGVEaW1lbnNpb25zSW5jbHVkZUxhYmVsczogdGhpcy5vcHRpb25zLm5vZGVEaW1lbnNpb25zSW5jbHVkZUxhYmVsc1xuICAgIH0pO1xuXG4gICAgaWYgKHRoZUNoaWxkLm91dGVyV2lkdGgoKSAhPSBudWxsXG4gICAgICAgICAgICAmJiB0aGVDaGlsZC5vdXRlckhlaWdodCgpICE9IG51bGwpIHtcbiAgICAgIHRoZU5vZGUgPSBwYXJlbnQuYWRkKG5ldyBDb1NFTm9kZShsYXlvdXQuZ3JhcGhNYW5hZ2VyLFxuICAgICAgICAgICAgICBuZXcgUG9pbnREKHRoZUNoaWxkLnBvc2l0aW9uKCd4JykgLSBkaW1lbnNpb25zLncgLyAyLCB0aGVDaGlsZC5wb3NpdGlvbigneScpIC0gZGltZW5zaW9ucy5oIC8gMiksXG4gICAgICAgICAgICAgIG5ldyBEaW1lbnNpb25EKHBhcnNlRmxvYXQoZGltZW5zaW9ucy53KSwgcGFyc2VGbG9hdChkaW1lbnNpb25zLmgpKSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoZU5vZGUgPSBwYXJlbnQuYWRkKG5ldyBDb1NFTm9kZSh0aGlzLmdyYXBoTWFuYWdlcikpO1xuICAgIH1cbiAgICAvLyBBdHRhY2ggaWQgdG8gdGhlIGxheW91dCBub2RlXG4gICAgdGhlTm9kZS5pZCA9IHRoZUNoaWxkLmRhdGEoXCJpZFwiKTtcbiAgICAvLyBBdHRhY2ggdGhlIHBhZGRpbmdzIG9mIGN5IG5vZGUgdG8gbGF5b3V0IG5vZGVcbiAgICB0aGVOb2RlLnBhZGRpbmdMZWZ0ID0gcGFyc2VJbnQoIHRoZUNoaWxkLmNzcygncGFkZGluZycpICk7XG4gICAgdGhlTm9kZS5wYWRkaW5nVG9wID0gcGFyc2VJbnQoIHRoZUNoaWxkLmNzcygncGFkZGluZycpICk7XG4gICAgdGhlTm9kZS5wYWRkaW5nUmlnaHQgPSBwYXJzZUludCggdGhlQ2hpbGQuY3NzKCdwYWRkaW5nJykgKTtcbiAgICB0aGVOb2RlLnBhZGRpbmdCb3R0b20gPSBwYXJzZUludCggdGhlQ2hpbGQuY3NzKCdwYWRkaW5nJykgKTtcbiAgICBcbiAgICAvL0F0dGFjaCB0aGUgbGFiZWwgcHJvcGVydGllcyB0byBjb21wb3VuZCBpZiBsYWJlbHMgd2lsbCBiZSBpbmNsdWRlZCBpbiBub2RlIGRpbWVuc2lvbnMgIFxuICAgIGlmKHRoaXMub3B0aW9ucy5ub2RlRGltZW5zaW9uc0luY2x1ZGVMYWJlbHMpe1xuICAgICAgaWYodGhlQ2hpbGQuaXNQYXJlbnQoKSl7XG4gICAgICAgICAgdmFyIGxhYmVsV2lkdGggPSB0aGVDaGlsZC5ib3VuZGluZ0JveCh7IGluY2x1ZGVMYWJlbHM6IHRydWUsIGluY2x1ZGVOb2RlczogZmFsc2UgfSkudzsgICAgICAgICAgXG4gICAgICAgICAgdmFyIGxhYmVsSGVpZ2h0ID0gdGhlQ2hpbGQuYm91bmRpbmdCb3goeyBpbmNsdWRlTGFiZWxzOiB0cnVlLCBpbmNsdWRlTm9kZXM6IGZhbHNlIH0pLmg7XG4gICAgICAgICAgdmFyIGxhYmVsUG9zID0gdGhlQ2hpbGQuY3NzKFwidGV4dC1oYWxpZ25cIik7XG4gICAgICAgICAgdGhlTm9kZS5sYWJlbFdpZHRoID0gbGFiZWxXaWR0aDtcbiAgICAgICAgICB0aGVOb2RlLmxhYmVsSGVpZ2h0ID0gbGFiZWxIZWlnaHQ7XG4gICAgICAgICAgdGhlTm9kZS5sYWJlbFBvcyA9IGxhYmVsUG9zO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBNYXAgdGhlIGxheW91dCBub2RlXG4gICAgdGhpcy5pZFRvTE5vZGVbdGhlQ2hpbGQuZGF0YShcImlkXCIpXSA9IHRoZU5vZGU7XG5cbiAgICBpZiAoaXNOYU4odGhlTm9kZS5yZWN0LngpKSB7XG4gICAgICB0aGVOb2RlLnJlY3QueCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKGlzTmFOKHRoZU5vZGUucmVjdC55KSkge1xuICAgICAgdGhlTm9kZS5yZWN0LnkgPSAwO1xuICAgIH1cblxuICAgIGlmIChjaGlsZHJlbl9vZl9jaGlsZHJlbiAhPSBudWxsICYmIGNoaWxkcmVuX29mX2NoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciB0aGVOZXdHcmFwaDtcbiAgICAgIHRoZU5ld0dyYXBoID0gbGF5b3V0LmdldEdyYXBoTWFuYWdlcigpLmFkZChsYXlvdXQubmV3R3JhcGgoKSwgdGhlTm9kZSk7XG4gICAgICB0aGlzLnByb2Nlc3NDaGlsZHJlbkxpc3QodGhlTmV3R3JhcGgsIGNoaWxkcmVuX29mX2NoaWxkcmVuLCBsYXlvdXQpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBAYnJpZWYgOiBjYWxsZWQgb24gY29udGludW91cyBsYXlvdXRzIHRvIHN0b3AgdGhlbSBiZWZvcmUgdGhleSBmaW5pc2hcbiAqL1xuX0NvU0VMYXlvdXQucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuc3RvcHBlZCA9IHRydWU7XG5cbiAgcmV0dXJuIHRoaXM7IC8vIGNoYWluaW5nXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldChjeXRvc2NhcGUpIHtcbiAgcmV0dXJuIF9Db1NFTGF5b3V0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gcmVnaXN0ZXJzIHRoZSBleHRlbnNpb24gb24gYSBjeXRvc2NhcGUgbGliIHJlZlxudmFyIGdldExheW91dCA9IHJlcXVpcmUoJy4vTGF5b3V0Jyk7XG5cbnZhciByZWdpc3RlciA9IGZ1bmN0aW9uKCBjeXRvc2NhcGUgKXtcbiAgdmFyIExheW91dCA9IGdldExheW91dCggY3l0b3NjYXBlICk7XG5cbiAgY3l0b3NjYXBlKCdsYXlvdXQnLCAnY29zZS1iaWxrZW50JywgTGF5b3V0KTtcbn07XG5cbi8vIGF1dG8gcmVnIGZvciBnbG9iYWxzXG5pZiggdHlwZW9mIGN5dG9zY2FwZSAhPT0gJ3VuZGVmaW5lZCcgKXtcbiAgcmVnaXN0ZXIoIGN5dG9zY2FwZSApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyO1xuIl19
