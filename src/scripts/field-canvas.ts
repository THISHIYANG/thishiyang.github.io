const STORAGE_KEY = 'thishi-field-layout-v1';

interface SavedFieldObject {
  x: number;
  y: number;
  z: number;
}

type SavedFieldLayout = Record<string, SavedFieldObject>;

const fieldCanvas =
  document.querySelector<HTMLElement>('[data-field-canvas]');

if (fieldCanvas) {
  const canvas = fieldCanvas;
  /* =======================================================
   FIELD FILTER
   ======================================================= */

const tokens = [
  ...canvas.querySelectorAll<HTMLButtonElement>(
    '[data-field-token][data-filter]'
  ),
];

const cards = [
  ...canvas.querySelectorAll<HTMLElement>(
    '[data-field-card]'
  ),
];

let activeFilterToken: HTMLButtonElement | null = null;


function clearFilter() {
  activeFilterToken = null;

  canvas.removeAttribute(
    'data-filtering'
  );

  tokens.forEach((token) => {
    token.setAttribute(
      'aria-pressed',
      'false'
    );
  });

  cards.forEach((card) => {
    card.removeAttribute(
      'data-filter-match'
    );
  });
}


function applyFilter(
  token: HTMLButtonElement
) {
  const filter =
    token.dataset.filter;

  const value =
    token.dataset.filterValue;

  if (!filter || !value) return;


  /* clicking active token again = clear */

  if (activeFilterToken === token) {
    clearFilter();
    return;
  }


  activeFilterToken = token;

  canvas.setAttribute(
    'data-filtering',
    ''
  );


  tokens.forEach((item) => {
    item.setAttribute(
      'aria-pressed',
      String(item === token)
    );
  });


  cards.forEach((card) => {

    let cardValue = '';


    if (filter === 'type') {
      cardValue =
        card.dataset.fieldType ?? '';
    }


    if (filter === 'status') {
      cardValue =
        card.dataset.fieldStatus ?? '';
    }


    if (filter === 'year') {
      cardValue =
        card.dataset.fieldYear ?? '';
    }


    card.setAttribute(
      'data-filter-match',
      String(cardValue === value)
    );
  });
}

tokens.forEach((token) => {

  token.addEventListener(
    'click',
    (event) => {

      /*
       If the token was dragged,
       do not activate filtering.
      */

      if (
        token.dataset.justDragged ===
        'true'
      ) {
        event.preventDefault();
        return;
      }

      applyFilter(token);
    }
  );
});

document.addEventListener(
  'keydown',
  (event) => {

    if (
      event.key === 'Escape' &&
      activeFilterToken
    ) {
      clearFilter();
    }
  }
);

  const objects = [
    ...canvas.querySelectorAll<HTMLElement>(
      '[data-field-card], [data-field-token]'
    ),
  ];

  const resetButton =
    canvas.querySelector<HTMLButtonElement>('[data-field-reset]');

  let savedLayout: SavedFieldLayout = {};

  let topZ = 50;


  /* =======================================================
     LOAD SAVED LAYOUT
     ======================================================= */

  try {
    const raw =
      localStorage.getItem(STORAGE_KEY);

    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if(parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        for(const [id, item] of Object.entries(parsed)) {
          if(item && typeof item === 'object' && Number.isFinite(item.x) && Number.isFinite(item.y) && Number.isInteger(item.z) && item.z >= 0) savedLayout[id] = {x:item.x,y:item.y,z:item.z};
        }
      }
    }
  } catch {
    savedLayout = {};
  }


  /* =======================================================
     APPLY SAVED POSITIONS
     ======================================================= */

  objects.forEach((object) => {
    const id = object.dataset.fieldId;

    if (!id) return;

    const saved = savedLayout[id];

    if (saved) {
      object.style.left =
        `${saved.x * 100}%`;

      object.style.top =
        `${saved.y * 100}%`;

      object.style.zIndex =
        String(saved.z);

      topZ =
        Math.max(topZ, saved.z);
    } else {
      const defaultZ =
        Number.parseInt(
          getComputedStyle(object).zIndex
        );

      if (Number.isFinite(defaultZ)) {
        topZ =
          Math.max(topZ, defaultZ);
      }
    }
  });


  /* =======================================================
     SAVE ONE OBJECT
     ======================================================= */

  function saveObject(
    object: HTMLElement
  ) {
    const id =
      object.dataset.fieldId;

    if (!id) return;

    // Persist CSS anchors, not transformed screen centers (tokens use top-left anchors).
    const centerX = object.offsetLeft;
    const centerY = object.offsetTop;

    const z =
      Number.parseInt(
        object.style.zIndex ||
        getComputedStyle(object).zIndex
      ) || 1;

    savedLayout[id] = {
      x: centerX / canvas.clientWidth,
      y: centerY / canvas.clientHeight,
      z,
    };

    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(savedLayout)); } catch { /* Keep dragging usable when storage is unavailable. */ }
  }


  /* =======================================================
     DRAG
     ======================================================= */

  objects.forEach((object) => {

    object.addEventListener(
      'dragstart',
      (event) => {
        event.preventDefault();
      }
    );

    let startPointerX = 0;
    let startPointerY = 0;

    let startLeft = 0;
    let startTop = 0;

    let dragging = false;


    object.addEventListener(
      'pointerdown',
      (event) => {

        if (!event.isPrimary || event.button !== 0) {
          return;
        }

        startPointerX =
          event.clientX;

        startPointerY =
          event.clientY;

        startLeft = object.offsetLeft;
        startTop = object.offsetTop;
        delete object.dataset.justDragged;

        dragging = false;


        /* bring to front */

        topZ += 1;

        object.style.zIndex =
          String(topZ);


        object.setPointerCapture(
          event.pointerId
        );

        object.setAttribute(
          'data-grabbed',
          ''
        );
      }
    );


    object.addEventListener(
      'pointermove',
      (event) => {

        if (
          !object.hasPointerCapture(
            event.pointerId
          )
        ) {
          return;
        }


        const dx =
          event.clientX -
          startPointerX;

        const dy =
          event.clientY -
          startPointerY;


        const distance =
          Math.hypot(dx, dy);


        /* 5px threshold */

        if (distance > 5) {
          dragging = true;
        }


        if (!dragging) return;


        const canvasRect =
          canvas.getBoundingClientRect();




        let x =
          startLeft + dx / (canvasRect.width / canvas.clientWidth);

        let y =
          startTop + dy / (canvasRect.height / canvas.clientHeight);


        /* Keep at least 32px visible */

        const visible = 32;


        x = Math.max(
          visible -
          (object.matches('[data-field-token]') ? 0 : object.offsetWidth / 2),

          Math.min(
            canvas.clientWidth -
            visible +
            (object.matches('[data-field-token]') ? 0 : object.offsetWidth / 2),

            x
          )
        );


        y = Math.max(
          visible -
          (object.matches('[data-field-token]') ? 0 : object.offsetHeight / 2),

          Math.min(
            canvas.clientHeight -
            visible +
            (object.matches('[data-field-token]') ? 0 : object.offsetHeight / 2),

            y
          )
        );


        /*
         Convert position back to percentages.

         This is important:
         the FIELD layout can survive different
         desktop resolutions.
        */

        const xPercent =
          (x / canvas.clientWidth) * 100;

        const yPercent =
          (y / canvas.clientHeight) * 100;


        object.style.left =
          `${xPercent}%`;

        object.style.top =
          `${yPercent}%`;


        object.style.transform =
          object.matches('[data-field-token]') ? 'scale(1.025)' : 'translate(-50%, -50%) rotate(0deg) scale(1.025)';
      }
    );


    object.addEventListener(
      'pointerup',
      (event) => {

        if (
          !object.hasPointerCapture(
            event.pointerId
          )
        ) {
          return;
        }


        object.releasePointerCapture(
          event.pointerId
        );


        object.removeAttribute(
          'data-grabbed'
        );


        /*
         Let CSS restore the object's
         original rotation.
        */

        object.style.removeProperty(
          'transform'
        );
        saveObject(object);



        if (dragging) {

          object.dataset.justDragged =
            'true';



        }
      }
    );


    object.addEventListener('pointercancel', () => {
      object.removeAttribute('data-grabbed');object.style.removeProperty('transform');
      if(dragging)saveObject(object);dragging=false;
    });

    /* Prevent drag from becoming link click */

    object.addEventListener(
      'click',
      (event) => {

        if (
          object.dataset.justDragged ===
          'true'
        ) {
          event.preventDefault();
        }
      }
    );
  });


  /* =======================================================
     RESET FIELD
     ======================================================= */

  resetButton?.addEventListener(
    'click',
    () => {

      try { localStorage.removeItem(STORAGE_KEY); } catch { /* Reset still restores the in-memory layout. */ }

      savedLayout = {};

      topZ = 50;


      objects.forEach((object) => {

        /*
         Remove ONLY the properties created
         by the drag system.

         The original CSS / field.ts layout
         automatically becomes visible again.
        */

        object.style.removeProperty(
          'left'
        );

        object.style.removeProperty(
          'top'
        );

        object.style.removeProperty(
          'z-index'
        );

        object.style.removeProperty(
          'transform'
        );
      });
    }
  );
}