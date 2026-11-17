/**
 * practiceVault.js
 * Categorized repositories, systems prototypes, and algorithmic practice codes
 * from GitHub profile: https://github.com/Vanshuj
 *
 * Structured as an interactive developer file-system tree across 3 directories:
 *  1. java-react/  — Full-stack integrations, distributed sockets, and interactive web apps.
 *  2. core-java/   — Core Java OOP, multithreading concurrency, and custom DSA from scratch.
 *  3. cpp-systems/ — C++20 STL algorithms, graph theory, and dynamic programming optimization.
 */

export const practiceVaultData = {
  directories: [
    {
      id: 'java-react',
      folderName: 'java-react/',
      label: 'Java + React Systems',
      color: '#38BDF8', // Electric Cyan
      glowColor: 'rgba(56, 189, 248, 0.35)',
      description: 'Full-stack web apps, distributed Java sockets, and realtime systems.',
    },
    {
      id: 'java-core',
      folderName: 'core-java/',
      label: 'Core Java & DSA',
      color: '#F59E0B', // Warm Golden Amber
      glowColor: 'rgba(245, 158, 11, 0.35)',
      description: 'Object-oriented systems, multithreading concurrency, and fundamental DSA.',
    },
    {
      id: 'cpp-systems',
      folderName: 'cpp-systems/',
      label: 'C++ Systems & Logic',
      color: '#A855F7', // Electric Violet
      glowColor: 'rgba(168, 85, 247, 0.35)',
      description: 'High-performance STL algorithms, graph traversals, and DP optimizations.',
    },
  ],

  files: [
    // ==========================================
    // DIRECTORY 1: java-react/
    // ==========================================
    {
      id: 'chat-app-java',
      dir: 'java-react',
      fileName: 'ChatServer.java',
      title: 'Distributed Java Chat Architecture',
      language: 'Java',
      metric: 'Multi-Threaded TCP',
      complexity: 'O(1) Broadcast / Worker Thread per Socket',
      repoName: 'ChatApp_Java',
      repoUrl: 'https://github.com/Vanshuj/ChatApp_Java',
      liveUrl: 'https://chatapp-java-bean.onrender.com',
      description:
        'Multi-client distributed socket chat server in Java paired with a JavaFX desktop client, JSON archive persistence, and Docker container orchestration.',
      techStack: ['Java 17', 'Socket API', 'JavaFX', 'Multithreading', 'Docker'],
      highlights: [
        'Concurrent multi-client handler threads with synchronized broadcast pool',
        'Persistent JSON message storage layer (chatdb.json)',
        'Containerized backend runtime via Dockerfile',
      ],
      codeSnippet: `// Vanshuj/ChatApp_Java — Multi-Client Socket Listener
public class ChatServer {
    private static final Set<ClientHandler> clients = ConcurrentHashMap.newKeySet();

    public static void main(String[] args) throws IOException {
        try (ServerSocket server = new ServerSocket(8080)) {
            System.out.println("[SYS] ChatServer listening on :8080");
            while (true) {
                Socket socket = server.accept();
                ClientHandler worker = new ClientHandler(socket, clients);
                clients.add(worker);
                new Thread(worker).start();
            }
        }
    }
}`,
    },
    {
      id: 'react-megablog',
      dir: 'java-react',
      fileName: 'MegaBlogApp.jsx',
      title: 'MegaBlog Full-Stack Engine',
      language: 'React JSX',
      metric: 'Redux + Appwrite',
      complexity: 'Stateless Session Auth · Optimistic UI',
      repoName: 'React_Project',
      repoUrl: 'https://github.com/Vanshuj/React_Project',
      description:
        'Full-stack React publishing platform featuring Redux Toolkit state slices, Appwrite authentication, protected route guards, and TinyMCE rich-text workflows.',
      techStack: ['React.js', 'Redux Toolkit', 'Appwrite', 'Tailwind CSS', 'TinyMCE'],
      highlights: [
        'Centralized auth & post slices with Redux Toolkit',
        'Protected routing guards verifying active cloud sessions',
        'Rich-text markdown/HTML publishing with cloud asset uploads',
      ],
      codeSnippet: `// Vanshuj/React_Project/MegaBlog — Session Hydrator
export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        dispatch(userData ? login({ userData }) : logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? <Outlet /> : <Loader />;
}`,
    },
    {
      id: 'shola-parchi-thapa',
      dir: 'java-react',
      fileName: 'SholaParchiRoom.js',
      title: 'Shola Parchi Thapa (Multiplayer)',
      language: 'Node + Socket.io',
      metric: 'Realtime 4-Player',
      complexity: 'O(1) Turn Arbitration · WebSocket Rooms',
      repoName: 'Shola-Parchi-Thapa',
      repoUrl: 'https://github.com/Vanshuj/Shola-Parchi-Thapa',
      liveUrl: 'https://shola-parchi-thapa.vercel.app/',
      description:
        'Digital 4-player multiplayer implementation of the traditional Indian card game using Node.js, Socket.io rooms, React frontend, and Docker Compose.',
      techStack: ['Node.js', 'Express', 'Socket.io', 'React', 'Docker Compose'],
      highlights: [
        'Bidirectional WebSocket event multiplexing for 4-player turn passing',
        'Server-authoritative deck validation preventing client tampering',
        'Multi-container Docker Compose orchestration',
      ],
      codeSnippet: `// Vanshuj/Shola-Parchi-Thapa — Authoritative Turn Sync
io.on('connection', (socket) => {
  socket.on('pass_card', ({ roomId, card, nextPlayerId }) => {
    const room = gameRooms.get(roomId);
    if (!room || !room.validateTurn(socket.id, card)) return;

    room.transferCard(socket.id, nextPlayerId, card);
    io.to(roomId).emit('board_state_sync', room.getPublicState());
  });
});`,
    },
    {
      id: 'iris-biometric',
      dir: 'java-react',
      fileName: 'IrisAttendance.js',
      title: 'Iris Biometric Attendance Portal',
      language: 'JavaScript',
      metric: 'Biometric Hub',
      complexity: 'Identity Verification & Ingress Telemetry',
      repoName: 'Project-1',
      repoUrl: 'https://github.com/Vanshuj/Project-1',
      description:
        'Biometric identity and attendance portal integrating iris image verification workflows, daily ingress/egress logs, and administrative dashboards.',
      techStack: ['JavaScript', 'HTML5 Canvas', 'Dashboard UI', 'Session Auth'],
      highlights: [
        'Iris image comparison & attendance record pipeline',
        'Interactive analytics dashboard for daily entry verification',
        'Role-based administrative view filtering',
      ],
      codeSnippet: `// Vanshuj/Project-1 — Biometric Ingress Verification
async function verifyIrisIngress(sampleBuffer, candidateId) {
  const signature = await extractIrisTemplate(sampleBuffer);
  const record = attendanceStore.findById(candidateId);

  if (hammingDistance(signature, record.template) < THRESHOLD) {
    return attendanceStore.logEntry(candidateId, Date.now());
  }
  throw new Error('Biometric signature mismatch');
}`,
    },
    {
      id: 'telecom-qos-analytics',
      dir: 'java-react',
      fileName: 'qos_arpu_model.py',
      title: 'Telecom QoS & ARPU ML Pipeline',
      language: 'Python ML',
      metric: 'Scikit-Learn ML',
      complexity: 'Multi-Feature Regression · ARPU Forecast',
      repoName: 'Project-NETWORK-QUALITY-REVENUE-OPTIMIZATION-ANALYTICS',
      repoUrl: 'https://github.com/Vanshuj/Project-NETWORK-QUALITY-REVENUE-OPTIMIZATION-ANALYTICS',
      description:
        'Machine learning pipeline quantifying how technical network QoS metrics (latency, jitter, signal strength) directly drive Average Revenue Per User (ARPU).',
      techStack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Jupyter'],
      highlights: [
        'Predictive regression modeling QoS degradation impact on ARPU',
        'Feature engineering across telecom latency and throughput logs',
        'Actionable revenue optimization insights for network operators',
      ],
      codeSnippet: `# Vanshuj/NETWORK-QUALITY-REVENUE-OPTIMIZATION-ANALYTICS
features = ['latency_ms', 'signal_dbm', 'packet_loss_pct', 'throughput_mbps']
X_train, X_test, y_train, y_test = train_test_split(
    df[features], df['arpu_usd'], test_size=0.2, random_state=42
)

model = GradientBoostingRegressor(n_estimators=200, max_depth=4)
model.fit(X_train, y_train)
print(f"R2 Revenue Forecast Score: {model.score(X_test, y_test):.4f}")`,
    },
    {
      id: 'snake-canvas-game',
      dir: 'java-react',
      fileName: 'SnakeEngine.js',
      title: 'Arcade Engine & Collision Loop',
      language: 'Vanilla JS',
      metric: '60 FPS Canvas',
      complexity: 'O(1) Collision Step · Zero Dependencies',
      repoName: 'SnakeGame-js-',
      repoUrl: 'https://github.com/Vanshuj/SnakeGame-js-',
      liveUrl: 'https://vanshuj.github.io/SnakeGame-js-/',
      description:
        'Pure JavaScript 2D canvas game engine implementing deterministic tick loops, keyboard input buffering, and dynamic boundary collision detection.',
      techStack: ['Vanilla JS', 'HTML5 Canvas', 'Event Loop', 'Collision Math'],
      highlights: [
        'Deterministic game tick synchronization with zero libraries',
        'Input buffer preventing rapid double-key self-collision bugs',
        'Dynamic speed scaling as score increases',
      ],
      codeSnippet: `// Vanshuj/SnakeGame-js- — Deterministic Frame Step
function stepSimulation(snake, velocity, grid) {
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

  if (head.x < 0 || head.y < 0 || head.x >= grid.cols || head.y >= grid.rows) {
    return triggerGameOver('Boundary collision');
  }
  snake.unshift(head);
  if (!consumeFood(head)) snake.pop();
}`,
    },

    // ==========================================
    // DIRECTORY 2: core-java/
    // ==========================================
    {
      id: 'library-mini-project',
      dir: 'java-core',
      fileName: 'LibraryManager.java',
      title: 'Library Management Architecture',
      language: 'Java 17 OOP',
      metric: 'Enterprise OOP',
      complexity: 'O(1) ISBN Hash Indexing · File I/O',
      repoName: 'JAVA_miniProject',
      repoUrl: 'https://github.com/Vanshuj/JAVA_miniProject',
      description:
        'Object-oriented Java application automating book inventory, member borrowing hierarchies, overdue fee calculation, and catalog persistence.',
      techStack: ['Java 17', 'OOP Architecture', 'File I/O', 'Custom Exceptions'],
      highlights: [
        'Clean polymorphic member privileges and borrowing quotas',
        'Custom domain exceptions for stock depletion and overdue loans',
        'Fast catalog lookup indexed by ISBN and author metadata',
      ],
      codeSnippet: `// Vanshuj/JAVA_miniProject — Core Library Service
public class LibraryCatalog {
    private final Map<String, Book> index = new HashMap<>();

    public synchronized LoanReceipt issueBook(String isbn, Member member) {
        Book book = Optional.ofNullable(index.get(isbn))
            .orElseThrow(() -> new BookNotFoundException(isbn));
        if (!book.isAvailable()) throw new OutOfStockException(isbn);

        book.markIssued(member.getId());
        return new LoanReceipt(isbn, member.getId(), LocalDate.now().plusDays(14));
    }
}`,
    },
    {
      id: 'bst-tree-algorithms',
      dir: 'java-core',
      fileName: 'BinarySearchTree.java',
      title: 'Binary Search Trees & Traversals',
      language: 'Java DSA',
      metric: 'O(log N) Avg',
      complexity: 'Time: O(H) Insert/Delete · O(N) Diameter',
      repoName: 'JAVA-Practice',
      repoUrl: 'https://github.com/Vanshuj/JAVA-Practice/tree/main/DSA/Java',
      description:
        'Complete Binary Tree & BST suite covering recursive insertion, multi-case node deletion (leaf, single child, dual child with inorder successor), subtree checks, and diameter.',
      techStack: ['Binary Search Tree', 'BST Deletion', 'Tree Diameter', 'Subtree Check'],
      highlights: [
        'Handles all 3 BST deletion cases cleanly via inorder successor',
        'Linear-time O(N) tree diameter computed in single recursive pass',
        'Root-to-leaf path enumeration and range queries [X, Y]',
      ],
      codeSnippet: `// Vanshuj/JAVA-Practice/DSA/Java/BST_Deletion.java
public static Node delete(Node root, int val) {
    if (root == null) return null;
    if (val < root.data) root.left = delete(root.left, val);
    else if (val > root.data) root.right = delete(root.right, val);
    else {
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;
        Node successor = findInorderSuccessor(root.right);
        root.data = successor.data;
        root.right = delete(root.right, successor.data);
    }
    return root;
}`,
    },
    {
      id: 'backtracking-nqueens-sudoku',
      dir: 'java-core',
      fileName: 'NQueensSudoku.java',
      title: 'Advanced Recursion & Backtracking',
      language: 'Java DSA',
      metric: 'Pruned Search',
      complexity: 'Time: O(N!) Pruned · Space: O(N^2) Board',
      repoName: 'JAVA-Practice',
      repoUrl: 'https://github.com/Vanshuj/JAVA-Practice/tree/main/DSA/Java',
      description:
        'Recursive constraint-satisfaction solvers implementing N-Queens safe placement, 9x9 Sudoku solver, maze pathfinding, and string permutations.',
      techStack: ['Backtracking', 'N-Queens', 'Sudoku Solver', 'Maze Paths'],
      highlights: [
        'Pruned diagonal/row safety checks minimizing recursive branch depth',
        'Full 9x9 Sudoku backtracking solver with 3x3 subgrid validation',
        'Combinatorial string permutation & subset recurrence trees',
      ],
      codeSnippet: `// Vanshuj/JAVA-Practice/DSA/Java/N_Queen.java
public static void solveNQueens(char[][] board, int col, List<List<String>> res) {
    if (col == board.length) {
        saveBoard(board, res);
        return;
    }
    for (int row = 0; row < board.length; row++) {
        if (isSafe(row, col, board)) {
            board[row][col] = 'Q';
            solveNQueens(board, col + 1, res);
            board[row][col] = '.'; // backtrack
        }
    }
}`,
    },
    {
      id: 'custom-collections-hashmap',
      dir: 'java-core',
      fileName: 'CustomHashMap.java',
      title: 'Custom HashMap & Linked Lists',
      language: 'Java DSA',
      metric: 'O(1) Amortized',
      complexity: 'Time: O(1) Avg Put/Get · Separate Chaining',
      repoName: 'JAVA-Practice',
      repoUrl: 'https://github.com/Vanshuj/JAVA-Practice/tree/main/DSA/Java',
      description:
        'Zero-library data structures implemented from scratch: Generic HashMap with bucket arrays, separate chaining, dynamic rehashing, Circular Queue, and Floyd’s cycle detection.',
      techStack: ['Custom HashMap', 'Linked Lists', 'Circular Queue', 'Floyd Cycle'],
      highlights: [
        'Dynamic bucket rehashing triggered when load factor lambda > 2.0',
        'Floyd’s Tortoise & Hare cycle detection in O(1) auxiliary space',
        'Scratch Singly Linked List & Circular Array Queue implementations',
      ],
      codeSnippet: `// Vanshuj/JAVA-Practice/DSA/Java/HashMapCode.java
public void put(K key, V value) {
    int bi = hashFunction(key);
    int di = searchInLL(key, bi);

    if (di == -1) {
        buckets[bi].add(new Node(key, value));
        n++;
    } else {
        buckets[bi].get(di).value = value;
    }
    if ((double) n / N > 2.0) rehash();
}`,
    },
    {
      id: 'java-concurrency-multithreading',
      dir: 'java-core',
      fileName: 'ConcurrencyPool.java',
      title: 'Multithreading & Concurrency Suite',
      language: 'Java Core',
      metric: '100+ Modules',
      complexity: 'Parallel Threads · Runnable · Generics & Lambdas',
      repoName: 'JAVA-Practice',
      repoUrl: 'https://github.com/Vanshuj/JAVA-Practice/tree/main/hi/vanshu',
      description:
        '100+ module Core Java engineering archive spanning multithreading, Runnable interfaces, thread priority scheduling, custom exceptions, generics, and Java 8+ lambdas.',
      techStack: ['Multithreading', 'Runnable', 'Generics', 'Lambdas', 'Collections'],
      highlights: [
        'Thread lifecycle coordination, priority tuning, and join() barriers',
        'Type-safe generic interfaces and functional lambda expressions',
        'Comprehensive exception handling and Java Time API modules',
      ],
      codeSnippet: `// Vanshuj/JAVA-Practice/hi/vanshu/V_70_Multithreading.java
class WorkerTask implements Runnable {
    private final String jobId;
    WorkerTask(String jobId) { this.jobId = jobId; }

    @Override
    public void run() {
        System.out.println("[THREAD " + Thread.currentThread().getName()
            + "] Executing job -> " + jobId);
    }
}`,
    },

    // ==========================================
    // DIRECTORY 3: cpp-systems/
    // ==========================================
    {
      id: 'cpp-stl-algorithms',
      dir: 'cpp-systems',
      fileName: 'FastSTLTemplates.cpp',
      title: 'C++ Competitive Algorithms & STL',
      language: 'C++20',
      metric: 'g++ -O3 Fast',
      complexity: 'O(N log N) Heap / Binary Search · Fast I/O',
      repoName: 'Competitive-DSA',
      repoUrl: 'https://github.com/Vanshuj',
      description:
        'High-performance C++20 algorithmic toolkit leveraging STL containers, custom comparator priority queues, binary search bounds, and bitmask compression.',
      techStack: ['C++20', 'STL Containers', 'Binary Search', 'Bitmasks', 'Fast I/O'],
      highlights: [
        'Decoupled std::ios::sync_with_stdio(false) for rapid competitive I/O',
        'Custom functor comparators for priority_queue interval scheduling',
        'Bitwise state compression for subset enumeration',
      ],
      codeSnippet: `// C++20 High-Performance STL & Custom Comparator Heap
struct Task { int priority, deadline; };
struct Cmp {
    bool operator()(const Task& a, const Task& b) const {
        return a.priority < b.priority;
    }
};

inline void fast_io() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(nullptr);
}`,
    },
    {
      id: 'cpp-graph-traversals',
      dir: 'cpp-systems',
      fileName: 'DijkstraDSUGraph.cpp',
      title: 'C++ Graph Algorithms & Shortest Path',
      language: 'C++20',
      metric: 'O((V+E) log V)',
      complexity: 'Dijkstra Min-Heap · DSU Path Compression',
      repoName: 'Competitive-DSA',
      repoUrl: 'https://github.com/Vanshuj',
      description:
        'Low-level C++ graph engine covering Dijkstra’s single-source shortest path, Disjoint Set Union (Union-Find) with path compression, BFS/DFS, and DAG topological sorting.',
      techStack: ['Graph Theory', 'Dijkstra', 'DSU Union-Find', 'Topological Sort'],
      highlights: [
        'Min-heap Dijkstra achieving O((V + E) log V) shortest-path resolution',
        'Union-Find with rank + path compression in O(alpha(N)) amortized',
        '3-color DFS cycle detection for directed dependency graphs',
      ],
      codeSnippet: `// C++20 Dijkstra Shortest Path Engine
vector<long long> dijkstra(int src, int n, const vector<vector<pair<int,int>>>& adj) {
    vector<long long> dist(n, LLONG_MAX);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u])
            if (dist[u] + w < dist[v]) pq.push({dist[v] = dist[u] + w, v});
    }
    return dist;
}`,
    },
    {
      id: 'cpp-dynamic-programming',
      dir: 'cpp-systems',
      fileName: 'DynamicProgVault.cpp',
      title: 'C++ Dynamic Programming Vault',
      language: 'C++20',
      metric: 'O(N log N) LIS',
      complexity: 'Space-Optimized Rolling Array · Patience Sort',
      repoName: 'Competitive-DSA',
      repoUrl: 'https://github.com/Vanshuj',
      description:
        'Multidimensional dynamic programming suite featuring 0/1 Knapsack with rolling-array space optimization, Longest Common Subsequence (LCS), and O(N log N) LIS.',
      techStack: ['Dynamic Programming', 'Knapsack', 'LCS / LIS', 'Memoization'],
      highlights: [
        'Rolling 1D array reduces 0/1 Knapsack memory from O(N*W) to O(W)',
        'Longest Increasing Subsequence in O(N log N) via lower_bound',
        'Clean state-transition recurrence design for optimal substructure',
      ],
      codeSnippet: `// C++20 Longest Increasing Subsequence — O(N log N)
int lengthOfLIS(const vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return static_cast<int>(tails.size());
}`,
    },
  ],
};
