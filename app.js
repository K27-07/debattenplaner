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
      remove: 'Entfernen', ungroup: 'Gruppe auflösen (Doppelklick oder Umschalt+Eingabe)',
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
      partial: 'Raum {room}: {reason}',
      overfilled: 'Raum {room}: {slot} ist überfüllt ({current} statt höchstens {maximum}). Bitte die manuelle Zuweisung korrigieren.',
      searchLimit: 'Die Suche nach einer vollständigen Einteilung hat ihre Rechengrenze erreicht. Möglicherweise gibt es eine Lösung. Bitte Gruppierung oder Raumgrößen anpassen und erneut versuchen.',
      invalidPlan: 'Interner Plausibilitätsfehler: Die errechnete Einteilung wurde nicht übernommen. Keine Änderungen vorgenommen.',
      unchangedPlan: 'Keine neue vollständige Einteilung übernommen. Alle bisherigen Zuweisungen bleiben erhalten.',
      juryPriorityConflict: 'Die Jurypriorität kann mit den vorhandenen Gruppierungen oder Raumvorbelegungen nicht vollständig eingehalten werden. Keine automatische Einteilung übernommen. Bitte Gruppen oder Vorbelegungen anpassen.',
      groupFitConflict: 'Mit den aktuellen Gruppen und festen Plätzen wurde keine vollständige regelkonforme Team- und Jurybelegung gefunden. Gruppengrößen können insbesondere die freien Teamplätze blockieren. Keine automatische Einteilung übernommen.',
      roomsDistributed: '{n} Teilnehmende zufällig auf {r} Räume verteilt.',
      edit: 'Bearbeiten', editParticipant: 'Teilnehmer bearbeiten', save: 'Speichern', cancelEdit: 'Abbrechen',
      duplicateName: 'Dieser Name existiert bereits. Bitte einen anderen Namen verwenden.',
      editSaved: 'Teilnehmer aktualisiert. Bei Bedarf die Teams erneut automatisch verteilen.',
      juryVolunteer: 'Freiwillig jurieren', available: 'Noch nicht auf Räume verteilt',
      present: 'Anwesend', roomPeople: 'Personen im Raum', mandatorySeats: 'Pflichtplätze',
      unfilled: 'Offene Plätze', roomReady: 'Pflichtplätze belegt',
      missingSlots: 'Offen: {slots}.',
      retryHint: 'Prüfe feste Plätze, Gruppierungen oder die Anzahl der Räume und starte die Verteilung erneut.'
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
      remove: 'Remove', ungroup: 'Ungroup (double-click or Shift+Enter)',
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
      partial: 'Room {room}: {reason}',
      overfilled: 'Room {room}: {slot} is overfilled ({current}; maximum {maximum}). Please adjust manual assignments.',
      searchLimit: 'The search for a complete seating hit its computational limit. A valid seating may still exist. Adjust groups or room sizes and retry.',
      invalidPlan: 'Internal validation failed: the proposed seating was not applied. No changes made.',
      unchangedPlan: 'No new complete allocation was applied. All existing assignments remain unchanged.',
      juryPriorityConflict: 'Jury priority cannot be fully respected with the current groups or room reservations. No automatic seating was applied. Please adjust groups or preassignments.',
      groupFitConflict: 'No fully valid team and jury seating was found with the current groups and fixed places. Group sizes may prevent the remaining team seats from being filled. No automatic allocation was applied.',
      roomsDistributed: '{n} participants randomly assigned to {r} rooms.',
      edit: 'Edit', editParticipant: 'Edit participant', save: 'Save', cancelEdit: 'Cancel',
      duplicateName: 'This name is already in use. Choose another name.',
      editSaved: 'Participant updated. Redistribute teams if necessary.',
      juryVolunteer: 'Volunteer juror', available: 'Not yet assigned to rooms',
      present: 'Present', roomPeople: 'People in room', mandatorySeats: 'Required seats',
      unfilled: 'Empty seats', roomReady: 'Required seats filled',
      missingSlots: 'Still empty: {slots}.',
      retryHint: 'Check reserved seats, groups or room count, then try distributing again.'
    }
  };

  const state = {
    lang: 'de', dark: false, members: Object.create(null), lists: Object.create(null),
    rooms: [], nextRoom: 0, dragging: null, selected: null, notice: '',
    entryExperienced: true, entryVolunteer: false
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
  function addMember(input, experienced, volunteeredJury = false) {
    const base = input.trim();
    if (!base) return false;
    let name = base, num = 1;
    while (Object.hasOwn(state.members, name)) name = `${base} ${roman(++num)}.`;
    state.members[name] = { experienced, volunteeredJury, children: [], parent: null, room: rootId, slot: volunteeredJury ? 'unsortedJury' : 'unsorted',
      reservedRoom: rootId, autoSeat: false, autoRoom: false };
    getList(rootId, volunteeredJury ? 'unsortedJury' : 'unsorted').push(name);
    return true;
  }
  // Renaming must update *every* reference: lists contain only group leaders;
  // child-parent and parent-child links use names as identifiers as well.
  function updateMember(oldName, input, experienced, volunteeredJury) {
    if (!Object.hasOwn(state.members, oldName)) return 'missing';
    const newName = input.trim();
    if (!newName) return 'empty';
    if (newName !== oldName && Object.hasOwn(state.members, newName)) return 'duplicate';
    const member = state.members[oldName];
    if (newName !== oldName) {
      state.members[newName] = member;
      delete state.members[oldName];
      for (const list of Object.values(state.lists)) {
        for (let i = 0; i < list.length; i++) if (list[i] === oldName) list[i] = newName;
      }
      for (const other of Object.values(state.members)) {
        if (other.parent === oldName) other.parent = newName;
        for (let i = 0; i < other.children.length; i++)
          if (other.children[i] === oldName) other.children[i] = newName;
      }
      if (state.selected === oldName) state.selected = newName;
      if (state.dragging === oldName) state.dragging = newName;
    }
    member.experienced = Boolean(experienced);
    member.volunteeredJury = Boolean(volunteeredJury);
    // In a waiting area, preserve the whole party and its room reservation.
    // Only the waiting-list classification changes; no automatic seat is pinned.
    const party = state.members[rootOf(newName)];
    if (party && ['unsorted', 'unsortedJury'].includes(party.slot)) {
      const wanted = isVoluntaryParty(newName) ? 'unsortedJury' : 'unsorted';
      if (wanted !== party.slot) {
        const current = getList(party.room, party.slot);
        const pos = current.indexOf(rootOf(newName));
        if (pos !== -1) current.splice(pos, 1);
        getList(party.room, wanted).push(rootOf(newName));
        party.slot = wanted;
      }
    }
    state.notice = t('editSaved');
    return null;
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
  function moveMember(name, room, slot, index = Infinity, automatic = false) {
    const member = state.members[name];
    if (!member || !findRoom(room) && room !== rootId) return false;
    if (!allSlots(findRoom(room) || { id: rootId }).some(s => s.id === slot)) return false;
    detach(name);
    member.room = room;
    member.slot = slot;
    // A room reserved by a user is kept on future automatic replanning.
    // Automatic seats can be freed without changing this reservation.
    if (automatic) {
      member.autoSeat = !['unsorted', 'unsortedJury'].includes(slot);
      member.autoRoom = !member.autoSeat && room !== rootId && member.reservedRoom === rootId;
    } else {
      member.reservedRoom = room;
      member.autoSeat = false;
      member.autoRoom = false;
      // Some manual actions (e.g. collect all, change format) move an entire
      // party without unlinking it. Synchronize every child as well, so a
      // later deletion cannot revive old automatic room/seat flags.
      for (const childName of member.children) {
        const child = state.members[childName];
        if (!child) continue;
        child.reservedRoom = room;
        child.autoSeat = false;
        child.autoRoom = false;
      }
    }
    const list = getList(room, slot);
    list.splice(Math.max(0, Math.min(list.length, index)), 0, name);
    return true;
  }
  // A participant's volunteered jury preference belongs to the participant,
  // not to their current seat. Automatic allocation must never change it.
  function partyMembers(name) {
    const root = rootOf(name);
    return state.members[root] ? [root, ...state.members[root].children] : [];
  }
  // Grouping is a manual placement decision for *every* member of the party.
  // Members nested under a leader have no independent room/slot until they are
  // released. Pin their reservation to the leader's current room instead of
  // retaining automatic-allocation flags from a previous independent seat.
  function protectManualParty(name) {
    const root = state.members[rootOf(name)];
    if (!root) return;
    for (const person of partyMembers(name)) {
      const member = state.members[person];
      member.reservedRoom = root.room;
      member.autoSeat = false;
      member.autoRoom = false;
    }
  }
  const isVoluntaryParty = name => partyMembers(name).every(n => state.members[n]?.volunteeredJury);
  function returnPoolSlot(name) {
    return isVoluntaryParty(name) ? 'unsortedJury' : 'unsorted';
  }
  // Only a user's explicit move to/from the candidate lists changes the
  // registration. Moving to a debating team or jury seat keeps the choice.
  // Manual moves act on one person, even if this person led a group.
  function moveSingleMember(name, room, slot, index = Infinity) {
    if (state.members[name]?.children.length) unlink(name);
    const moved = moveMember(name, room, slot, index);
    if (moved && (slot === 'unsortedJury' || slot === 'unsorted')) {
      state.members[name].volunteeredJury = slot === 'unsortedJury';
    }
    return moved;
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
    // Joining another participant in the 'Potential Jury' area is an
    // explicit request to join that jury-candidate group.
    const head = state.members[target];
    // All children inherit the manual placement, including groups absorbed
    // from elsewhere. Protecting only the leader left stale autoSeat flags,
    // which could later move a released child to another team or jury.
    protectManualParty(target);
    if (head.slot === 'unsortedJury') {
      for (const memberName of partyMembers(target)) {
        state.members[memberName].volunteeredJury = true;
      }
    }
    return true;
  }
  function unlink(name) {
    if (!state.members[name]) return;
    const rootName = rootOf(name);
    const parent = state.members[rootName];
    if (!parent?.children.length) return;
    const list = getList(parent.room, parent.slot);
    const position = list.indexOf(rootName);
    const children = parent.children.slice();
    parent.children = [];
    for (const childName of children) {
      const child = state.members[childName];
      if (!child) continue;
      child.parent = null;
      child.room = parent.room;
      child.slot = parent.slot;
      child.reservedRoom = child.room;
      child.autoSeat = false;
      child.autoRoom = false;
    }
    parent.reservedRoom = parent.room;
    parent.autoSeat = false;
    parent.autoRoom = false;
    // Insert siblings in their original sequence, *after* their former lead.
    list.splice(position + 1, 0, ...children);
    // If a mixed-preference group is dissolved in an unsorted pool, restore
    // each person's own volunteer status in the corresponding visible list.
    if (parent.slot === 'unsorted' || parent.slot === 'unsortedJury') {
      for (const memberName of [rootName, ...children]) {
        const preferred = state.members[memberName].volunteeredJury ? 'unsortedJury' : 'unsorted';
        if (state.members[memberName].slot !== preferred)
          moveMember(memberName, parent.room, preferred);
      }
    }
  }
  function deleteMember(name) {
    if (!state.members[name]) return;
    const member = state.members[name];
    const releasedChildren = member.children.slice();
    const oldRoom = member.room;
    const oldSlot = member.slot;
    if (releasedChildren.length) {
      const list = getList(oldRoom, oldSlot);
      const position = list.indexOf(name);
      member.children = [];
      for (const childName of releasedChildren) {
        const child = state.members[childName];
        if (!child) continue;
        child.parent = null;
        child.room = oldRoom;
        child.slot = oldSlot;
        // Deleting a manually grouped leader must not turn the surviving
        // participants back into automatically allocated, movable seats.
        child.reservedRoom = oldRoom;
        child.autoSeat = false;
        child.autoRoom = false;
      }
      list.splice(position + 1, 0, ...releasedChildren);
    }
    detach(name);
    delete state.members[name];
    // When deleting a party leader in an unsorted area, the remaining people
    // become independent again. Show each person in the pool matching their
    // *own* volunteered jury preference, not the former leader's pool.
    // Do not move children already assigned to a team or jury seat.
    if (oldSlot === 'unsorted' || oldSlot === 'unsortedJury') {
      for (const childName of releasedChildren) {
        const child = state.members[childName];
        if (!child) continue;
        const pool = child.volunteeredJury ? 'unsortedJury' : 'unsorted';
        if (child.slot !== pool) moveMember(childName, oldRoom, pool);
      }
    }
    if (state.selected === name) state.selected = null;
  }
  function changeFormat(roomId, format) {
    const room = findRoom(roomId);
    if (!room || !formats[format] || room.format === format) return;
    const targets = allSlots(room).flatMap(slot => listNames(room.id, slot.id));
    for (const name of targets) {
      const toRoom = state.rooms.length === 1 ? rootId : room.id;
      moveMember(name, toRoom, returnPoolSlot(name));
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
        moveMember(name, rootId, returnPoolSlot(name));
      }
    }
    state.rooms.splice(idx, 1);
    if (state.rooms.length === 1) {
      for (const slotId of ['unsorted', 'unsortedJury']) {
        for (const name of listNames(state.rooms[0].id, slotId))
          moveMember(name, rootId, returnPoolSlot(name));
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
          moveMember(name, rootId, returnPoolSlot(name));
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
        moveMember(name, toRoom, returnPoolSlot(name));
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
        possibleJury: isVoluntaryParty(name)
      }))));
  }
  // Allocate complete debates using a 0/1 dynamic program. Every group is kept
  // intact. Unlike the earlier version, the search retains different experience
  // compositions for the same number of filled seats: two full teams are not
  // necessarily equally balanced just because they contain the same headcount.
  function teamBalancePenalty(room, experienceByTeam, globalRate) {
    const sizes = teamSlots(room).map(slot => seatsPerTeam(room));
    const rates = experienceByTeam.map((experienced, i) => experienced / sizes[i]);
    const average = rates.reduce((total, value) => total + value, 0) / rates.length;
    // Both the difference *within a debate* and the difference between debates
    // matter. The global rate helps prevent one room consuming every expert.
    return 24 * (average - globalRate) ** 2 * rates.length
      + rates.reduce((total, rate) => total + 5 * (rate - average) ** 2
        + 8 * (rate - globalRate) ** 2, 0)
      - experienceByTeam.reduce((bonus, experienced, i) =>
        bonus + (experienced > 0 && experienced < sizes[i] ? 3 : 0), 0);
  }
  function compactCandidates(candidates, needed, deficits) {
    // All people with the same group size, experience mix, jury preference and
    // source location are equivalent to the allocator. For a large event it is
    // unnecessary to explore every interchangeable person individually.
    const usable = candidates.filter(item => deficits.some(n => n >= item.size));
    if (usable.length <= Math.max(24, needed * 2)) return usable;
    const byType = new Map();
    for (const item of shuffle(usable.slice())) {
      const type = [item.size, item.exp, Number(item.possibleJury), item.sourceRoom].join(':');
      if (!byType.has(type)) byType.set(type, []);
      byType.get(type).push(item);
    }
    const available = usable.reduce((n, item) => n + item.size, 0);
    const picked = [], remaining = [];
    for (const group of byType.values()) {
      const groupTotal = group.reduce((n, item) => n + item.size, 0);
      const limit = Math.min(group.length, Math.max(3,
        Math.min(needed, Math.ceil(needed * groupTotal / available) + 4)));
      picked.push(...group.slice(0, limit));
      remaining.push(...group.slice(limit));
    }
    let availableSelected = picked.reduce((n, item) => n + item.size, 0);
    for (const item of shuffle(remaining)) {
      if (availableSelected >= needed) break;
      picked.push(item);
      availableSelected += item.size;
    }
    return picked;
  }
  function findCompleteRoomAllocationExact(room, candidates, globalRate) {
    return findCompleteRoomAllocation(room, candidates, globalRate, true);
  }
  function findCompleteRoomAllocation(room, candidates, globalRate, exact = false) {
    const teams = teamSlots(room);
    const slots = [...teams, 'jury'];
    const capacities = slots.map(slot => slot === 'jury' ? Math.max(1, room.juryCount) : seatsPerTeam(room));
    // A manually overfilled slot must never count as a completed debate.
    if (slots.some((slot, index) => count(room.id, slot) > capacities[index])) {
      return { complete: false, overfilled: true, picks: [], needed: 0, available: 0 };
    }
    const deficits = slots.map((slot, index) => capacities[index] - count(room.id, slot));
    const needed = deficits.reduce((sum, n) => sum + n, 0);
    const available = candidates.reduce((sum, item) => sum + item.size, 0);
    if (!needed) return { complete: true, picks: [], needed, available, preference: 0, penalty: 0 };
    if (available < needed) return { complete: false, picks: [], needed, available };

    const dims = slots.length;
    const initial = Array(dims + teams.length).fill(0);
    const goal = deficits.join(',');
    let states = new Map([[initial.join(','), {
      prefJury: 0, experiencedJury: 0, prefSpeaker: 0, local: 0, path: null
    }]]);
    // Candidate order is randomized. Equivalent good distributions can therefore
    // lead to different real-world groupings on successive button presses.
    for (const item of shuffle(exact ? candidates.slice() : compactCandidates(candidates, needed, deficits))) {
      const next = new Map(states);
      for (const [key, entry] of states) {
        const numbers = key.split(',').map(Number);
        for (let role = 0; role < dims; role++) {
          if (numbers[role] + item.size > deficits[role]) continue;
          const updated = numbers.slice();
          updated[role] += item.size;
          if (role < teams.length) updated[dims + role] += item.exp;
          const nextKey = updated.join(',');
          const isJury = role === teams.length;
          const proposal = {
            prefJury: entry.prefJury + (isJury && item.possibleJury ? item.size : 0),
            // Among non-volunteers, experienced jurors must come before newcomers.
            // A volunteered novice is still ahead of every non-volunteer.
            experiencedJury: entry.experiencedJury + (isJury && !item.possibleJury ? item.exp : 0),
            prefSpeaker: entry.prefSpeaker + (!isJury && item.possibleJury ? item.size : 0),
            local: entry.local + (item.sourceRoom === room.id ? item.size : 0),
            path: { item, slot: slots[role], previous: entry.path }
          };
          const old = next.get(nextKey);
          // Lexicographic jury policy: volunteers first, then experienced
          // non-volunteers, only then inexperienced non-volunteers.
          // Never trade a higher jury priority for a better team balance.
          const better = !old || proposal.prefJury > old.prefJury
            || (proposal.prefJury === old.prefJury && proposal.experiencedJury > old.experiencedJury)
            || (proposal.prefJury === old.prefJury && proposal.experiencedJury === old.experiencedJury
              && (proposal.prefSpeaker < old.prefSpeaker
                || (proposal.prefSpeaker === old.prefSpeaker
                  && (proposal.local > old.local
                    || (proposal.local === old.local && Math.random() < 0.5)))));
          if (better) next.set(nextKey, proposal);
        }
      }
      states = next;
    }
    const manualExp = teams.map(slot => getSlotRecords(room)[slot].exp);
    let best = null;
    for (const [key, entry] of states) {
      const nums = key.split(',').map(Number);
      if (nums.slice(0, dims).join(',') !== goal) continue;
      const exp = manualExp.map((n, i) => n + nums[dims + i]);
      const penalty = teamBalancePenalty(room, exp, globalRate);
      if (!best || entry.prefJury > best.entry.prefJury
        || (entry.prefJury === best.entry.prefJury && entry.experiencedJury > best.entry.experiencedJury)
        || (entry.prefJury === best.entry.prefJury && entry.experiencedJury === best.entry.experiencedJury
          && (penalty < best.penalty - 1e-9
            || (Math.abs(penalty - best.penalty) < 1e-9
              && (entry.prefSpeaker < best.entry.prefSpeaker
                || (entry.prefSpeaker === best.entry.prefSpeaker && Math.random() < 0.5)))))) {
        best = { entry, penalty, exp };
      }
    }
    if (!best && !exact && candidates.length > Math.max(24, needed * 2)) {
      // On unusually restrictive combinations of groups, retry with the full
      // pool: an optimization must never turn a possible seating into failure.
      return findCompleteRoomAllocationExact(room, candidates, globalRate);
    }
    if (!best) return { complete: false, picks: [], needed, available };
    const picks = [];
    for (let node = best.entry.path; node; node = node.previous) {
      picks.push({ item: node.item, slot: node.slot });
    }
    return { complete: true, picks: picks.reverse(), needed, available,
      preference: best.entry.prefJury, experiencedJury: best.entry.experiencedJury,
      penalty: best.penalty, exp: best.exp };
  }

  function globalExperienceRate(rooms) {
    const teams = rooms.flatMap(room => teamSlots(room).map(slot => ({ room, slot })));
    const fixedSpeakers = teams.reduce((n, { room, slot }) => n + count(room.id, slot), 0);
    const fixedExperienced = teams.reduce((n, { room, slot }) => n + getSlotRecords(room)[slot].exp, 0);
    const candidateNames = new Set();
    for (const room of rooms) for (const source of [rootId, room.id]) {
      for (const slot of ['unsortedJury', 'unsorted']) {
        for (const name of listNames(source, slot)) candidateNames.add(name);
      }
    }
    const pool = [...candidateNames].map(name => ({ name, possible: isVoluntaryParty(name) }));
    // Predict jury experience with the same strict preference order as the
    // allocation: registered volunteers first, experienced others second.
    // This estimate is for speaker balancing, not a mandatory qualification.
    const juryNeeded = rooms.reduce((n, room) => n + Math.max(0, room.juryCount - count(room.id, 'jury')), 0);
    const possible = pool.filter(item => item.possible);
    const otherwise = pool.filter(item => !item.possible);
    const sizeOf = items => items.reduce((n, item) => n + partySize(item.name), 0);
    const expOf = items => items.reduce((n, item) => n + partyExp(item.name), 0);
    const expPool = expOf(pool), totalPool = sizeOf(pool);
    const preferredJurySeats = Math.min(juryNeeded, sizeOf(possible));
    const fromOthers = Math.max(0, juryNeeded - preferredJurySeats);
    const expectedJuryExp = preferredJurySeats * expOf(possible) / (sizeOf(possible) || 1)
      + Math.min(fromOthers, expOf(otherwise));
    const eligibleSpeakers = fixedSpeakers + totalPool - juryNeeded;
    return eligibleSpeakers > 0 ? Math.max(0, Math.min(1,
      (fixedExperienced + expPool - expectedJuryExp) / eligibleSpeakers)) : 0;
  }

  // Search all target rooms *together* when independent room-by-room planning
  // cannot fill them. This prevents scarce groups from being consumed by an
  // earlier room although a full multi-room seating exists. The search retains
  // manual assignments and only moves candidates from their room or the global
  // pool. Its work is bounded to keep the browser responsive on large events.
  function findJointRoomAllocation(roomList, globalRate) {
    const slots = roomList.flatMap(room => [
      'jury', ...teamSlots(room)
    ].map(slot => ({
      room, slot,
      need: (slot === 'jury' ? Math.max(1, room.juryCount) : seatsPerTeam(room)) - count(room.id, slot)
    })).filter(role => role.need > 0));
    if (!slots.length) return { plan: null, limitReached: false };

    const candidatesByName = new Map();
    for (const room of roomList) {
      for (const item of candidatesFor(room, true)) {
        if (!candidatesByName.has(item.name)) candidatesByName.set(item.name, item);
      }
    }
    const candidates = shuffle([...candidatesByName.values()]);
    // Most constrained role first: a jury seat requiring a singleton or a room
    // with only a small local pool must be seated before flexible roles.
    const optionsCount = role => candidates.filter(item =>
      (item.sourceRoom === rootId || item.sourceRoom === role.room.id) && item.size <= role.need).length;
    slots.sort((a, b) => (optionsCount(a) / a.need) - (optionsCount(b) / b.need));
    const required = slots.reduce((n, role) => n + role.need, 0);
    if (candidates.reduce((n, item) => n + item.size, 0) < required) return { plan: null, limitReached: false };

    const options = slots.map(role => candidates.filter(item =>
      (item.sourceRoom === rootId || item.sourceRoom === role.room.id) && item.size <= role.need
    ).sort((a, b) => role.slot === 'jury'
      ? Number(b.possibleJury) - Number(a.possibleJury)
        || (b.possibleJury ? 0 : b.exp - a.exp) || b.size - a.size
      : b.size - a.size));
    const used = new Set(), chosen = [];
    const noSolution = new Set();
    let best = null, work = 0, found = 0, limitReached = false;
    // These limits apply only to the fallback search; normal distribution uses
    // the fast room solver. No changes are committed until a full plan exists.
    // A time bound is essential in a single-threaded offline page: node-count
    // limits alone allow unusually expensive candidate branches to freeze UI.
    const maxWork = 25000, maxPlans = 48, deadline = Date.now() + 900;
    const outOfBudget = () => work >= maxWork || found >= maxPlans ||
      ((work & 63) === 0 && Date.now() >= deadline);
    function feasibleFrom(firstRole) {
      for (let i = firstRole; i < slots.length; i++) {
        const goal = slots[i].need;
        let sums = new Set([0]);
        for (const item of options[i]) {
          if (used.has(item.name)) continue;
          const next = new Set(sums);
          for (const sum of sums) if (sum + item.size <= goal) next.add(sum + item.size);
          sums = next;
          if (sums.has(goal)) break;
        }
        if (!sums.has(goal)) return false;
      }
      return true;
    }
    function recordPlan() {
      const results = new Map();
      let preference = 0, experiencedJury = 0, penalty = 0;
      for (const room of roomList) {
        const picks = chosen.filter(pick => pick.room.id === room.id).map(({ item, slot }) => ({ item, slot }));
        const exp = teamSlots(room).map(slot => getSlotRecords(room)[slot].exp +
          picks.filter(pick => pick.slot === slot).reduce((n, pick) => n + pick.item.exp, 0));
        const juryPreferred = picks.filter(pick => pick.slot === 'jury' && pick.item.possibleJury)
          .reduce((n, pick) => n + pick.item.size, 0);
        const juryExperienced = picks.filter(pick => pick.slot === 'jury' && !pick.item.possibleJury)
          .reduce((n, pick) => n + pick.item.exp, 0);
        preference += juryPreferred;
        experiencedJury += juryExperienced;
        penalty += teamBalancePenalty(room, exp, globalRate);
        results.set(room.id, { complete: true, picks, preference: juryPreferred,
          experiencedJury: juryExperienced, penalty: 0, exp });
      }
      const rates = roomList.flatMap(room => results.get(room.id).exp.map(n => n / seatsPerTeam(room)));
      penalty += 5 * rates.reduce((n, rate) => n + (rate - globalRate) ** 2, 0);
      const candidatePlan = { results, completed: roomList.slice(), juryPreference: preference,
        juryExperienced: experiencedJury, penalty };
      if (!best || preference > best.juryPreference ||
        (preference === best.juryPreference && (experiencedJury > best.juryExperienced ||
        (experiencedJury === best.juryExperienced && (penalty < best.penalty - 1e-9 ||
        (Math.abs(penalty - best.penalty) < 1e-9 && Math.random() < 0.5)))))) best = candidatePlan;
    }
    function search(roleIndex, remaining, offset) {
      if (outOfBudget()) {
        limitReached = true;
        return false;
      }
      work++;
      if (roleIndex >= slots.length) {
        found++;
        recordPlan();
        return true;
      }
      if (!remaining) {
        if (!feasibleFrom(roleIndex + 1)) return false;
        return search(roleIndex + 1, slots[roleIndex + 1]?.need || 0, 0);
      }
      // Memoize only proven impossible states. A search cut short by the limit
      // cannot prove impossibility and must never enter the cache.
      const memoKey = [roleIndex, remaining, offset, [...used].sort().join('\u001f')].join('\u001e');
      if (noSolution.has(memoKey)) return false;
      let any = false;
      const role = slots[roleIndex];
      for (let i = offset; i < options[roleIndex].length; i++) {
        if (outOfBudget()) { limitReached = true; break; }
        const item = options[roleIndex][i];
        if (used.has(item.name) || item.size > remaining) continue;
        used.add(item.name);
        chosen.push({ room: role.room, slot: role.slot, item });
        if (search(roleIndex, remaining - item.size, i + 1)) any = true;
        chosen.pop();
        used.delete(item.name);
      }
      if (!any && !limitReached) noSolution.add(memoKey);
      return any;
    }
    if (feasibleFrom(0)) search(0, slots[0].need, 0);
    return { plan: best, limitReached };
  }

  // A locally excellent room plan can still consume experienced speakers
  // needed in another room's jury. Improve the completed global plan *before*
  // committing any moves: exchange equal-sized groups only, respect origins
  // and manual occupants, and never reduce the volunteer-jury count.
  function improveJointJuryPriority(plan, roomList, globalRate) {
    if (!plan || plan.completed.length !== roomList.length || roomList.length < 2) return plan;
    const results = new Map([...plan.results].map(([id, r]) =>
      [id, { ...r, picks: r.picks.slice() }]));
    const candidates = new Map();
    for (const room of roomList) for (const item of candidatesFor(room, true))
      if (!candidates.has(item.name)) candidates.set(item.name, item);
    const locations = () => {
      const places = new Map();
      for (const room of roomList) for (let i = 0; i < results.get(room.id).picks.length; i++) {
        const pick = results.get(room.id).picks[i];
        places.set(pick.item.name, { room, index: i, pick });
      }
      return places;
    };
    const legal = (item, room) => item.sourceRoom === rootId || item.sourceRoom === room.id;
    const score = item => [item.possibleJury ? item.size : 0,
      item.possibleJury ? 0 : item.exp];
    const scoreDelta = (newItem, oldItem) => {
      const a = score(newItem), b = score(oldItem);
      return [a[0] - b[0], a[1] - b[1]];
    };
    const better = (a, b) => a[0] > b[0] || (a[0] === b[0] && a[1] > b[1]);
    const positive = value => better(value, [0, 0]);
    const maxChanges = roomList.reduce((n, r) => n + r.juryCount, 0);
    for (let change = 0; change < maxChanges * 2; change++) {
      const placed = locations();
      let best = null;
      for (const juryRoom of roomList) {
        const picks = results.get(juryRoom.id).picks;
        for (let j = 0; j < picks.length; j++) {
          const old = picks[j];
          if (old.slot !== 'jury') continue;
          for (const next of candidates.values()) {
            if (next.name === old.item.name || next.size !== old.item.size || !legal(next, juryRoom)) continue;
            const changeScore = scoreDelta(next, old.item);
            if (!positive(changeScore) || (best && !better(changeScore, best.changeScore))) continue;
            const source = placed.get(next.name);
            // A speaker can trade places with the jury member only if the
            // former jury member is allowed in the speaker's original room.
            if (source && (source.pick.slot === 'jury' || !legal(old.item, source.room))) continue;
            best = { juryRoom, j, old, next, source, changeScore };
          }
        }
      }
      if (!best) break;
      results.get(best.juryRoom.id).picks[best.j] = { item: best.next, slot: 'jury' };
      if (best.source) {
        results.get(best.source.room.id).picks[best.source.index] =
          { item: best.old.item, slot: best.source.pick.slot };
      }
    }
    let juryPreference = 0, juryExperienced = 0, penalty = 0;
    for (const room of roomList) {
      const result = results.get(room.id);
      result.preference = result.picks.filter(p => p.slot === 'jury' && p.item.possibleJury)
        .reduce((n, p) => n + p.item.size, 0);
      result.experiencedJury = result.picks.filter(p => p.slot === 'jury' && !p.item.possibleJury)
        .reduce((n, p) => n + p.item.exp, 0);
      result.exp = teamSlots(room).map(slot => getSlotRecords(room)[slot].exp +
        result.picks.filter(p => p.slot === slot).reduce((n, p) => n + p.item.exp, 0));
      result.penalty = teamBalancePenalty(room, result.exp, globalRate);
      juryPreference += result.preference;
      juryExperienced += result.experiencedJury;
      penalty += result.penalty;
    }
    const rates = roomList.flatMap(room => results.get(room.id).exp.map(n => n / seatsPerTeam(room)));
    penalty += 5 * rates.reduce((n, rate) => n + (rate - globalRate) ** 2, 0);
    return { ...plan, results, juryPreference, juryExperienced, penalty };
  }

  function distributeCore(mode, roomId = null) {
    const roomList = roomId ? state.rooms.filter(room => room.id === roomId) : state.rooms;
    const roomOnly = mode === 'rooms';
    if (!roomList.length) return;
    const overfilled = roomList.flatMap(room => [...teamSlots(room), 'jury'].flatMap(slot => {
      const maximum = slot === 'jury' ? Math.max(1, room.juryCount) : seatsPerTeam(room);
      const current = count(room.id, slot);
      return current > maximum ? [{ room, slot, maximum, current }] : [];
    }));
    if (overfilled.length) {
      state.notice = overfilled.map(({ room, slot, maximum, current }) => t('overfilled')
        .replace('{room}', room.displayName || room.id).replace('{slot}', t(slot))
        .replace('{current}', String(current)).replace('{maximum}', String(maximum))).join(' ');
      return { invalid: true, accepted: false };
    }
    const globalRate = globalExperienceRate(roomList);
    // Multiple randomized complete plans make it less likely that an early
    // room takes a group required to fill a later room. Nothing is moved until
    // the best complete plan has been chosen.
    const trials = roomList.length > 1 && !roomId
      ? (roomList.some(room => room.format === 'bpd') ? 2 : 5) : 1;
    let best = null;
    for (let trial = 0; trial < trials; trial++) {
      const order = trial === 0 ? roomList.slice() : shuffle(roomList.slice());
      const used = new Set();
      const results = new Map();
      for (const room of order) {
        const candidates = candidatesFor(room, true)
          .filter(item => !used.has(item.name));
        const result = findCompleteRoomAllocation(room, candidates, globalRate);
        results.set(room.id, result);
        if (result.complete) for (const { item } of result.picks) used.add(item.name);
      }
      const completed = roomList.filter(room => results.get(room.id).complete);
      const juryPreference = completed.reduce((n, room) => n + results.get(room.id).preference, 0);
      const juryExperienced = completed.reduce((n, room) => n + (results.get(room.id).experiencedJury || 0), 0);
      const rates = completed.flatMap(room => teamSlots(room).map((slot, i) =>
        (results.get(room.id).exp || teamSlots(room).map(id => getSlotRecords(room)[id].exp))[i] / seatsPerTeam(room)));
      const acrossRooms = rates.reduce((n, rate) => n + (rate - globalRate) ** 2, 0);
      const penalty = completed.reduce((n, room) => n + results.get(room.id).penalty, 0) + 5 * acrossRooms;
      const candidatePlan = { results, completed, juryPreference, juryExperienced, penalty };
      if (!best || completed.length > best.completed.length
        || (completed.length === best.completed.length && juryPreference > best.juryPreference)
        || (completed.length === best.completed.length && juryPreference === best.juryPreference
          && juryExperienced > best.juryExperienced)
        || (completed.length === best.completed.length && juryPreference === best.juryPreference
          && juryExperienced === best.juryExperienced
          && (penalty < best.penalty - 1e-9
            || (Math.abs(penalty - best.penalty) < 1e-9 && Math.random() < 0.5)))) best = candidatePlan;
    }
    // Unlike random room permutations, the joint fallback can undo earlier
    // room choices to locate a globally possible complete allocation.
    let searchLimitReached = false;
    if (!roomId && roomList.length > 1 && best?.completed.length < roomList.length) {
      const joint = findJointRoomAllocation(roomList, globalRate);
      if (joint.plan) best = joint.plan;
      else searchLimitReached = joint.limitReached;
    }
    if (!best) { state.notice = t('noComplete'); return { invalid: true, accepted: false }; }
    best = improveJointJuryPriority(best, roomList, globalRate);
    // The allocation is transactional: reject an inconsistent candidate plan
    // before moving even a single participant. Manual occupants stay fixed.
    const newlyPlaced = new Set();
    let validPlan = true;
    for (const room of best.completed) {
      const result = best.results.get(room.id);
      if (!result?.complete) { validPlan = false; break; }
      const totals = Object.fromEntries([...teamSlots(room), 'jury'].map(slot => [slot, count(room.id, slot)]));
      for (const { item, slot } of result.picks) {
        if (!Object.hasOwn(totals, slot) || newlyPlaced.has(item.name) ||
            !state.members[item.name] || !['unsorted', 'unsortedJury'].includes(state.members[item.name].slot) ||
            ![rootId, room.id].includes(state.members[item.name].room) ||
            partySize(item.name) !== item.size) { validPlan = false; break; }
        newlyPlaced.add(item.name);
        totals[slot] += item.size;
      }
      if (Object.entries(totals).some(([slot, total]) =>
        total !== (slot === 'jury' ? Math.max(1, room.juryCount) : seatsPerTeam(room)))) validPlan = false;
      if (!validPlan) break;
    }
    if (!validPlan) { state.notice = t('invalidPlan'); return { invalid: true, accepted: false }; }
    const issues = [];
    for (const room of roomList) {
      const result = best.results.get(room.id);
      if (!result.complete) {
        const name = room.displayName || room.id;
        const emptySeats = [...teamSlots(room), 'jury']
          .map(slot => ({ slot, missing: Math.max(0, (slot === 'jury' ? Math.max(1, room.juryCount) : seatsPerTeam(room)) - count(room.id, slot)) }))
          .filter(item => item.missing)
          .map(item => `${t(item.slot)} (${item.missing})`).join(', ');
        const detail = emptySeats ? ' ' + t('missingSlots').replace('{slots}', emptySeats) : '';
        const reason = searchLimitReached ? t('searchLimit')
          : result.available < result.needed
            ? t('needsParticipants').replace('{n}', String(result.needed - result.available))
            : t('groupsPrevent') + ' ' + t('retryHint');
        issues.push(t('partial').replace('{room}', name).replace('{reason}', reason + detail));
        continue;
      }
      for (const { item, slot } of result.picks) {
        moveMember(item.name, room.id, roomOnly && slot !== 'jury' ? 'unsorted' : slot, Infinity, true);
      }
    }
    const completed = best.completed;
    if (completed.length) {
      if (roomOnly) {
        if (!roomId && !issues.length) for (const slot of ['unsorted', 'unsortedJury']) {
          for (const name of listNames(rootId, slot)) {
            const room = completed.reduce((first, current) =>
              count(current.id, 'unsorted') + count(current.id, 'unsortedJury')
                < count(first.id, 'unsorted') + count(first.id, 'unsortedJury') ? current : first);
            moveMember(name, room.id, slot, Infinity, true);
          }
        }
      } else {
        for (const room of completed.filter(room => room.format === 'opd')) {
          for (const slot of ['unsorted', 'unsortedJury']) {
            for (const name of listNames(room.id, slot)) moveMember(name, room.id, 'opd_free_speakers', Infinity, true);
          }
        }
        const opdRooms = completed.filter(room => room.format === 'opd');
        // Leftover potential jurors are speakers only after all jury seats in
        // the planned debates have been filled. An incomplete debate retains
        // access to the global pool for the next distribution attempt.
        if (opdRooms.length && !roomId && !issues.length) {
          for (const slot of ['unsorted', 'unsortedJury']) {
            for (const name of listNames(rootId, slot)) {
              const room = opdRooms.reduce((first, current) =>
                count(current.id, 'opd_free_speakers') < count(first.id, 'opd_free_speakers') ? current : first);
              moveMember(name, room.id, 'opd_free_speakers', Infinity, true);
            }
          }
        }
      }
    }
    state.notice = [...(completed.length ? [t('completion').replace('{n}', String(completed.length))] : [t('noComplete')]), ...issues].join(' ');
    return { accepted: completed.length > 0, completed: completed.length };
  }

  // v1.8: Jury priority takes precedence over preserving a group. First plan
  // normally (the group stays together). If that would leave available volunteer
  // jurors out of the jury, try the smallest necessary group dissolutions and
  // adopt a changed seating ONLY when it increases jury priority without losing
  // fully seated rooms. All alternatives are made against copies of the state.
  function poolSnapshot() {
    return {
      members: Object.fromEntries(Object.entries(state.members).map(([name, member]) =>
        [name, { ...member, children: member.children.slice() }])),
      lists: Object.fromEntries(Object.entries(state.lists).map(([key, names]) => [key, names.slice()])),
      notice: state.notice
    };
  }
  function restorePool(snapshot) {
    state.members = Object.assign(Object.create(null),
      Object.fromEntries(Object.entries(snapshot.members).map(([name, member]) =>
        [name, { ...member, children: member.children.slice() }])));
    state.lists = Object.assign(Object.create(null),
      Object.fromEntries(Object.entries(snapshot.lists).map(([key, names]) => [key, names.slice()])));
    state.notice = snapshot.notice;
  }
  function currentJuryScore(roomList) {
    let volunteer = 0, experienced = 0, completed = 0;
    for (const room of roomList) {
      for (const root of listNames(room.id, 'jury')) {
        for (const name of partyMembers(root)) {
          const member = state.members[name];
          if (member?.volunteeredJury) volunteer++;
          else if (member?.experienced) experienced++;
        }
      }
      if ([...teamSlots(room), 'jury'].every(slot => count(room.id, slot) ===
          (slot === 'jury' ? Math.max(1, room.juryCount) : seatsPerTeam(room)))) completed++;
    }
    return { completed, volunteer, experienced };
  }
  // This is intentionally separate from the team planner. All remaining root
  // groups are assigned to rooms, even when no complete debate is possible.
  // Manual room reservations and already seated teams are never changed.
  function distributeUnsortedToRooms() {
    if (!state.rooms.length) return;
    // Repeated clicks may randomize previous automatic room-only assignments.
    // Explicit manual room reservations are never added to this pool.
    for (const room of state.rooms) for (const slot of ['unsortedJury', 'unsorted']) {
      for (const name of listNames(room.id, slot)) {
        const m = state.members[name];
        if (m?.autoRoom && m.reservedRoom === rootId)
          moveMember(name, rootId, returnPoolSlot(name), Infinity, true);
      }
    }
    const roots = [...listNames(rootId, 'unsortedJury'), ...listNames(rootId, 'unsorted')];
    let moved = 0;
    for (const name of shuffle(roots)) {
      const size = partySize(name);
      // Capacity-aware load balancing; ties randomized. Entire groups stay together.
      const choices = shuffle(state.rooms.slice());
      const roomLoad = room => allSlots(room).reduce((sum, slot) =>
        sum + count(room.id, slot.id), 0);
      const capacity = room => teamSlots(room).length * seatsPerTeam(room) + Math.max(1, room.juryCount);
      choices.sort((a, b) => (roomLoad(a) + size / 2) / capacity(a) -
        (roomLoad(b) + size / 2) / capacity(b));
      const destination = choices[0];
      if (destination && moveMember(name, destination.id, returnPoolSlot(name), Infinity, true)) moved += size;
    }
    state.notice = t('roomsDistributed').replace('{n}', String(moved))
      .replace('{r}', String(state.rooms.length));
  }

  // Only automatic team/jury positions may be replanned. Previously manually
  // reserved room locations survive; global candidates return to global pools.
  function releaseAutomaticSeats(roomId) {
    for (const room of state.rooms.filter(r => !roomId || r.id === roomId)) {
      for (const slot of [...teamSlots(room), 'jury', ...(room.format === 'opd' ? ['opd_free_speakers'] : [])]) {
        for (const name of listNames(room.id, slot)) {
          const member = state.members[name];
          if (!member?.autoSeat) continue;
          const destination = member.reservedRoom &&
            (member.reservedRoom === rootId || findRoom(member.reservedRoom))
            ? member.reservedRoom : rootId;
          moveMember(name, destination, returnPoolSlot(name), Infinity, true);
        }
      }
    }
    // An automatic room-only allocation is not a lasting room reservation.
    // It should not obstruct a later global replan.
    if (!roomId) for (const room of state.rooms) for (const slot of ['unsortedJury', 'unsorted']) {
      for (const name of listNames(room.id, slot)) {
        const member = state.members[name];
        if (member?.autoRoom && member.reservedRoom === rootId)
          moveMember(name, rootId, returnPoolSlot(name), Infinity, true);
      }
    }
  }

  // The priority check covers EVERY room, including unassigned volunteers
  // reserved in a different room. Explicitly fixed manual teams/juries are
  // exempt, but a lower-priority automatic juror is never allowed ahead of an
  // eligible volunteer (or ahead of an experienced non-volunteer).
  function globalJuryPrioritySatisfied() {
    let waitingVol = 0, waitingExp = 0, autoNonVol = 0, autoNovice = 0;
    for (const [name, member] of Object.entries(state.members)) {
      if (member.parent) continue;
      const party = partyMembers(name);
      const autoSeat = !!member.autoSeat;
      if (member.slot === 'jury') {
        if (!autoSeat) continue;
        for (const person of party) {
          const juror = state.members[person];
          if (!juror?.volunteeredJury) {
            autoNonVol++;
            if (!juror?.experienced) autoNovice++;
          }
        }
      } else if (['unsorted', 'unsortedJury'].includes(member.slot) || autoSeat) {
        for (const person of party) {
          const candidate = state.members[person];
          if (candidate?.volunteeredJury) waitingVol++;
          else if (candidate?.experienced) waitingExp++;
        }
      }
    }
    return !(waitingVol && autoNonVol) &&
      !(waitingExp && autoNovice && !waitingVol);
  }

  function currentJuryScoreFromSnapshot(snapshot, rooms) {
    const after = poolSnapshot();
    restorePool(snapshot);
    const countCompleted = currentJuryScore(rooms).completed;
    restorePool(after);
    return countCompleted;
  }

  // Rescue a complete-but-suboptimal distribution by committing the highest
  // available jury tiers FIRST, rather than accepting a room-wise optimum and
  // attempting size-preserving swaps after the fact. In particular, two
  // volunteer singletons can replace a non-volunteer two-person jury group.
  // All attempts are transactional and use only unseated party roots. Manually
  // placed speakers, jurors, groups and room reservations are never moved.
  function findPriorityFirstPlan(before, rooms, mode, scoreIsValid, minimumCompleted) {
    if (mode !== 'teams' || !rooms.length) return null;
    const ids = new Set(rooms.map(room => room.id));
    const cutoff = Date.now() + (rooms.length >= 7 ? 3500 : 1500);
    const trials = rooms.length >= 7 ? 10 : 12;
    for (let attempt = 0; attempt < trials; attempt++) {
      if (Date.now() > cutoff && attempt > 0) break;
      restorePool(before);
      // Only on later attempts, allow dissolution of a waiting group containing
      // volunteers who could not otherwise compete for an individual jury seat.
      if (attempt >= 5) for (const room of rooms) {
        for (const source of [rootId, room.id]) for (const slot of ['unsorted', 'unsortedJury']) {
          for (const name of listNames(source, slot)) {
            if (partySize(name) > 1 && partyMembers(name).some(person =>
              state.members[person]?.volunteeredJury)) unlink(name);
          }
        }
      }
      const remaining = new Map(rooms.map(room =>
        [room.id, Math.max(0, room.juryCount - count(room.id, 'jury'))]));
      const roots = new Map();
      for (const room of rooms) for (const item of candidatesFor(room, true))
        if (!roots.has(item.name)) roots.set(item.name, item);
      const items = shuffle([...roots.values()]);
      const tier = item => item.possibleJury ? 0
        : item.exp === item.size ? 1 : item.exp ? 2 : 3;
      // Among equally prioritized candidates use alternating size preference.
      items.sort((a, b) => tier(a) - tier(b)
        || (a.sourceRoom === rootId ? 1 : 0) - (b.sourceRoom === rootId ? 1 : 0)
        || (attempt % 2 ? a.size - b.size : b.size - a.size));
      const roomFor = item => {
        const options = shuffle(rooms.filter(room =>
          ids.has(room.id) && remaining.get(room.id) >= item.size &&
          (item.sourceRoom === rootId || item.sourceRoom === room.id)));
        // Fill the most constrained jury capacities first for singleton parties;
        // for larger parties prefer rooms with enough remaining seats.
        options.sort((a, b) => item.size === 1
          ? remaining.get(a.id) - remaining.get(b.id)
          : remaining.get(b.id) - remaining.get(a.id));
        return options[0];
      };
      for (const item of items) {
        const room = roomFor(item);
        if (!room) continue;
        if (!moveMember(item.name, room.id, 'jury', Infinity, true)) continue;
        remaining.set(room.id, remaining.get(room.id) - item.size);
        if (![...remaining.values()].some(n => n > 0)) break;
      }
      // A strictly seeded jury is meaningful only when all vacant jury seats
      // are filled; otherwise leave existing planner/fallback semantics intact.
      if ([...remaining.values()].some(n => n > 0)) continue;
      const result = distributeCore(mode);
      if (!result?.accepted) continue;
      const score = currentJuryScore(rooms);
      if (score.completed >= minimumCompleted && scoreIsValid(score)) {
        const snapshot = poolSnapshot();
        restorePool(before);
        return { snapshot, score };
      }
    }
    restorePool(before);
    return null;
  }

  function distributeAttempt(mode, roomId = null) {
    if (mode === 'rooms') { distributeUnsortedToRooms(); return { accepted: true }; }
    const original = poolSnapshot();
    // Reject a candidate without leaving behind temporary list entries, dissolved
    // groups, released automatic seats or a success result from a rolled-back plan.
    const rejectAttempt = reason => {
      restorePool(original);
      state.notice = reason || t('unchangedPlan');
      return { accepted: false };
    };
    releaseAutomaticSeats(roomId);
    const rooms = roomId ? state.rooms.filter(room => room.id === roomId) : state.rooms;
    if (!rooms.length) return rejectAttempt(t('unchangedPlan'));
    // Manual positions are not candidates and are never moved for jury priority.
    const roots = new Set();
    for (const room of rooms) for (const source of [rootId, room.id])
      for (const slot of ['unsortedJury', 'unsorted'])
        for (const name of listNames(source, slot)) if (partySize(name) > 1) roots.add(name);
    // Always verify jury priorities, even if every participant is ungrouped.
    // Otherwise local room assignments can silently put non-volunteers into
    // juries while volunteers remain available in other rooms.

    const available = new Set();
    // Global priority also applies to single-room operations.
    for (const room of state.rooms) for (const slot of ['unsortedJury', 'unsorted'])
      for (const name of listNames(room.id, slot))
        for (const person of partyMembers(name)) available.add(person);
    for (const root of roots) for (const name of partyMembers(root)) available.add(name);
    // Include single candidates as well: if they fill every available jury seat,
    // there is no reason to dissolve any groups.
    for (const room of rooms) for (const source of [rootId, room.id])
      for (const slot of ['unsortedJury', 'unsorted'])
        for (const name of listNames(source, slot)) for (const person of partyMembers(name)) available.add(person);
    const seats = rooms.reduce((n, room) => n + Math.max(0,
      room.juryCount - count(room.id, 'jury')), 0);
    // Differentiate a real headcount shortage from groups that cannot be
    // fitted into the free places. Count each eligible person exactly once,
    // even when the global pool is a candidate for several rooms.
    const eligiblePeople = new Set();
    for (const room of rooms) for (const source of [rootId, room.id])
      for (const slot of ['unsorted', 'unsortedJury'])
        for (const root of listNames(source, slot))
          for (const person of partyMembers(root)) eligiblePeople.add(person);
    const requiredPeople = rooms.reduce((sum, room) => sum +
      [...teamSlots(room), 'jury'].reduce((n, slot) => n + Math.max(0,
        (slot === 'jury' ? Math.max(1, room.juryCount) : seatsPerTeam(room)) - count(room.id, slot)), 0), 0);
    const headcountShortage = Math.max(0, requiredPeople - eligiblePeople.size);
    const initialScore = currentJuryScore(rooms);
    const initialJuryOccupancy = rooms.reduce((n, room) => n + count(room.id, 'jury'), 0);
    const volunteersAvailable = [...available].filter(name => state.members[name]?.volunteeredJury).length;
    const experiencedAvailable = [...available].filter(name =>
      !state.members[name]?.volunteeredJury && state.members[name]?.experienced).length;
    const maxVolunteer = initialScore.volunteer + Math.min(seats, volunteersAvailable);
    const maxExperienced = initialScore.experienced + Math.min(
      Math.max(0, seats - (maxVolunteer - initialScore.volunteer)), experiencedAvailable);
    // A partial allocation should only be rejected when it *actually* seats a
    // lower-priority new juror ahead of an available higher-priority person.
    // Unfilled juror seats in other rooms are not themselves a violation.
    function juryPrioritySatisfied(score) {
      const occupiedNow = rooms.reduce((n, room) => n + count(room.id, 'jury'), 0);
      const newlySeated = Math.max(0, occupiedNow - initialJuryOccupancy);
      const expectedVolunteers = Math.min(newlySeated, volunteersAvailable);
      const expectedExperienced = Math.min(newlySeated - expectedVolunteers, experiencedAvailable);
      // A global postcondition additionally catches participants who have
      // been automatically placed as speakers or are in other room pools.
      return score.volunteer >= initialScore.volunteer + expectedVolunteers &&
        score.experienced >= initialScore.experienced + expectedExperienced &&
        globalJuryPrioritySatisfied();
    }
    const before = poolSnapshot();
    const initialOutcome = distributeCore(mode, roomId);
    const initialFailureNotice = state.notice;
    if (initialOutcome?.invalid) return rejectAttempt(initialFailureNotice);
    let appliedValidPlan = Boolean(initialOutcome?.accepted);
    let best = poolSnapshot();
    let bestScore = currentJuryScore(rooms);
    // Lack of a complete room is not, by itself, evidence of a jury priority
    // conflict: groups may simply not fit the remaining team positions.
    const failureReason = () => {
      if (headcountShortage)
        return t('needsParticipants').replace('{n}', String(headcountShortage));
      if (roots.size) return t('groupFitConflict');
      return bestScore.completed === 0 && !initialOutcome?.accepted
        ? initialFailureNotice || t('unchangedPlan') : t('juryPriorityConflict');
    };
    // If the fast independent-room solver stranded available volunteers in
    // speaker slots, try jury-first complete plans before splitting groups or
    // rejecting an otherwise feasible 100-person debate.
    if (!roomId && !juryPrioritySatisfied(bestScore)) {
      const rescue = findPriorityFirstPlan(before, rooms, mode, juryPrioritySatisfied,
        bestScore.completed);
      if (rescue) {
        appliedValidPlan = true;
        best = rescue.snapshot;
        bestScore = rescue.score;
        restorePool(best);
      } else {
        restorePool(best);
      }
    }
    // Do not disturb intact groups if the strict jury priorities were already met.
    if (juryPrioritySatisfied(bestScore)) {
      if (bestScore.completed < currentJuryScoreFromSnapshot(original, rooms))
        return rejectAttempt(t('unchangedPlan'));
      // A solver may have reported zero completed rooms; do not expose such a
      // discarded plan as accepted, or retain any of its temporary list keys.
      if (!appliedValidPlan || bestScore.completed === 0)
        return rejectAttempt(failureReason());
      return { accepted: true };
    }

    const candidates = [...roots].filter(root => partyMembers(root).some(name =>
      state.members[name]?.volunteeredJury && bestScore.volunteer < maxVolunteer
      || (!state.members[name]?.volunteeredJury && state.members[name]?.experienced
          && bestScore.volunteer >= maxVolunteer && bestScore.experienced < maxExperienced)));
    if (!candidates.length) {
      // Diagnose the failed candidate while it is active. Checking priority
      // AFTER restoring the original plan previously turned failure into success
      // and created new empty lists in the restored state.
      return rejectAttempt(failureReason());
    }
    // Only separate as many groups as seem necessary. If the smallest set
    // cannot yield a valid allocation, try all eligible groups as a fallback.
    const needVolunteers = bestScore.volunteer < maxVolunteer;
    const missing = needVolunteers ? maxVolunteer - bestScore.volunteer
      : maxExperienced - bestScore.experienced;
    const priorityMembers = root => partyMembers(root).filter(name =>
      needVolunteers ? state.members[name].volunteeredJury
        : !state.members[name].volunteeredJury && state.members[name].experienced).length;
    const sorted = shuffle(candidates.slice()).sort((a, b) =>
      priorityMembers(b) - priorityMembers(a));
    const subset = [];
    let freed = 0;
    for (const root of sorted) {
      if (freed >= missing) break;
      subset.push(root);
      freed += priorityMembers(root);
    }
    const trials = [
      ...(candidates.length <= 5 ? candidates.map(name => [name]) : []),
      ...(subset.length > 1 ? [subset] : candidates.length > 5 ? [subset] : []),
      ...(subset.length !== candidates.length ? [candidates] : [])
    ];
    for (const splitRoots of trials) {
      restorePool(before);
      for (const root of splitRoots) if (state.members[root]?.children.length) unlink(root);
      const attemptOutcome = distributeCore(mode, roomId);
      if (!attemptOutcome?.accepted) continue;
      const score = currentJuryScore(rooms);
      const better = score.completed >= bestScore.completed &&
        (score.volunteer > bestScore.volunteer ||
          (score.volunteer === bestScore.volunteer && score.experienced > bestScore.experienced));
      if (better) { best = poolSnapshot(); bestScore = score; appliedValidPlan = true; }
      // The upper bound is reached, so additional group splits are unnecessary.
      if (bestScore.volunteer >= maxVolunteer && bestScore.experienced >= maxExperienced) break;
    }
    // Do not silently report a completed debate that placed a lower-priority
    // juror ahead of an available higher-priority candidate. Manual seats are
    // exempt, as agreed; otherwise request an adjustment instead.
    // The last trial is not necessarily the best candidate. Validate priority
    // against exactly the snapshot being considered for adoption.
    restorePool(best);
    if (!juryPrioritySatisfied(bestScore)) return rejectAttempt(failureReason());
    if (bestScore.completed < currentJuryScoreFromSnapshot(original, rooms))
      return rejectAttempt(t('unchangedPlan'));
    if (!appliedValidPlan || bestScore.completed === 0)
      return rejectAttempt(failureReason());
    return { accepted: true };
  }

  // Preflight counts only MANUALLY reserved party roots. Automatic occupants
  // may be removed and replanned, so they must not cause a false overfill.
  function manualCapacityConflict(rooms) {
    const violations = [];
    for (const room of rooms) for (const slot of [...teamSlots(room), 'jury']) {
      const maximum = slot === 'jury' ? Math.max(1, room.juryCount) : seatsPerTeam(room);
      const current = listNames(room.id, slot)
        .filter(name => state.members[name] && !state.members[name].autoSeat)
        .reduce((n, name) => n + partySize(name), 0);
      if (current > maximum) violations.push(t('overfilled')
        .replace('{room}', room.displayName || room.id).replace('{slot}', t(slot))
        .replace('{current}', String(current)).replace('{maximum}', String(maximum)));
    }
    return violations.join(' ');
  }

  // Check invariants before accepting a plan produced in a scratch state.
  // This also catches future regressions in fallback or group splitting code.
  function allocationStateValid(original, rooms) {
    const beforeNames = Object.keys(original.members).sort();
    if (JSON.stringify(beforeNames) !== JSON.stringify(Object.keys(state.members).sort())) return false;
    const listed = [];
    for (const [key, entries] of Object.entries(state.lists)) for (const name of entries) {
      const member = state.members[name];
      if (!member || member.parent || listKey(member.room, member.slot) !== key) return false;
      listed.push(name);
    }
    const rootNames = beforeNames.filter(name => !state.members[name].parent);
    if (listed.length !== rootNames.length || new Set(listed).size !== listed.length ||
        rootNames.some(name => !listed.includes(name))) return false;
    for (const name of beforeNames) {
      const m = state.members[name];
      if (m.parent && (!state.members[m.parent] ||
        !state.members[m.parent].children.includes(name))) return false;
      if (new Set(m.children).size !== m.children.length ||
        m.children.some(child => !state.members[child] || state.members[child].parent !== name)) return false;
      const previous = original.members[name];
      if (!previous.parent && !previous.autoSeat && !['unsorted', 'unsortedJury'].includes(previous.slot)) {
        // A manually occupied position is an absolute reservation.
        if (m.parent || m.room !== previous.room || m.slot !== previous.slot || m.autoSeat) return false;
      }
    }
    for (const room of rooms) for (const slot of [...teamSlots(room), 'jury']) {
      const maximum = slot === 'jury' ? Math.max(1, room.juryCount) : seatsPerTeam(room);
      if (count(room.id, slot) > maximum) return false;
    }
    return true;
  }

  // Build diagnostics ONLY from the restored, visible plan. A rejected
  // attempt may temporarily release automatic seats, so its pre-rollback
  // "open slots" message is not a reliable description of the displayed UI.
  // Reading lists directly also avoids creating empty lists while reporting.
  function restoredPlanNotice(attemptNotice, rooms) {
    const currentCount = (room, slot) =>
      (state.lists[listKey(room.id, slot)] || []).reduce((total, name) => total + partySize(name), 0);
    const missingByRoom = rooms.map(room => {
      const missing = [...teamSlots(room), 'jury'].map(slot => {
        const capacity = slot === 'jury' ? Math.max(1, room.juryCount) : seatsPerTeam(room);
        return { slot, missing: Math.max(0, capacity - currentCount(room, slot)) };
      }).filter(entry => entry.missing);
      return { room, missing };
    });
    const missingTotal = missingByRoom.reduce((n, entry) =>
      n + entry.missing.reduce((sum, slot) => sum + slot.missing, 0), 0);
    const available = new Set();
    for (const room of [{ id: rootId }, ...rooms]) {
      for (const slot of ['unsorted', 'unsortedJury'])
        for (const name of state.lists[listKey(room.id, slot)] || []) available.add(name);
      // Automatically assigned optional free speeches can be replanned;
      // explicitly reserved free speeches must remain protected.
      if (room.id !== rootId && room.format === 'opd')
        for (const name of state.lists[listKey(room.id, 'opd_free_speakers')] || [])
          if (state.members[name]?.autoSeat) available.add(name);
    }
    const peopleAvailable = [...available].reduce((n, name) => n + partySize(name), 0);
    const shortage = Math.max(0, missingTotal - peopleAvailable);
    const specialReason = [t('juryPriorityConflict'), t('groupFitConflict'), t('invalidPlan')].includes(attemptNotice);
    let explanation = specialReason ? attemptNotice : t('unchangedPlan');
    if (!specialReason && shortage)
      explanation += ' ' + t('needsParticipants').replace('{n}', String(shortage));
    else if (!specialReason && missingTotal)
      explanation += ' ' + (attemptNotice.includes(t('searchLimit')) ? t('searchLimit') : t('retryHint'));
    const details = missingByRoom.filter(entry => entry.missing.length).map(({ room, missing }) => {
      const slots = missing.map(({ slot, missing: number }) => `${t(slot)} (${number})`).join(', ');
      return t('partial').replace('{room}', room.displayName || room.id)
        .replace('{reason}', t('missingSlots').replace('{slots}', slots));
    });
    return [explanation, ...details].join(' ');
  }

  // All candidate calculations take place on copied state. Commit the result
  // only if the requested operation succeeds, then keep a recoverable baseline
  // for failed planning attempts, including unexpected validation failures.
  function distribute(mode, roomId = null) {
    const original = poolSnapshot();
    const rooms = roomId ? state.rooms.filter(room => room.id === roomId) : state.rooms;
    if (mode !== 'rooms') {
      if (!rooms.length) return;
      const invalid = manualCapacityConflict(rooms);
      if (invalid) { restorePool(original); state.notice = invalid; return; }
    }
    try {
      const result = distributeAttempt(mode, roomId);
      const oldComplete = mode === 'rooms' ? 0 : currentJuryScoreFromSnapshot(original, rooms);
      const newComplete = mode === 'rooms' ? 0 : currentJuryScore(rooms).completed;
      const valid = allocationStateValid(original, rooms);
      const lostCompletedRoom = mode !== 'rooms' && newComplete < oldComplete;
      // A partial replan that does not complete any additional room should
      // not scramble existing automatic seats simply because another room
      // was already fully occupied by manual reservations.
      const partialWithoutProgress = mode !== 'rooms' && oldComplete > 0 &&
        newComplete < rooms.length && newComplete <= oldComplete;
      if (!result?.accepted || !valid || lostCompletedRoom || partialWithoutProgress) {
        const reason = !valid ? t('invalidPlan')
          : lostCompletedRoom || partialWithoutProgress ? t('unchangedPlan')
            : state.notice && !state.notice.startsWith(t('completion'))
              ? state.notice : t('unchangedPlan');
        restorePool(original);
        state.notice = mode === 'rooms' ? reason : restoredPlanNotice(reason, rooms);
      }
    } catch (error) {
      restorePool(original);
      state.notice = t('invalidPlan');
      console.error('Distribution rolled back', error);
    }
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
    chevron: '<path d="m6 9 6 6 6-6"/>',
    edit: '<path d="M12 20h9M17 3l4 4-12 12-4 1 1-4z"/>',
    juror: '<circle cx="9" cy="7" r="3"/><path d="M3 20v-2c0-4 12-4 12 0v2M17 11l2 2 3-4"/>'
  };
  const svg = (key, size = 20) => `<svg class="mdi-icon" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[key] || ''}</svg>`;
  const iconButton = (action, name, iconName, extras = '', classes = '') => `<button type="button" class="icon-btn ${classes}" data-action="${action}" title="${escAttr(name)}" aria-label="${escAttr(name)}" ${extras}>${svg(iconName)}</button>`;

  function memberHtml(name, isChild = false) {
    const m = state.members[name];
    if (!m) return '';
    return `<div class="member ${m.experienced ? '' : 'new'} ${state.selected === name ? 'selected' : ''} ${isChild ? 'child-member' : ''}" role="button" tabindex="0" draggable="true" data-member="${escAttr(name)}" title="${escAttr(t('ungroup'))}">
      <span class="member-name">${escapeHtml(name)}</span>
      <button type="button" data-action="edit-member" data-name="${escAttr(name)}" aria-label="${escAttr(t('edit') + ' ' + name)}" title="${escAttr(t('edit'))}">${svg('edit', 14)}</button>
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
        <label class="experience-toggle" title="${t('experienced')} / ${t('inexperienced')}"><input type="checkbox" name="experienced" ${state.entryExperienced ? 'checked' : ''} aria-label="${t('experienced')}"><span class="form-icon">${svg('school', 18)}</span></label>
        <label class="volunteer-toggle" title="${t('juryVolunteer')}"><input type="checkbox" name="volunteer" ${state.entryVolunteer ? 'checked' : ''}><span>${svg('juror', 17)} ${t('jury')}</span></label>
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
  function roomOverview(room) {
    const required = teamSlots(room).length * seatsPerTeam(room) + Math.max(1, room.juryCount);
    const occupied = [...teamSlots(room), 'jury'].reduce((n, slot) => n + count(room.id, slot), 0);
    const inRoom = allSlots(room).reduce((n, slot) => n + count(room.id, slot.id), 0);
    const heading = room.displayName || `${t('room')} ${room.id}`;
    return `<div class="board-overview"><strong>${escapeHtml(heading)}</strong><span>${room.format === 'opd' ? 'OPD' : 'BPS'} · ${t('roomPeople')}: ${inRoom}</span><span class="seat-progress ${occupied === required ? 'complete' : ''}">${t('mandatorySeats')}: ${occupied}/${required}</span></div>`;
  }
  function render() {
    document.documentElement.lang = state.lang;
    document.documentElement.dataset.theme = state.dark ? 'dark' : 'light';
    document.title = t('title');
    const root = document.getElementById('app');
    if (!root) return;
    const scrollPositions = new Map();
    for (const row of root.querySelectorAll('.room-row')) {
      const roomId = row.querySelector('.slot[data-room]')?.dataset.room;
      const board = row.querySelector('.board');
      if (roomId && board) scrollPositions.set(roomId,
        { left: board.scrollLeft, top: board.scrollTop });
    }
    const rootRoom = { id: rootId };
    root.innerHTML = `<header class="app-bar"><div class="nav">
        <h1>${t('title')}</h1>
        <div class="toolbar">
          <div class="language-wrap"><button type="button" class="top-icon language-trigger" id="language-trigger" title="${t('lang')}" aria-label="${t('lang')}" aria-expanded="false">${svg('globe', 24)}</button>
            <select id="language" aria-label="${t('lang')}"><option value="de" ${state.lang === 'de' ? 'selected' : ''}>Deutsch</option><option value="en" ${state.lang === 'en' ? 'selected' : ''}>English</option></select>
          </div>
          <button type="button" class="top-icon" data-action="theme" title="${t('theme')}" aria-label="${t('theme')}">${svg('theme', 24)}</button>
          <a class="top-icon" href="https://github.com/K27-07/debattenplaner" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">${svg('github', 24)}</a>
        </div>
      </div></header>
      <main class="content">
        ${state.notice ? `<div class="distribution-notice" role="status">${escapeHtml(state.notice)}</div>` : ''}
        ${state.selected ? `<div class="selected-hint"><strong>${t('selected')}: ${escapeHtml(state.selected)}</strong> <button type="button" data-action="clear-selection">${t('cancel')}</button></div>` : ''}
        <div class="room-row global-row">
          <div class="board global-board"><div class="board-overview global-summary"><strong>${t('present')}: ${Object.keys(state.members).length}</strong><span>${t('available')}: ${count(rootId, 'unsorted') + count(rootId, 'unsortedJury')}</span></div><div class="slots" style="--columns:2">${visibleSlots(rootRoom).map(slot => slotHtml(rootRoom, slot)).join('')}</div></div>
        </div>
        ${state.rooms.map((room, idx) => `<div class="room-row">${settingsHtml(room, idx)}
          <div class="board">${roomOverview(room)}<div class="slots" style="--columns:${visibleSlots(room).length}">${visibleSlots(room).map(slot => slotHtml(room, slot)).join('')}</div></div></div>`).join('')}
      </main>`;
    for (const row of root.querySelectorAll('.room-row')) {
      const roomId = row.querySelector('.slot[data-room]')?.dataset.room;
      const position = scrollPositions.get(roomId);
      const board = row.querySelector('.board');
      if (position && board) {
        board.scrollLeft = position.left;
        board.scrollTop = position.top;
      }
    }
  }

  const app = document.getElementById('app');
  if (!app) return;
  // A click on a participant must NOT rerender its DOM node: doing so between
  // the two click events suppresses the browser's native dblclick event.
  // Update only the selection marker and its per-slot controls instead.
  function refreshSelectionUI() {
    if (state.selected && !state.members[state.selected]) state.selected = null;
    for (const chip of app.querySelectorAll('.member[data-member]'))
      chip.classList.toggle('selected', chip.dataset.member === state.selected);
    const content = app.querySelector('.content');
    if (!content) return;
    let hint = content.querySelector('.selected-hint');
    if (state.selected) {
      if (!hint) {
        hint = document.createElement('div');
        hint.className = 'selected-hint';
        content.insertBefore(hint, content.querySelector('.room-row'));
      }
      hint.innerHTML = `<strong>${escapeHtml(t('selected'))}: ${escapeHtml(state.selected)}</strong> <button type="button" data-action="clear-selection">${escapeHtml(t('cancel'))}</button>`;
    } else if (hint) hint.remove();
    for (const section of app.querySelectorAll('.slot[data-room][data-slot]')) {
      const controls = section.querySelector('.slot-controls');
      if (!controls) continue;
      const old = controls.querySelector('.place-btn');
      if (!state.selected) { if (old) old.remove(); continue; }
      if (!old) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'place-btn';
        button.dataset.action = 'place';
        button.dataset.room = section.dataset.room;
        button.dataset.slot = section.dataset.slot;
        button.textContent = t('placeHere');
        controls.append(button);
      }
    }
  }
  function openMemberEditor(name) {
    const m = state.members[name];
    if (!m) return;
    app.querySelector('#edit-member-dialog')?.remove();
    const dialog = document.createElement('dialog');
    dialog.id = 'edit-member-dialog';
    dialog.className = 'edit-dialog';
    dialog.dataset.original = name;
    dialog.innerHTML = `<form id="edit-member-form" autocomplete="off">
      <h2>${t('editParticipant')}</h2>
      <label class="edit-line"><span>${t('name')}</span><input id="edit-name" type="text" maxlength="160" required value="${escAttr(name)}"></label>
      <label class="edit-option"><input id="edit-experienced" type="checkbox" ${m.experienced ? 'checked' : ''}><span>${t('experienced')}</span></label>
      <label class="edit-option"><input id="edit-volunteer" type="checkbox" ${m.volunteeredJury ? 'checked' : ''}><span>${t('juryVolunteer')}</span></label>
      <p class="edit-error" role="alert" aria-live="assertive"></p>
      <div class="edit-actions"><button type="button" data-action="cancel-edit">${t('cancelEdit')}</button><button type="submit" class="primary-edit">${t('save')}</button></div>
    </form>`;
    dialog.addEventListener('close', () => dialog.remove(), { once: true });
    app.append(dialog);
    dialog.showModal();
    dialog.querySelector('#edit-name')?.focus();
  }
  addRoom();
  render();

  // Event delegation keeps drag source mounted throughout dragging.
  app.addEventListener('submit', event => {
    if (event.target?.id === 'edit-member-form') {
      event.preventDefault();
      const dialog = event.target.closest('dialog');
      const result = updateMember(dialog.dataset.original,
        dialog.querySelector('#edit-name').value,
        dialog.querySelector('#edit-experienced').checked,
        dialog.querySelector('#edit-volunteer').checked);
      if (result) {
        dialog.querySelector('.edit-error').textContent =
          result === 'duplicate' ? t('duplicateName') : t('invalid');
        return;
      }
      dialog.close();
      render();
      return;
    }
    if (event.target?.id !== 'new-member') return;
    event.preventDefault();
    const form = event.target;
    const name = form.elements['member-name'].value;
    const experienced = form.elements.experienced.checked;
    const volunteered = form.elements.volunteer.checked;
    if (addMember(name, experienced, volunteered)) {
      // Each new check-in starts from safe defaults. The choices above apply
      // only to the person just entered, never implicitly to the next person.
      state.entryExperienced = true;
      state.entryVolunteer = false;
      state.notice = '';
      render();
      // Repeated names can be entered without having to click the input again.
      app.querySelector('#member-name')?.focus();
    }
  });
  app.addEventListener('change', event => {
    if (event.target?.id === 'language') {
      state.lang = event.target.value === 'en' ? 'en' : 'de'; render(); return;
    }
    if (event.target?.name === 'experienced') {
      state.entryExperienced = event.target.checked;
      event.target.closest('.new-member')?.classList.toggle('new', !event.target.checked);
      return;
    }
    if (event.target?.name === 'volunteer') {
      state.entryVolunteer = event.target.checked;
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
      const heading = el.closest('.room-row')?.querySelector('.board-overview strong');
      if (heading) heading.textContent = room.displayName || t('room') + ' ' + room.id;
    }
  });
  app.addEventListener('click', event => {
    const action = event.target.closest('button[data-action]');
    if (action) {
      const { room, slot, name } = action.dataset;
      if (action.dataset.action === 'edit-member') { openMemberEditor(name); return; }
      if (action.dataset.action === 'cancel-edit') {
        action.closest('dialog')?.close(); return;
      }
      // A prior distribution status describes an earlier allocation only.
      // Manual changes invalidate it; cosmetic actions and distribution
      // commands preserve their own handling of status messages.
      if (['add-room', 'add-room-after', 'delete-room', 'move-room',
        'delete-member', 'retrieve-all', 'retrieve-room', 'place'].includes(action.dataset.action)) {
        state.notice = '';
      }
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
          if (state.selected) moveSingleMember(state.selected, room, slot);
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
      if (addChild(name, state.selected)) state.notice = '';
      state.selected = null;
    } else {
      state.selected = state.selected === name ? null : name;
      refreshSelectionUI();
      return;
    }
    render();
  });
  app.addEventListener('dblclick', event => {
    const chip = event.target.closest('[data-member]');
    if (!chip) return;
    unlink(chip.dataset.member);
    state.notice = '';
    state.selected = null;
    render();
  });
  app.addEventListener('keydown', event => {
    const chip = event.target.closest('[data-member]');
    if (!chip || event.target.closest('button')) return;
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      unlink(chip.dataset.member);
      state.notice = '';
      state.selected = null;
      render();
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); chip.click();
    }
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
      moveSingleMember(name, slot.dataset.room, slot.dataset.slot, position);
    }
    state.notice = '';
    state.dragging = null;
    state.selected = null;
    render();
  });
  app.addEventListener('dragend', () => {
    state.dragging = null;
    app.querySelectorAll('.slot.over,.party.merge-target,.member.dragging')
      .forEach(el => el.classList.remove('over', 'merge-target', 'dragging'));
  });

  // v1.9: A normal finger swipe must scroll even when started on a chip.
  // Touch Events allow preventDefault ONLY after the long-press activates
  // dragging; Pointer Events with touch-action:none blocked scrolling.
  // Pen input still uses Pointer Events. Mouse drag uses HTML Drag-and-drop.
  const touchHoldMs = 350;
  const touchMoveTolerance = 12;
  let touchDrag = null;
  let suppressedTouchClick = null;

  function clearDropHighlights() {
    app.querySelectorAll('.slot.over,.party.merge-target')
      .forEach(el => el.classList.remove('over', 'merge-target'));
  }

  function findTouchTarget(x, y, name) {
    const hit = document.elementFromPoint(x, y);
    const slot = hit?.closest('.slot[data-room][data-slot]');
    if (!slot) return null;
    const party = hit.closest('[data-party]');
    const merge = party && rootOf(party.dataset.party) !== rootOf(name) ? party : null;
    return { slot, merge };
  }

  function positionTouchGhost(drag) {
    if (!drag.ghost) return;
    drag.ghost.style.left = `${drag.x}px`;
    drag.ghost.style.top = `${drag.y - 12}px`;
  }

  function markTouchTarget(drag) {
    clearDropHighlights();
    drag.target = findTouchTarget(drag.x, drag.y, drag.name);
    if (drag.target?.merge) drag.target.merge.classList.add('merge-target');
    else drag.target?.slot.classList.add('over');
  }

  function touchAutoScroll(drag) {
    // Horizontally scroll long OPD/BPS tables under the held participant.
    const edge = 48;
    const hit = document.elementFromPoint(drag.x, drag.y);
    const board = hit?.closest('.board');
    let scrolled = false;
    if (board && board.scrollWidth > board.clientWidth) {
      const r = board.getBoundingClientRect();
      const left = drag.x - r.left, right = r.right - drag.x;
      const delta = left < edge ? -14 : right < edge ? 14 : 0;
      if (delta) {
        const before = board.scrollLeft;
        board.scrollLeft += delta;
        scrolled = board.scrollLeft !== before;
      }
    }
    // Also allow dragging between the global list and far-away rooms.
    const height = window.innerHeight;
    const dy = drag.y < edge ? -12 : drag.y > height - edge ? 12 : 0;
    if (dy) {
      const before = window.scrollY;
      window.scrollBy(0, dy);
      scrolled ||= window.scrollY !== before;
    }
    if (scrolled) markTouchTarget(drag);
    if (touchDrag === drag && drag.active)
      drag.frame = window.requestAnimationFrame(() => touchAutoScroll(drag));
  }

  function activateTouchDrag(drag) {
    if (touchDrag !== drag || drag.active || !state.members[drag.name]) return;
    drag.active = true;
    drag.source.classList.add('dragging');
    const preview = document.createElement('div');
    preview.className = 'member touch-drag-ghost' + (state.members[drag.name].experienced ? '' : ' new');
    preview.textContent = drag.name;
    preview.setAttribute('aria-hidden', 'true');
    document.body.append(preview);
    drag.ghost = preview;
    positionTouchGhost(drag);
    markTouchTarget(drag);
    drag.frame = window.requestAnimationFrame(() => touchAutoScroll(drag));
    if (navigator.vibrate) navigator.vibrate(12);
  }

  function finishTouchDrag(drag, commit) {
    if (touchDrag !== drag) return;
    touchDrag = null;
    if (drag.timer) window.clearTimeout(drag.timer);
    if (drag.frame) window.cancelAnimationFrame(drag.frame);
    drag.source.classList.remove('dragging');
    drag.ghost?.remove();
    clearDropHighlights();
    if (!drag.active) return;
    suppressedTouchClick = { until: Date.now() + 450, x: drag.x, y: drag.y };
    // No move? A long press alone should not unexpectedly reassign someone.
    if (!commit || !drag.moved || !state.members[drag.name]) return;
    const dest = findTouchTarget(drag.x, drag.y, drag.name);
    if (!dest) return;
    if (dest.merge) {
      addChild(dest.merge.dataset.party, drag.name);
    } else {
      const slot = dest.slot;
      const parties = [...slot.querySelectorAll(':scope > .members > [data-party]')]
        .filter(el => el.dataset.party !== rootOf(drag.name));
      let position = parties.length;
      for (let i = 0; i < parties.length; i++) {
        const rect = parties[i].getBoundingClientRect();
        if (slot.dataset.room === rootId
          ? (drag.y < rect.top || (drag.y <= rect.bottom && drag.x < rect.left + rect.width / 2))
          : drag.y < rect.top + rect.height / 2) { position = i; break; }
      }
      moveSingleMember(drag.name, slot.dataset.room, slot.dataset.slot, position);
    }
    state.notice = '';
    state.selected = null;
    render();
  }

  function beginHeldDrag(id, chip, x, y) {
    if (!chip || touchDrag || !state.members[chip.dataset.member]) return;
    const drag = {
      id, source: chip, name: chip.dataset.member,
      x, y, startX: x, startY: y,
      active: false, moved: false, timer: null, frame: null, ghost: null
    };
    touchDrag = drag;
    drag.timer = window.setTimeout(() => activateTouchDrag(drag), touchHoldMs);
  }
  function updateHeldDrag(id, x, y) {
    const drag = touchDrag;
    if (!drag || drag.id !== id) return false;
    drag.x = x;
    drag.y = y;
    const distance = Math.hypot(x - drag.startX, y - drag.startY);
    if (!drag.active) {
      if (distance > touchMoveTolerance) finishTouchDrag(drag, false);
      return false;
    }
    if (distance > touchMoveTolerance) drag.moved = true;
    positionTouchGhost(drag);
    markTouchTarget(drag);
    return true;
  }

  // Touch: do not block movement until a hold has become a drag. This makes
  // normal vertical/horizontal scrolling from the chips possible again.
  app.addEventListener('touchstart', event => {
    if (event.touches.length !== 1) {
      if (touchDrag) finishTouchDrag(touchDrag, false);
      return;
    }
    const chip = event.target.closest('.member[data-member]');
    if (!chip || event.target.closest('button')) return;
    const touch = event.changedTouches[0];
    if (touch) beginHeldDrag(touch.identifier, chip, touch.clientX, touch.clientY);
  }, { passive: true });
  app.addEventListener('touchmove', event => {
    const drag = touchDrag;
    if (!drag) return;
    if (event.touches.length !== 1) {
      finishTouchDrag(drag, false);
      return;
    }
    const touch = [...event.touches].find(t => t.identifier === drag.id);
    if (!touch) return;
    if (updateHeldDrag(drag.id, touch.clientX, touch.clientY) && event.cancelable)
      event.preventDefault();
  }, { passive: false });
  app.addEventListener('touchend', event => {
    const drag = touchDrag;
    if (drag && [...event.changedTouches].some(t => t.identifier === drag.id))
      finishTouchDrag(drag, true);
  });
  app.addEventListener('touchcancel', event => {
    const drag = touchDrag;
    if (drag && [...event.changedTouches].some(t => t.identifier === drag.id))
      finishTouchDrag(drag, false);
  });

  // Active stylus: keep the pointer path, without intercepting finger scroll.
  app.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'pen' || event.isPrimary === false || event.button !== 0) return;
    const chip = event.target.closest('.member[data-member]');
    if (chip && !event.target.closest('button'))
      beginHeldDrag(`pen-${event.pointerId}`, chip, event.clientX, event.clientY);
  });
  app.addEventListener('pointermove', event => {
    if (event.pointerType !== 'pen') return;
    if (updateHeldDrag(`pen-${event.pointerId}`, event.clientX, event.clientY))
      event.preventDefault();
  });
  app.addEventListener('pointerup', event => {
    if (touchDrag?.id === `pen-${event.pointerId}`)
      finishTouchDrag(touchDrag, true);
  });
  app.addEventListener('pointercancel', event => {
    if (touchDrag?.id === `pen-${event.pointerId}`)
      finishTouchDrag(touchDrag, false);
  });
  window.addEventListener('blur', () => {
    if (touchDrag) finishTouchDrag(touchDrag, false);
  });
  // Prevent long-press context menus and a synthetic click after touch drop.
  app.addEventListener('contextmenu', event => {
    if (touchDrag?.active && event.target.closest('.member')) event.preventDefault();
  });
  app.addEventListener('click', event => {
    const blocked = suppressedTouchClick;
    if (!blocked || Date.now() >= blocked.until) return;
    if (Math.hypot(event.clientX - blocked.x, event.clientY - blocked.y) > 20) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    suppressedTouchClick = null;
  }, true);
})();
