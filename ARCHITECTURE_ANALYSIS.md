# 🏗️ Анализ архитектуры Tic-Tac-Toe приложения

## 📊 Схема модулей и зависимостей

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            APP LAYER (page.tsx)                          │
│                            Entry Point                                   │
└────────────────────────┬────────────────────────────────────────────────┘
                         │
          ┌──────────────┴────────────────┐
          │                               │
          ▼                               ▼
┌─────────────────┐            ┌───────────────────────┐
│  Header         │            │  Game (Orchestrator)  │  ⚠️ HIGH COUPLING
│  Component      │            │  - Data fetching      │
│                 │            │  - Business logic     │
│  ✅ SRP: OK     │            │  - Presentation       │
│  ✅ Coupling:   │            └──────────┬────────────┘
│     Low         │                       │
│  ✅ Cohesion:   │        ┌──────────────┼──────────────┐
│     High        │        │              │              │
└─────────────────┘        ▼              ▼              ▼
                  ┌─────────────┐  ┌────────────┐  ┌──────────────┐
                  │ useGameState│  │  UI Layer  │  │  MOCK DATA   │
                  │   (Hook)    │  │ Components │  │  (PLAYERS)   │
                  │             │  └────────────┘  └──────────────┘
                  │ ⚠️ Too many │         │               │
                  │   responsi- │         │               │
                  │   bilities  │         │        ⚠️ Tight coupling
                  └──────┬──────┘         │        to mock data
                         │                │
          ┌──────────────┼────────────────┴──────────┐
          │              │                           │
          ▼              ▼                           ▼
    ┌─────────┐   ┌──────────────┐         ┌─────────────────┐
    │ Model   │   │  Constants   │         │  UI Components  │
    │ Layer   │   │  GAME_SYMBOLS│         │  (Presentational)│
    │         │   │  MOVE_ORDER  │         │                 │
    │ ✅ Pure │   │              │         │  GameField      │
    │    Func │   │  ✅ SRP: OK  │         │  GameInfo       │
    │ ✅ Low  │   │  ✅ Cohesion │         │  GameActions    │
    │    Coup │   └──────────────┘         │  GameMoveInfo   │
    └─────────┘                            │  PlayerInfo     │
         │                                 │  GameLayout     │
         ├─ computeWinner()                │                 │
         ├─ computeWinnerSymbol()          │  ✅ SRP: OK     │
         └─ getNextMove()                  │  ⚠️ Props       │
                                           │     drilling    │
                                           └─────────────────┘
                                                    │
                                                    ▼
                                           ┌─────────────────┐
                                           │ Shared UI       │
                                           │ Components      │
                                           │                 │
                                           │  Button         │
                                           │  Modal          │
                                           │                 │
                                           │  ✅ Reusable    │
                                           │  ✅ SRP: OK     │
                                           └─────────────────┘
```

---

## 🎯 Анализ по принципам

### 1️⃣ **SRP (Single Responsibility Principle)**

#### ✅ **СИЛЬНЫЕ СТОРОНЫ:**

**Model Layer** - отличное разделение:
- `computeWinner.ts` - только логика победы
- `computeWinnerSymbol.ts` - только определение символа победителя
- `getNextMove.ts` - только очередность ходов

**UI Components** - хорошее разделение:
- `GameField` - только отрисовка поля
- `GameSymbol` - только отрисовка символов
- `GameActions` - только кнопки действий
- `Button`, `Modal` - переиспользуемые компоненты

**Constants** - выделены в отдельный модуль

#### ❌ **СЛАБЫЕ СТОРОНЫ:**

**1. `Game.tsx` - нарушение SRP:**
```tsx
// Делает слишком много:
// - Управляет данными игроков (PLAYERS)
// - Определяет конфигурацию (PLAYERS_COUNT, CELL_SIZE)
// - Управляет бизнес-логикой (через useGameState)
// - Отвечает за композицию UI
```

**2. `useGameState` - слишком много ответственности:**
```tsx
// Делает:
// - State management
// - Бизнес-логика (cellClick, resetGame)
// - Вычисление победителя
// - Определение следующего хода
```

**3. `Header.tsx` - хардкод данных:**
```tsx
// Данные игрока зашиты в компонент
<Profile name="Hacker" rating={1230} />
```

---

### 2️⃣ **COUPLING (Связанность модулей)**

#### ✅ **LOW COUPLING - хорошо:**

**Model функции** - чистые функции без зависимостей:
```tsx
computeWinner(cells) // Зависит только от данных
getNextMove(currentMove, playersCount) // Чистая функция
```

**UI компоненты** - слабая связь:
```tsx
<GameField cells={cells} onCellClick={cellClick} />
// Получает данные через props, не знает откуда они
```

#### ❌ **HIGH COUPLING - проблемы:**

**1. Game.tsx ← mock-players:**
```tsx
import { PLAYERS } from "@/mock/players/mock-players";
// Прямая зависимость от моков! 
// ⚠️ Нельзя использовать реальные данные без рефакторинга
```

**2. useGameState ← Constants:**
```tsx
import { GAME_SYMBOLS } from "@/components/game/constants";
// Хук знает про константы напрямую
```

**3. Множественные импорты типов:**
```tsx
// Многие модули импортируют:
import { PlayerDataSymbolType } from "@/mock/players/mock-players";
// ⚠️ Зависимость от моков во многих местах
```

**4. useGameState делает слишком много:**
```tsx
// Внутри хука:
import { computeWinner } from "../model/computeWinner";
import { computeWinnerSymbol } from "../model/computeWinnerSymbol";
import { getNextMove } from "../model/getNextMove";
// ⚠️ Хук оркестрирует всю логику игры
```

---

### 3️⃣ **COHESION (Связность внутри модуля)**

#### ✅ **HIGH COHESION - отлично:**

**game/model/** - все функции связаны с игровой логикой:
```
model/
  ├── computeWinner.ts      // Логика победы
  ├── computeWinnerSymbol.ts // Определение победителя
  └── getNextMove.ts         // Очередность ходов
```

**game/ui/** - все компоненты для UI игры:
```
ui/
  ├── GameField.tsx
  ├── GameInfo.tsx
  ├── GameActions.tsx
  └── ...
```

**icon-components/** - только иконки

#### ⚠️ **СРЕДНЯЯ COHESION:**

**useGameState** - смешивает разные уровни:
```tsx
// В одном хуке:
- State management (useState)
- Вычисления (computeWinner, getNextMove)
- Event handlers (cellClick, resetGame)
```

---

## 🚨 Критические проблемы

### 1. **Tight Coupling с Mock Data**

```tsx
// ❌ ПЛОХО - Game.tsx
import { PLAYERS } from "@/mock/players/mock-players";

// В компоненте:
PLAYERS.find((player) => player.symbol === winnerSymbol)
PLAYERS.slice(0, PLAYERS_COUNT).map(...)
```

**Проблема:** Невозможно использовать с реальными данными из API без рефакторинга.

**Решение:**
```tsx
// ✅ ХОРОШО
type GameProps = {
  players: PlayerData[];
  playersCount: number;
  cellSize: number;
}

export const Game = ({ players, playersCount, cellSize }: GameProps) => {
  // players приходят извне
}
```

---

### 2. **useGameState - God Object**

```tsx
// ❌ ПЛОХО - делает всё
useGameState(playersCount, cellSize) => {
  cells, currentMove, nextMove, winnerSequence, 
  winnerSymbol, cellClick, resetGame
}
```

**Проблема:** Невозможно переиспользовать части логики отдельно.

**Решение:** Разделить на несколько хуков:
```tsx
// ✅ ХОРОШО
useGameCells(cellSize) => { cells, setCells }
useCurrentMove(playersCount) => { currentMove, nextMove, switchMove }
useWinner(cells) => { winnerSequence, winnerSymbol }
useGameActions() => { cellClick, resetGame }
```

---

### 3. **Props Drilling**

```tsx
// Game.tsx передает кучу пропсов вниз:
<GameMoveInfo 
  winnerPlayer={...}
  winnerSymbol={...}
  currentMove={...}
  nextMove={...}
/>
```

**Проблема:** При добавлении новых данных нужно прокидывать через все уровни.

**Решение:** Context API или state management (Zustand/Redux):
```tsx
// ✅ ХОРОШО
const GameContext = createContext<GameState>();

function GameMoveInfo() {
  const { winnerPlayer, winnerSymbol } = useGameContext();
}
```

---

### 4. **Хардкод конфигурации**

```tsx
// ❌ ПЛОХО - Game.tsx
const PLAYERS_COUNT = 2;
const CELL_SIZE = 19;
```

**Проблема:** Нельзя изменить без редактирования кода.

**Решение:** Вынести в конфиг или props:
```tsx
// ✅ ХОРОШО - config/game.ts
export const GAME_CONFIG = {
  defaultPlayersCount: 2,
  defaultCellSize: 19,
  minCellSize: 3,
  maxCellSize: 30,
}
```

---

### 5. **Типы в mock файлах**

```tsx
// ❌ ПЛОХО
import { PlayerDataSymbolType } from "@/mock/players/mock-players";
```

**Проблема:** Бизнес-логика зависит от моков.

**Решение:** Вынести типы:
```tsx
// ✅ ХОРОШО - types/game.ts
export type PlayerSymbol = "cross" | "zero" | "tringle" | "square";
export type Player = {
  id: number;
  name: string;
  rating: number;
  avatar: StaticImageData;
  symbol: PlayerSymbol;
}

// mock-players.ts
import type { Player } from "@/types/game";
```

---

## 📋 Рекомендации по рефакторингу

### 🔥 **Высокий приоритет:**

1. **Развязать Game.tsx от mock данных**
   ```
   Game.tsx должен принимать players через props
   ```

2. **Разделить useGameState на несколько хуков**
   ```
   useGameCells + useGameMoves + useWinner + useGameActions
   ```

3. **Вынести типы из mock файлов**
   ```
   Создать types/game.ts, types/player.ts
   ```

4. **Добавить Context для game state**
   ```
   Решит проблему props drilling
   ```

### ⚙️ **Средний приоритет:**

5. **Конфигурация игры в отдельный модуль**
   ```
   config/game.ts с настройками
   ```

6. **Header должен получать данные через props**
   ```tsx
   <Header user={currentUser} />
   ```

7. **Создать Game Container и Game Presentation**
   ```
   Разделить логику и UI
   ```

### 💡 **Низкий приоритет:**

8. **Добавить GameService для бизнес-логики**
   ```
   Инкапсулировать всю игровую логику
   ```

9. **Переиспользование computeWinner**
   ```
   Параметры sequenceSize и fieldSize в конфиг
   ```

---

## ✨ Предложенная структура после рефакторинга

```
src/
├── types/                        # ✨ НОВОЕ
│   ├── game.ts                   # Типы игры
│   └── player.ts                 # Типы игрока
│
├── config/                       # ✨ НОВОЕ
│   └── game.ts                   # Конфигурация игры
│
├── context/                      # ✨ НОВОЕ
│   └── GameContext.tsx           # Context для состояния
│
├── services/                     # ✨ НОВОЕ (опционально)
│   └── gameService.ts            # Бизнес-логика
│
├── components/
│   ├── game/
│   │   ├── Game.container.tsx    # ✨ ИЗМЕНЕНО (логика)
│   │   ├── Game.presentation.tsx # ✨ НОВОЕ (UI)
│   │   │
│   │   ├── hooks/
│   │   │   ├── useGameCells.ts   # ✨ РАЗДЕЛЕНО
│   │   │   ├── useGameMoves.ts   # ✨ РАЗДЕЛЕНО
│   │   │   ├── useWinner.ts      # ✨ РАЗДЕЛЕНО
│   │   │   └── useGameActions.ts # ✨ РАЗДЕЛЕНО
│   │   │
│   │   ├── model/                # ✅ БЕЗ ИЗМЕНЕНИЙ
│   │   │   ├── computeWinner.ts
│   │   │   ├── computeWinnerSymbol.ts
│   │   │   └── getNextMove.ts
│   │   │
│   │   ├── constants.ts          # ✅ БЕЗ ИЗМЕНЕНИЙ
│   │   └── ui/                   # ✅ БЕЗ ИЗМЕНЕНИЙ
│   │
│   └── header/
│       └── Header.tsx            # ✨ ИЗМЕНЕНО (props)
│
├── mock/
│   └── players/
│       └── mock-players.ts       # ✨ ИЗМЕНЕНО (без типов)
│
└── app/
    └── page.tsx                  # ✨ ИЗМЕНЕНО (данные сверху)
```

---

## 🎯 Итоговая оценка

| Критерий | Оценка | Комментарий |
|----------|--------|-------------|
| **SRP** | 6/10 | Model слой отличный, но Game.tsx и useGameState делают слишком много |
| **Low Coupling** | 5/10 | Сильная связь с mock данными, множество перекрёстных импортов |
| **High Cohesion** | 8/10 | Хорошая группировка по папкам, логичная структура |
| **Общая архитектура** | 6.5/10 | Хорошая база, но нужен рефакторинг перед масштабированием |

---

## 🚀 План рефакторинга (пошагово)

### Шаг 1: Типы и конфиг (1-2 часа)
- [ ] Создать `types/game.ts` и `types/player.ts`
- [ ] Создать `config/game.ts`
- [ ] Обновить все импорты типов

### Шаг 2: Развязка от моков (2-3 часа)
- [ ] Game.tsx принимает players через props
- [ ] Header.tsx принимает user через props
- [ ] Удалить импорты mock из компонентов

### Шаг 3: Разделение useGameState (3-4 часа)
- [ ] Создать useGameCells
- [ ] Создать useGameMoves
- [ ] Создать useWinner
- [ ] Создать useGameActions
- [ ] Удалить старый useGameState

### Шаг 4: Context API (2-3 часа)
- [ ] Создать GameContext
- [ ] Обернуть Game в Provider
- [ ] Убрать props drilling

### Шаг 5: Container/Presentation (2 часа)
- [ ] Разделить Game на Container и Presentation
- [ ] Вынести логику в Container

**Общее время: ~10-14 часов**

---

## 💬 Заключение

**Сильные стороны:**
- ✅ Хорошая структура папок
- ✅ Чистый model слой
- ✅ Разделение на компоненты
- ✅ Использование TypeScript

**Что требует внимания:**
- ⚠️ Зависимость от mock данных
- ⚠️ God object в useGameState
- ⚠️ Props drilling
- ⚠️ Типы в неправильных местах

**Вывод:** Приложение имеет хорошую базу, но перед добавлением API, мультиплеера или других фич требуется рефакторинг для улучшения расширяемости и поддерживаемости.

