var deselected = document.querySelector('.deselected-tags');
var selected = document.querySelector('.selected-tags');
var copyButton = document.querySelector('.copy-button');
var clipboard = new Clipboard(copyButton);
var selectedClass = 'tag--selected';
var deselectedClass = 'tag--deselected';

var defaultSelected = [
  'art',
  'crafts',
  'etsy'
];

var defaultDeselected = [
  'beyonce',
  'blessed',
  'boss',
  'bossbitch',
  'cats',
  'classy',
  'cute',
  'decoration',
  'dogs',
  'embroidery',
  'fancy',
  'feminism',
  'feminist',
  'floral',
  'funny',
  'gangsta',
  'gift',
  'handmade',
  'hiphop',
  'hoopart',
  'hottie',
  'iger',
  'instagood',
  'love',
  'lyrics',
  'pimp',
  'pretty',
  'script',
  'shop',
  'shop',
  'swag',
  'tvshow',
  'vintage',
  'wallart',
  'yasss'
];

function addTags(toEl, list, modifier) {
  list.forEach(function(item) {
    var tag = document.createElement('button');
    var span = document.createElement('span');
    var color = Please.make_color({
      seed: item.toLowerCase(), // so colors are consistent
      value: 0.8,
      saturation: 0.5
    });

    span.textContent = '#' + item;
    tag.classList.add('tag');
    tag.style.color = color; 

    if (modifier) {
      tag.classList.add('tag--' + modifier);
    }

    tag.appendChild(span);
    toEl.appendChild(tag);
  });
}

addTags(deselected, defaultDeselected, 'deselected');
addTags(selected, defaultSelected, 'selected');
updateSelected();

function selectEl(el) {
  selected.appendChild(el);
  el.classList.remove(deselectedClass);
  el.classList.add(selectedClass);
  updateSelected();
  boop('G5');
}

function deselectEl(el) {
  deselected.insertBefore(el, deselected.firstChild);
  el.classList.remove(selectedClass);
  el.classList.add(deselectedClass);
  updateSelected();
  boop('Bb4');
}

function updateSelected() {
  updateNumSelected();
  updateCopyText();
}

function updateNumSelected() {
  var numEl = document.querySelector('.num-selected');
  var num = selected.children.length;
  numEl.textContent = num;
}

function updateCopyText() {
  var selectedTagText = selected.textContent;
  selectedTagText = selectedTagText.replace(/#/g, ' #').trim();
  copyButton.dataset.clipboardText = selectedTagText;
}

updateCopyText();

deselected.addEventListener('click', function(e) {
  var t = e.target;

  if (t.matches('.tag > *')) {
    t = t.parentElement;
  }

  if (t.matches('.tag')) {
    selectEl(t);
  }
});

selected.addEventListener('click', function(e) {
  var t = e.target;

  if (t.matches('.tag > *')) {
    t = t.parentElement;
  }

  if (t.matches('.tag')) {
    deselectEl(t);
  }
});

clipboard.on('success', function(e) {
  e.clearSelection();
  document.activeElement.blur();
  var container = document.querySelector('.selection-container');
  container.classList.remove('flash');
  window.setTimeout(function() {
    container.classList.add('flash');
  }, 0);
  charm();
});



function setupSynth() {
  window.synth = new Tone.Synth({
    oscillator: {
      type: 'sine',
      modulationFrequency: 0.2
    },
    envelope: {
      attack: 0,
      decay: 0.15,
      sustain: 0,
      release: 0.15,
    }
  }).toMaster();

  window.synth.volume.value = -10;

  Tone.Transport.start();
}

function boop(f) {
  if (!window.synth) {
    setupSynth();
  }
  window.synth.triggerAttackRelease(f, '2n');
}

function charm() {
  if (!window.synth) {
    setupSynth();
  }  
  
  var note = new Tone.Sequence(function(time, pitch){
    window.synth.triggerAttackRelease(pitch, time);
  }, ['C5', 'E5', 'G5'], '8t');

  //set the note to loop every half measure
  note.set({
    "loop" : false
  });

  //start the note at the beginning of the Transport timeline
  note.start('+0');
}
