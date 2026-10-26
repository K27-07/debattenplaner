/*
 * Debate Planner – standalone offline edition.
 * No package manager, external resources, server, persistence or third-party scripts.
 * Source format / operations follow the original Vue Debate Planner.
 */
(() => {
  'use strict';

  const formats = {
    opd: { size: 3, slots: [
      { id: 'opd_house', free: true }, { id: 'opd_opposition', free: true },
      { id: 'opd_free_speakers', free: true, unlimited: true }, { id: 'jury', free: false }
    ] },
    bpd: { size: 2, slots: [
      { id: 'bpd_house_1', free: true }, { id: 'bpd_house_2', free: true },
      { id: 'bpd_opposition_1', free: true }, { id: 'bpd_opposition_2', free: true },
      { id: 'jury', free: false }
    ] }
  };
  const messages = {
    de: {
      title: 'Debattenplaner', subtitle: 'Ohne Installation · Offline',
      lang: 'Sprache', theme: 'Farbschema wechseln', hint: 'Teilnehmende ziehen oder anklicken und anschließend einem Feld zuweisen. Auf andere Namen ziehen, um Gruppen zu bilden.',
      unsorted: 'Unsortiert', unsortedJury: 'Mögliche Jury', jury: 'Jury',
      opd_house: 'Regierung', opd_opposition: 'Opposition', opd_free_speakers: 'Freie Sprecher',
      bpd_house_1: 'Eröffnende Regierung', bpd_house_2: 'Schließende Regierung',
      bpd_opposition_1: 'Eröffnende Opposition', bpd_opposition_2: 'Schließende Opposition',
      opd: 'Offene Parlamentarische Debatte', bpd: 'British Parliamentary Style',
      room: 'Raum', roomName: 'Raumname', groupSize: 'Teamgröße', juryCount: 'Juryplätze', format: 'Debattenformat',
      addRoom: 'Raum hinzufügen', add: 'Hinzufügen', name: 'Name', experienced: 'Erfahren', inexperienced: 'Unerfahren',
      remove: 'Entfernen', ungroup: 'Gruppe auflösen (Doppelklick)',
      retrieveAll: 'Alle einsammeln', retrieveRoom: 'Im Raum einsammeln',
      distributeAll: 'Auf Teams verteilen', distributeRooms: 'Auf Räume verteilen', distributeRoom: 'Im Raum verteilen',
      moveUp: 'Raum nach oben', moveDown: 'Raum nach unten', removeRoom: 'Raum entfernen',
      placeHere: 'Hier zuweisen', selected: 'Ausgewählt', cancel: 'Auswahl aufheben',
      merge: 'Mit ausgewähltem Mitglied gruppieren', footer: 'Lokal im Browser · Es werden keine Daten gespeichert',
      empty: 'Hier ablegen', invalid: 'Bitte einen Namen eingeben.',
      needsParticipants: 'Für vollständige Teams und Jury fehlen noch {n} Teilnehmende.',
      groupsPrevent: 'Teams und Jury können mit den bestehenden Gruppen nicht vollständig besetzt werden.',
      noComplete: 'Keine vollständige Debatte möglich. Noch niemand automatisch zugeteilt.',
      completion: 'Automatisch eingeteilt: {n} Raum/Räume.',
      partial: 'Raum {room}: {reason}'
    },
    en: {
      title: 'Debate Planner', subtitle: 'No installation · Offline',
      lang: 'Language', theme: 'Toggle theme', hint: 'Drag a participant or select a name and then assign it to a slot. Drop onto another name to create a group.',
      unsorted: 'Unsorted', unsortedJury: 'Potential Jury', jury: 'Jury',
      opd_house: 'House', opd_opposition: 'Opposition', opd_free_speakers: 'Free Speakers',
      bpd_house_1: 'Opening Government', bpd_house_2: 'Closing Government',
      bpd_opposition_1: 'Opening Opposition', bpd_opposition_2: 'Closing Opposition',
      opd: 'Open Parliamentary Debate', bpd: 'British Parliamentary Style',
      room: 'Room', roomName: 'Room name', groupSize: 'Team size', juryCount: 'Jury seats', format: 'Debate format',
      addRoom: 'Add room', add: 'Add', name: 'Name', experienced: 'Experienced', inexperienced: 'Inexperienced',
      remove: 'Remove', ungroup: 'Ungroup (double-click)',
      retrieveAll: 'Collect everyone', retrieveRoom: 'Collect room members',
      distributeAll: 'Distribute to teams', distributeRooms: 'Distribute to rooms', distributeRoom: 'Distribute in room',
      moveUp: 'Move room up', moveDown: 'Move room down', removeRoom: 'Remove room',
      placeHere: 'Place here', selected: 'Selected', cancel: 'Clear selection',
      merge: 'Group with selected participant', footer: 'Runs locally · Nothing is saved',
      empty: 'Drop here', invalid: 'Please enter a name.',
      needsParticipants: '{n} more participants required for complete teams and jury.',
      groupsPrevent: 'Teams and jury cannot be filled completely with these participant groups.',
      noComplete: 'No complete debate is possible. No one was automatically assigned.',
      completion: 'Automatically allocated: {n} room(s).',
      partial: 'Room {room}: {reason}'
    }
  };

  const state = {
    lang: 'de', dark: false, members: Object.create(null), lists: Object.create(null),
    rooms: [], nextRoom: 0, dragging: null, selected: null, notice: ''
  };
  const rootId = 'rootUnsorted';
  const t = (key) => messages[state.lang][key] || key;
  const escapeHtml = (str) => String(str).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
  const escAttr = escapeHtml;
  const listKey = (room, slot) => `${room}\u001f${slot}`;
  const getList = (room, slot) => state.lists[listKey(room, slot)] ||= [];
  const listNames = (room, slot) => getList(room, slot).slice();
  const allSlots = (room) => room.id === rootId
    ? [{ id: 'unsorted', free: false, unlimited: true }, { id: 'unsortedJury', free: false, unlimited: true }]
    : [{ id: 'unsorted', free: false, unlimited: true }, { id: 'unsortedJury', free: false, unlimited: true }, ...formats[room.format].slots];
  const visibleSlots = (room) => room.id === rootId
    ? allSlots(room)
    : (state.rooms.length === 1 ? formats[room.format].slots : allSlots(room));
  const findRoom = id => state.rooms.find(r => r.id === id);
  const pick = items => items.length ? items[Math.floor(Math.random() * items.length)] : undefined;
  const shuffle = items => {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  };
  const roman = (n) => {
    const pairs = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
      [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
    return pairs.map(([value, symbol]) => { const times = Math.floor(n / value); n %= value; return symbol.repeat(times); }).join('');
  };
  const rootOf = name => state.members[name]?.parent || name;

  function addRoom(position = state.rooms.length) {
    const id = String(++state.nextRoom);
    state.rooms.splice(position, 0, { id, format: 'opd', slotSize: 3, juryCount: 1, displayName: '' });
    return id;
  }
  function addMember(input, experienced) {
    const base = input.trim();
    if (!base) return false;
    let name = base, num = 1;
    while (Object.hasOwn(state.members, name)) name = `${base} ${roman(++num)}.`;
    state.members[name] = { experienced, children: [], parent: null, room: rootId, slot: 'unsorted' };
    getList(rootId, 'unsorted').push(name);
    return true;
  }
  function detach(name) {
    const member = state.members[name];
    if (!member) return;
    if (member.parent) {
      const parent = state.members[member.parent];
      if (parent) parent.children = parent.children.filter(n => n !== name);
      member.parent = null;
    } else {
      const list = getList(member.room, member.slot);
      const i = list.indexOf(name);
      if (i !== -1) list.splice(i, 1);
    }
  }
  function moveMember(name, room, slot, index = Infinity) {
    const member = state.members[name];
    if (!member || !findRoom(room) && room !== rootId) return false;
    if (!allSlots(findRoom(room) || { id: rootId }).some(s => s.id === slot)) return false;
    detach(name);
    member.room = room;
    member.slot = slot;
    const list = getList(room, slot);
    list.splice(Math.max(0, Math.min(list.length, index)), 0, name);
    return true;
  }
  function addChild(targetName, sourceName) {
    if (!state.members[targetName] || !state.members[sourceName]) return false;
    const target = rootOf(targetName), source = rootOf(sourceName);
    if (target === source) return false;
    const sourceMember = state.members[sourceName];
    const oldChildren = sourceMember.children.slice();
    detach(sourceName);
    sourceMember.room = null;
    sourceMember.slot = null;
    sourceMember.parent = target;
    state.members[target].children.push(sourceName);
    // Flatten groups, retaining all participants and a single parent level.
    for (const childName of oldChildren) {
      if (!state.members[childName]) continue;
      state.members[childName].parent = target;
      state.members[target].children.push(childName);
    }
    sourceMember.children = [];
    return true;
  }
  function unlink(name) {
    if (!state.members[name]) return;
    const groupName = rootOf(name);
    const parent = state.members[groupName];
    if (!parent?.children.length) return;
    const children = parent.children.slice();
    const pos = getList(parent.room, parent.slot).indexOf(groupName);
    for (const child of children) moveMember(child, parent.room, parent.slot, pos + 1 + children.indexOf(child));
  }
  function deleteMember(name) {
    if (!state.members[name]) return;
    const member = state.members[name];
    if (member.children.length) {
      // Keep former group members in the same slot after removing the leader.
      const pos = getList(member.room, member.slot).indexOf(name);
      for (const child of member.children.slice()) moveMember(child, member.room, member.slot, pos + 1 + member.children.indexOf(child));
    }
    detach(name);
    delete state.members[name];
    if (state.selected === name) state.selected = null;
  }
  function changeFormat(roomId, format) {
    const room = findRoom(roomId);
    if (!room || !formats[format] || room.format === format) return;
    const targets = allSlots(room).flatMap(slot => listNames(room.id, slot.id));
    for (const name of targets) {
      const oldSlot = state.members[name].slot;
      const isJury = oldSlot === 'jury' || oldSlot === 'unsortedJury';
      const toRoom = state.rooms.length === 1 ? rootId : room.id;
      moveMember(name, toRoom, isJury ? 'unsortedJury' : 'unsorted');
    }
    room.format = format;
    room.slotSize = formats[format].size;
    state.notice = '';
  }
  function deleteRoom(roomId) {
    const idx = state.rooms.findIndex(r => r.id === roomId);
    if (idx === -1 || state.rooms.length === 1) return;
    for (const slot of allSlots(state.rooms[idx])) {
      for (const name of listNames(roomId, slot.id)) {
        moveMember(name, rootId, slot.id === 'jury' || slot.id === 'unsortedJury' ? 'unsortedJury' : 'unsorted');
      }
    }
    state.rooms.splice(idx, 1);
    if (state.rooms.length === 1) {
      for (const slotId of ['unsorted', 'unsortedJury']) {
        for (const name of listNames(state.rooms[0].id, slotId)) moveMember(name, rootId, slotId);
      }
    }
  }
  function moveRoom(roomId, amount) {
    const oldIndex = state.rooms.findIndex(r => r.id === roomId);
    const newIndex = oldIndex + amount;
    if (newIndex < 0 || newIndex >= state.rooms.length) return;
    [state.rooms[oldIndex], state.rooms[newIndex]] = [state.rooms[newIndex], state.rooms[oldIndex]];
  }
  function retrieveAll() {
    for (const room of state.rooms) {
      for (const slot of allSlots(room)) {
        for (const name of listNames(room.id, slot.id)) {
          moveMember(name, rootId, ['jury', 'unsortedJury'].includes(slot.id) ? 'unsortedJury' : 'unsorted');
        }
      }
    }
  }
  function retrieveRoom(roomId) {
    const room = findRoom(roomId);
    if (!room) return;
    // If only one room is visible, use the global unsorted list instead.
    const toRoom = state.rooms.length === 1 ? rootId : roomId;
    for (const slot of allSlots(room)) {
      if (['unsorted', 'unsortedJury'].includes(slot.id) && toRoom === roomId) continue;
      for (const name of listNames(roomId, slot.id)) {
        moveMember(name, toRoom, slot.id === 'jury' || slot.id === 'unsortedJury' ? 'unsortedJury' : 'unsorted');
      }
    }
  }
  const partySize = name => 1 + (state.members[name]?.children.length || 0);
  const partyExp = name => {
    const m = state.members[name];
    return m ? Number(m.experienced) + m.children.filter(child => state.members[child]?.experienced).length : 0;
  };
  function getSlotRecords(room) {
    const entries = {};
    for (const def of allSlots(room)) {
      const parties = getList(room.id, def.id).filter(name => state.members[name])
        .map(name => ({ name, total: partySize(name), exp: partyExp(name), newcomers: partySize(name) - partyExp(name) }));
      entries[def.id] = {
        room: room.id, def,
        size: def.id === 'jury' ? room.juryCount : def.unlimited ? Infinity : room.slotSize,
        parties,
        total: parties.reduce((s, p) => s + p.total, 0),
        exp: parties.reduce((s, p) => s + p.exp, 0),
        newcomers: parties.reduce((s, p) => s + p.newcomers, 0)
      };
    }
    return entries;
  }
  // Full-team allocator: never turn an incomplete Government/Opposition/Jury into
  // a seemingly valid debate. Already manually assigned participants are retained.
  // Parties are atomic: groups are not split to satisfy a numerical quota.
  function teamSlots(room) {
    return room.format === 'bpd'
      ? ['bpd_house_1', 'bpd_house_2', 'bpd_opposition_1', 'bpd_opposition_2']
      : ['opd_house', 'opd_opposition'];
  }
  function seatsPerTeam(room) {
    return room.format === 'bpd' ? 2 : Math.max(3, room.slotSize);
  }
  function candidatesFor(room, allowGlobal) {
    const sources = [room.id];
    if (allowGlobal) sources.push(rootId);
    return sources.flatMap(sourceRoom => ['unsortedJury', 'unsorted'].flatMap(sourceSlot =>
      listNames(sourceRoom, sourceSlot).filter(name => !!state.members[name]).map(name => ({
        name, sourceRoom, sourceSlot,
        size: partySize(name), exp: partyExp(name),
        possibleJury: sourceSlot === 'unsortedJury'
      }))));
  }
  function findCompleteRoomAllocation(room, candidates) {
    const slots = [...teamSlots(room), 'jury'];
    const deficits = slots.map(slot => Math.max(0,
      (slot === 'jury' ? Math.max(1, room.juryCount) : seatsPerTeam(room)) - count(room.id, slot)));
    const initial = deficits.map(() => 0);
    const goal = deficits.join(':');
    const needed = deficits.reduce((sum, n) => sum + n, 0);
    if (needed === 0) return { complete: true, picks: [], needed, available: 0 };
    const available = candidates.reduce((sum, item) => sum + item.size, 0);
    if (available < needed) return { complete: false, picks: [], needed, available };

    // Dynamic programming over the (small) number of seats needed. Unlike a greedy
    // strategy, this also handles groups, e.g. groups of 2+1 and 3 per team.
    // A state stores the best score and a linked path of selections.
    let states = new Map([['' + initial.join(':'), { score: 0, path: null }]]);
    const shuffled = shuffle(candidates.slice());
    for (const item of shuffled) {
      const next = new Map(states);
      for (const [key, entry] of states) {
        const filled = key.split(':').map(Number);
        for (let role = 0; role < slots.length; role++) {
          if (filled[role] + item.size > deficits[role]) continue;
          const updated = filled.slice();
          updated[role] += item.size;
          const newKey = updated.join(':');
          const isJury = slots[role] === 'jury';
          const experienceBonus = isJury ? item.exp * 6 : item.exp * 2;
          // Preferring possible jurors is more important than team balance.
          const score = entry.score + (isJury ? (item.possibleJury ? 1000 : 0)
            : (item.possibleJury ? -100 : 0)) + experienceBonus
            + (item.sourceRoom === room.id ? 30 : 0) + item.size;
          if (!next.has(newKey) || next.get(newKey).score < score) {
            next.set(newKey, { score, path: { item, slot: slots[role], previous: entry.path } });
          }
        }
      }
      states = next;
    }
    const solution = states.get(goal);
    if (!solution) return { complete: false, picks: [], needed, available };
    const picks = [];
    for (let node = solution.path; node; node = node.previous) picks.push({ item: node.item, slot: node.slot });
    return { complete: true, picks: picks.reverse(), needed, available };
  }
  function distribute(mode, roomId = null) {
    const roomList = roomId ? state.rooms.filter(room => room.id === roomId) : state.rooms;
    const completed = [];
    const issues = [];
    const roomOnly = mode === 'rooms';
    for (const room of roomList) {
      const candidates = candidatesFor(room, !roomId);
      const result = findCompleteRoomAllocation(room, candidates);
      if (!result.complete) {
        const name = room.displayName || room.id;
        const reason = result.available < result.needed
          ? t('needsParticipants').replace('{n}', String(result.needed - result.available))
          : t('groupsPrevent');
        issues.push(t('partial').replace('{room}', name).replace('{reason}', reason));
        continue;
      }
      // Apply the chosen plan as a unit only after a complete allocation exists.
      for (const { item, slot } of result.picks) {
        moveMember(item.name, room.id, roomOnly && slot !== 'jury' ? 'unsorted' : slot);
      }
      completed.push(room);
    }
    if (completed.length) {
      if (roomOnly) {
        // Room-only mode distributes the remaining pool among rooms; actual
        // speaker teams are filled by the later "within room" action.
        if (!issues.length) for (const slot of ['unsorted', 'unsortedJury']) {
          for (const name of listNames(rootId, slot)) {
            const room = completed.reduce((best, current) =>
              count(current.id, 'unsorted') + count(current.id, 'unsortedJury')
                < count(best.id, 'unsorted') + count(best.id, 'unsortedJury') ? current : best);
            moveMember(name, room.id, slot);
          }
        }
      } else {
        // Only after all required roles are full can an OPD room get free speakers.
        for (const room of completed.filter(room => room.format === 'opd')) {
          for (const slot of ['unsorted', 'unsortedJury']) {
            for (const name of listNames(room.id, slot)) moveMember(name, room.id, 'opd_free_speakers');
          }
        }
        const opdRooms = completed.filter(room => room.format === 'opd');
        // Do not consume the remaining global pool as free speakers while another
        // room still needs them to form complete teams in a later round.
        if (opdRooms.length && !issues.length) {
          for (const slot of ['unsorted', 'unsortedJury']) {
            for (const name of listNames(rootId, slot)) {
              const room = opdRooms.reduce((best, current) =>
                count(current.id, 'opd_free_speakers') < count(best.id, 'opd_free_speakers') ? current : best);
              moveMember(name, room.id, 'opd_free_speakers');
            }
          }
        }
      }
    }
    state.notice = [...(completed.length ? [t('completion').replace('{n}', String(completed.length))] : [t('noComplete')]), ...issues].join(' ');
  }

  function count(room, slot) { return getList(room, slot).reduce((s, name) => s + partySize(name), 0); }
  // Local SVG equivalents of the Material Design icons in the original Vuetify UI.
  const paths = {
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3.2 3 3.2 15 0 18M12 3c-3.2 3-3.2 15 0 18"/>',
    theme: '<path d="M12 3a9 9 0 1 0 0 18z"/><circle cx="12" cy="12" r="9"/>',
    github: '<path d="M9 19c-4.5 1.5-4.5-2-6-2.5"/><path d="M9 22v-3.7c-4 .7-6-2.1-6-5.2 0-1.5.5-2.8 1.5-3.8-.3-1-.4-2.3.1-3.7 0 0 1.6 0 4 1.8a14 14 0 0 1 6.8 0c2.4-1.8 4-1.8 4-1.8.5 1.4.4 2.7.1 3.7a5.2 5.2 0 0 1 1.5 3.8c0 3.1-2 5.9-6 5.2V22"/>',
    up: '<path d="m5 14 7-7 7 7"/><path d="M12 7v14"/>',
    down: '<path d="m5 10 7 7 7-7"/><path d="M12 3v14"/>',
    add: '<path d="M12 5v14M5 12h14"/>',
    remove: '<path d="M4 7h16M10 11v7M14 11v7M6 7l1 14h10l1-14M9 7V4h6v3"/>',
    close: '<path d="M5 5 19 19M19 5 5 19"/>',
    retrieve: '<path d="M19 5 5 19M5 9v10h10"/>',
    swap: '<path d="M7 3v18m-4-4 4 4 4-4M17 21V3m-4 4 4-4 4 4"/>',
    shuffle: '<path d="M3 7h3c4 0 8 10 12 10h3m-4-4 4 4-4 4M3 17h3c1.9 0 3.7-2.3 5.1-4M14 9c1.3-1.2 2.4-2 4-2h3m-4-4 4 4-4 4"/>',
    school: '<path d="m2 10 10-5 10 5-10 5zM6 12v5c4 3 8 3 12 0v-5M22 10v7"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>'
  };
  const svg = (key, size = 20) => `<svg class="mdi-icon" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[key] || ''}</svg>`;
  const iconButton = (action, name, iconName, extras = '', classes = '') => `<button type="button" class="icon-btn ${classes}" data-action="${action}" title="${escAttr(name)}" aria-label="${escAttr(name)}" ${extras}>${svg(iconName)}</button>`;

  function memberHtml(name, isChild = false) {
    const m = state.members[name];
    if (!m) return '';
    return `<div class="member ${m.experienced ? '' : 'new'} ${state.selected === name ? 'selected' : ''} ${isChild ? 'child-member' : ''}" role="button" tabindex="0" draggable="true" data-member="${escAttr(name)}" title="${escAttr(t('ungroup'))}">
      <span class="member-name">${escapeHtml(name)}</span>
      <button type="button" data-action="delete-member" data-name="${escAttr(name)}" aria-label="${escAttr(t('remove') + ' ' + name)}" title="${escAttr(t('remove'))}">${svg('close', 15)}</button>
    </div>`;
  }
  function partyHtml(name) {
    const m = state.members[name];
    if (!m) return '';
    return `<div class="party ${m.children.length ? 'group' : ''}" data-party="${escAttr(name)}" title="${escAttr(t('merge'))}">
      ${memberHtml(name)}${m.children.map(child => memberHtml(child, true)).join('')}
    </div>`;
  }
  function slotHtml(room, slot) {
    const members = getList(room.id, slot.id);
    const hasSelect = state.selected && state.members[state.selected];
    const actions = slot.id === 'unsorted' ? (room.id === rootId
      ? `${iconButton('retrieve-all', t('retrieveAll'), 'retrieve', '', 'green-btn')}
         ${state.rooms.length > 1 ? iconButton('distribute-rooms', t('distributeRooms'), 'swap', '', 'green-btn') : ''}
         ${iconButton('distribute-all', t('distributeAll'), 'shuffle', '', 'green-btn')}`
      : `${iconButton('retrieve-room', t('retrieveRoom'), 'retrieve', `data-room="${room.id}"`, 'green-btn')}
         ${iconButton('distribute-room', t('distributeRoom'), 'shuffle', `data-room="${room.id}"`, 'green-btn')}`)
      : '';
    const entry = (room.id === rootId && slot.id === 'unsorted') ? `
      <form class="new-member" id="new-member" autocomplete="off">
        <input id="member-name" name="member-name" type="text" placeholder="${t('name')}" maxlength="160" aria-label="${t('name')}" required>
        <label class="experience-toggle" title="${t('experienced')} / ${t('inexperienced')}"><input type="checkbox" name="experienced" checked><span class="form-icon">${svg('school', 18)}</span></label>
        <button type="submit" class="form-add" title="${t('add')}" aria-label="${t('add')}">${svg('add', 20)}</button>
      </form>` : '';
    const qty = count(room.id, slot.id);
    return `<section class="slot" data-room="${room.id}" data-slot="${slot.id}">
      <div class="slot-head"><h2>${escapeHtml(t(slot.id))}${qty ? ` (${qty})` : ''}</h2>
        <div class="slot-controls">${actions}${hasSelect ? `<button type="button" class="place-btn" data-action="place" data-room="${room.id}" data-slot="${slot.id}">${t('placeHere')}</button>` : ''}</div>
      </div>
      <div class="slot-divider"></div>
      <div class="members">${members.map(partyHtml).join('')}${entry}</div>
    </section>`;
  }
  function settingsHtml(room, idx) {
    return `<aside class="room-settings" aria-label="${t('room')} ${escapeHtml(room.id)}">
      <div class="material-field room-input"><input type="text" data-room-setting="displayName" data-room="${room.id}" value="${escAttr(room.displayName)}" placeholder="${t('room')} ${room.id}" aria-label="${t('roomName')}"></div>
      <label class="material-field"><span>${state.lang === 'de' ? 'Gruppengröße' : 'Group Size'}</span><select data-room-setting="slotSize" data-room="${room.id}">
        ${(room.format === 'bpd' ? [2] : [3,4,5,6]).map(n => `<option value="${n}" ${room.slotSize === n ? 'selected' : ''}>${n}</option>`).join('')}
      </select>${svg('chevron', 18)}</label>
      <label class="material-field"><span>${state.lang === 'de' ? 'Anzahl Jury' : 'Jury Count'}</span><select data-room-setting="juryCount" data-room="${room.id}">
        ${[1,2,3,4].map(n => `<option value="${n}" ${room.juryCount === n ? 'selected' : ''}>${n}</option>`).join('')}
      </select>${svg('chevron', 18)}</label>
      <label class="material-field"><span>${state.lang === 'de' ? 'Debattenstil' : 'Debate Style'}</span><select data-room-setting="format" data-room="${room.id}">
        ${['opd','bpd'].map(fmt => `<option value="${fmt}" ${room.format === fmt ? 'selected' : ''}>${fmt === 'opd' ? 'OPD' : 'BPS'}</option>`).join('')}
      </select>${svg('chevron', 18)}</label>
      <div class="room-setting-actions">
        ${iconButton('move-room', t('moveUp'), 'up', `data-room="${room.id}" data-direction="-1" ${idx === 0 ? 'disabled' : ''}`)}
        ${iconButton('move-room', t('moveDown'), 'down', `data-room="${room.id}" data-direction="1" ${idx === state.rooms.length - 1 ? 'disabled' : ''}`)}
        ${iconButton('add-room-after', t('addRoom'), 'add', `data-room="${room.id}"`)}
        ${iconButton('delete-room', t('removeRoom'), 'remove', `data-room="${room.id}" ${state.rooms.length === 1 ? 'disabled' : ''}`)}
      </div>
    </aside>`;
  }
  function render() {
    document.documentElement.lang = state.lang;
    document.documentElement.dataset.theme = state.dark ? 'dark' : 'light';
    document.title = t('title');
    const root = document.getElementById('app');
    if (!root) return;
    const rootRoom = { id: rootId };
    root.innerHTML = `<header class="app-bar"><div class="nav">
        <h1>${t('title')}</h1>
        <div class="toolbar">
          <div class="language-wrap"><button type="button" class="top-icon language-trigger" id="language-trigger" title="${t('lang')}" aria-label="${t('lang')}" aria-expanded="false">${svg('globe', 24)}</button>
            <select id="language" aria-label="${t('lang')}"><option value="de" ${state.lang === 'de' ? 'selected' : ''}>Deutsch</option><option value="en" ${state.lang === 'en' ? 'selected' : ''}>English</option></select>
          </div>
          <button type="button" class="top-icon" data-action="theme" title="${t('theme')}" aria-label="${t('theme')}">${svg('theme', 24)}</button>
          <a class="top-icon" href="https://github.com/HalbFettKaese/debate-planner" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">${svg('github', 24)}</a>
        </div>
      </div></header>
      <main class="content">
        ${state.notice ? `<div class="distribution-notice" role="status">${escapeHtml(state.notice)}</div>` : ''}
        ${state.selected ? `<div class="selected-hint"><strong>${t('selected')}: ${escapeHtml(state.selected)}</strong> <button type="button" data-action="clear-selection">${t('cancel')}</button></div>` : ''}
        <div class="room-row global-row">
          <div class="board global-board"><div class="slots" style="--columns:2">${visibleSlots(rootRoom).map(slot => slotHtml(rootRoom, slot)).join('')}</div></div>
        </div>
        ${state.rooms.map((room, idx) => `<div class="room-row">${settingsHtml(room, idx)}
          <div class="board"><div class="slots" style="--columns:${visibleSlots(room).length}">${visibleSlots(room).map(slot => slotHtml(room, slot)).join('')}</div></div></div>`).join('')}
      </main>`;
  }

  const app = document.getElementById('app');
  if (!app) return;
  addRoom();
  render();

  // Event delegation keeps drag source mounted throughout dragging.
  app.addEventListener('submit', event => {
    if (event.target?.id !== 'new-member') return;
    event.preventDefault();
    const form = event.target;
    const name = form.elements['member-name'].value;
    const experienced = form.elements.experienced.checked;
    if (addMember(name, experienced)) render();
  });
  app.addEventListener('change', event => {
    if (event.target?.id === 'language') {
      state.lang = event.target.value === 'en' ? 'en' : 'de'; render(); return;
    }
    if (event.target?.name === 'experienced') {
      event.target.closest('.new-member')?.classList.toggle('new', !event.target.checked);
      return;
    }
    const el = event.target.closest('[data-room-setting]');
    if (!el) return;
    const room = findRoom(el.dataset.room);
    if (!room) return;
    const key = el.dataset.roomSetting;
    if (key === 'format') changeFormat(room.id, el.value);
    if (['slotSize', 'juryCount'].includes(key)) room[key] = Number(el.value);
    state.notice = '';
    if (key === 'displayName') room.displayName = el.value;
    render();
  });
  app.addEventListener('input', event => {
    const el = event.target;
    if (el?.dataset?.roomSetting !== 'displayName') return;
    const room = findRoom(el.dataset.room);
    if (room) {
      room.displayName = el.value;
      const heading = el.closest('.room-row')?.querySelector('.board-title');
      if (heading) heading.textContent = room.displayName || t('room') + ' ' + room.id;
    }
  });
  app.addEventListener('click', event => {
    const action = event.target.closest('button[data-action]');
    if (action) {
      const { room, slot, name } = action.dataset;
      switch (action.dataset.action) {
        case 'add-room': addRoom(); break;
        case 'add-room-after': addRoom(state.rooms.findIndex(r => r.id === room) + 1); break;
        case 'delete-room': deleteRoom(room); break;
        case 'move-room': moveRoom(room, Number(action.dataset.direction)); break;
        case 'delete-member': deleteMember(name); break;
        case 'theme': state.dark = !state.dark; break;
        case 'clear-selection': state.selected = null; break;
        case 'retrieve-all': retrieveAll(); state.notice = ''; break;
        case 'retrieve-room': retrieveRoom(room); state.notice = ''; break;
        case 'distribute-rooms': distribute('rooms'); break;
        case 'distribute-all': distribute('teams'); break;
        case 'distribute-room': distribute('teams', room); break;
        case 'place':
          if (state.selected) moveMember(state.selected, room, slot);
          state.selected = null;
          break;
      }
      render();
      return;
    }
    const chip = event.target.closest('[data-member]');
    if (!chip) return;
    const name = chip.dataset.member;
    if (state.selected && state.selected !== name && rootOf(state.selected) !== rootOf(name)) {
      addChild(name, state.selected);
      state.selected = null;
    } else state.selected = state.selected === name ? null : name;
    render();
  });
  app.addEventListener('dblclick', event => {
    const chip = event.target.closest('[data-member]');
    if (!chip) return;
    unlink(chip.dataset.member);
    state.selected = null;
    render();
  });
  app.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const chip = event.target.closest('[data-member]');
    if (chip && !event.target.closest('button')) { event.preventDefault(); chip.click(); }
  });
  app.addEventListener('dragstart', event => {
    const chip = event.target.closest('[data-member]');
    if (!chip || event.target.closest('button')) { event.preventDefault(); return; }
    state.dragging = chip.dataset.member;
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', state.dragging);
      event.dataTransfer.effectAllowed = 'move';
    }
    chip.classList.add('dragging');
  });
  app.addEventListener('dragover', event => {
    if (!state.dragging) return;
    const target = event.target.closest('[data-party]');
    const slot = event.target.closest('.slot[data-room][data-slot]');
    if (!slot) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    app.querySelectorAll('.slot.over,.party.merge-target').forEach(el => el.classList.remove('over', 'merge-target'));
    if (target && rootOf(target.dataset.party) !== rootOf(state.dragging)) target.classList.add('merge-target');
    else slot.classList.add('over');
  });
  app.addEventListener('drop', event => {
    if (!state.dragging) return;
    const slot = event.target.closest('.slot[data-room][data-slot]');
    if (!slot) return;
    event.preventDefault();
    const name = state.dragging;
    const target = event.target.closest('[data-party]');
    if (target && rootOf(target.dataset.party) !== rootOf(name)) addChild(target.dataset.party, name);
    else {
      const parties = [...slot.querySelectorAll(':scope > .members > [data-party]')]
        .filter(el => el.dataset.party !== rootOf(name));
      let position = parties.length;
      for (let i = 0; i < parties.length; i++) {
        const rect = parties[i].getBoundingClientRect();
        if (slot.dataset.room === rootId
          ? (event.clientY < rect.top || (event.clientY <= rect.bottom && event.clientX < rect.left + rect.width / 2))
          : event.clientY < rect.top + rect.height / 2) { position = i; break; }
      }
      moveMember(name, slot.dataset.room, slot.dataset.slot, position);
    }
    state.dragging = null;
    state.selected = null;
    render();
  });
  app.addEventListener('dragend', () => {
    state.dragging = null;
    app.querySelectorAll('.slot.over,.party.merge-target,.member.dragging')
      .forEach(el => el.classList.remove('over', 'merge-target', 'dragging'));
  });
})();
