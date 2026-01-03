//
//  最低ダメージ値保障 ver1.00
//
// author yana
//

var Imported = Imported || {};
Imported['MinimumDamage'] = 1.00;
/*:
 * @plugindesc ver1.00/ダメージの最低値を設定します。
 * @author Yana
 * 
 * @param MinimumHpDamage
 * @desc HPダメージの最低値です。
 * @default 1
 * 
 * @param MinimumMpDamage
 * @desc MPダメージの最低値です。
 * @default 1
 * 
 * @help------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------ 
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.00:
 * 公開
 */

// プラグインパラメータやエイリアスを使うため、グローバル汚染回避のためクロージャーとして定義
(function(){
	////////////////////////////////////////////////////////////////////////////////////
	
	// プラグインパラメータの宣言 基本クラスと区別するため、変数は小文字スタート
	var parameters = PluginManager.parameters('MinimumDamage');
	var minimumHpDamage = Number(parameters['MinimumHpDamage']);
	var minimumMpDamage = Number(parameters['MinimumMpDamage']);
	
	////////////////////////////////////////////////////////////////////////////////////
	
	// エイリアス処理　JSは変数に関数が代入できるため、代理の変数に元の関数を代入する
	var __Game_Action_executeDamage = Game_Action.prototype.executeDamage;
	Game_Action.prototype.executeDamage = function(target, value){
		// HPに対する行動の場合
		if (this.isHpEffect()){
			// ダメージの絶対値と最低値を比較して、大きいほうを入れる
			value = Math.max(Math.abs(value), minimumHpDamage);
			// 回復の場合、値を反転する
			if (this.isRecover()){ value *= -1 }
		}
		// MPに対する行動の場合
		if (this.isMpEffect()){
			// ダメージの絶対値と最低値を比較して、大きいほうを入れる
			value = Math.max(Math.abs(value), minimumMpDamage);
			// 回復の場合、値を反転する
			if (this.isRecover()){ value *= -1 }
		}
		// 元の関数を呼び出す　最初の引数はthisになる
		__Game_Action_executeDamage.call(this, target, value);
	};
}());
