import RepositoryImpl from "./data/repositoryimpl";
import DiceImpl from "./data/diceimpl";
import GameMaster from "./domain/gamemaster";
import ViewImpl from "./view/viewimpl";
import ViewModel from "./view/viewmodel";

// インジェクト
const viewModel = new ViewModel(
    new RepositoryImpl(),
    new GameMaster(new DiceImpl()),
    new ViewImpl()
)

// 開始
viewModel.main()
