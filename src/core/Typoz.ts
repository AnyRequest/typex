/**
 * @version 0.0.21
 */

import TypeNode from '@/models/TypeNode';
import Parser from '@/modules/Parser';
import {
  copyConfig,
  findElements,
  findOne,
  getCursorStyle,
  initializeTypozStyle,
  recursiveConfigApply,
  trimInnerText,
} from '@/utils/feature';
import type { HTMLTypozElement, Node, Options, RecursivePartial } from '..';
import TypeBuilder from '@/modules/TypeBuilder';
import { DEFAULT_CONFIG } from '@/utils/global.instance';

export class Typoz {
  /**
   * @private
   * @readonly
   * @property {Options} defaultConfig 기본 타이핑 설정
   */
  private readonly defaultConfig: Options = DEFAULT_CONFIG;
  /**
   * @private
   * @property {Parser} parser 텍스트 분석기
   */
  private parser: Parser;

  /**
   * @method node 타입빌더 인스턴스 호출 메서드
   * @description 빌더는 파서를 확장하여 사용됩니다.
   * @returns {TypeBuilder} 타입빌더를 반환합니다.
   * @example
   * const typoz = new Typoz();
   * // select 및 config는 필수로 호출되어야 합니다.
   * // config가 호출되지 않으면 오류가 발생 할 수 있습니다.
   * typoz.node().select("#target").config();
   * // or
   * typoz.node().select("#target").config({
   *   speed: { write: 1 },
   * });
   */
  node(): TypeBuilder {
    const builder = TypeBuilder.instance(this.parser);
    this.typeBuilderNodes.push(builder);
    return builder;
  }

  /** @property {Options} config 타이핑 설정 */
  config: Options;
  /** @property {TypNode[]} typNodes 타입 노드 배열 */
  typeNodes: TypeNode[] = [];
  typeBuilderNodes: TypeBuilder[] = [];

  constructor() {
    this.parser = new Parser();
  }

  /**
   * @method initialize typoz 사용에서 항상 필수로 먼저 실행되어야 합니다.
   */
  initialize(): void {
    this.config = copyConfig(this.defaultConfig);
    // this.parser = new Parser();
  }

  /**
   * @method destroy typoz 설정 해제 및 초기화
   * @description typoz에 등록된 모든 노드를 정지, 제거합니다. 다시 시작하려면 initialize와 globalConfig를 호출해야합니다.
   */
  destroy() {
    this.config = copyConfig(this.defaultConfig);
    TypeNode.id = 0;
    TypeBuilder.id = 0;

    for (const typeNode of this.typeNodes) {
      typeNode.destroy();
    }
    for (const builder of this.typeBuilderNodes) {
      builder.destroy();
    }

    this.typeNodes = [];
    this.typeBuilderNodes = [];
    document.head.querySelectorAll('[typoz-styles]').forEach((style) => {
      style?.remove?.();
    });
  }

  /**
   * @method globalConfig typoz의 모든 노드에 기본 적용되는 환경설정을 합니다.
   * @param {RecursivePartial<Options>} customConfigs 전역 환경 설정
   * @description globalConfig를 호출하면 자동으로 render메서드가 호출됩니다. autoRender가 false면 render메서드를 원하는 시점에서 호출해야합니다.
   *
   */
  globalConfig(
    customConfigs: RecursivePartial<Options> = DEFAULT_CONFIG,
  ): void {
    if (customConfigs) recursiveConfigApply(this.config, customConfigs);
    if (this.config.autoRender) {
      this.render();
    }
  }

  /**
   * @method convert 단어 단위 문장 분해
   * @param {string} sentences 텍스트 타이핑을 위해 분해할 문장
   * @returns {string[][]} 분해된 단어 묶음 (2차 배열)
   */
  convert(sentences: string): string[][] {
    return this.parser.parse(sentences);
  }

  /**
   * @method bulkConvert 단어 단위 배열 문장 분해
   * @param sentences 텍스트 타이핑을 위해 분해할 문장 배열
   * @returns {string[][]} 분해된 단어 묶음 (3차 배열)
   */
  bulkConvert(sentences: string[]): string[][][] {
    const temp: string[][][] = [];
    for (const sentence of sentences) {
      temp.push(this.convert(sentence));
    }
    return temp;
  }

  /**
   * @method resume 렌더링 재개
   * @description 파라미터가 없으면 등록된 모든 노드를 대상을 타이핑을 다시 진행합니다.
   */
  resume(): void;
  /**
   * @method resume 렌더링 재개
   * @param {string} [name] 등록된 노드를 대상으로 타이핑을 다시 진행합니다.
   * @description 파라미터가 없으면 등록된 모든 노드를 대상을 타이핑을 다시 진행합니다.
   */
  resume(name: string): void;
  resume(name?: string): void {
    /* istanbul ignore next */
    if (name !== null && name !== undefined && typeof name === 'string') {
      const typing = this.typeNodes.find((typing) => typing.name === name);
      if (typing) {
        typing.resume();
      }
    } else {
      for (const typing of this.typeNodes) {
        typing.resume();
      }
    }
  }

  /**
   * @method pause 렌더링 일시정지
   * 파라미터가 없으면 등록된 모든 노드를 대상을 타이핑을 중단합니다.
   */
  pause(): void;
  /**
   * @method pause 렌더링 일시정지
   * @param {string} [name] 등록된 노드를 대상으로 타이핑을 중단합니다.
   * 파라미터가 없으면 등록된 모든 노드를 대상을 타이핑을 중단합니다.
   */
  pause(name: string): void;
  pause(name?: string): void {
    /* istanbul ignore next */
    if (name !== null && name !== undefined && typeof name === 'string') {
      const typing = this.typeNodes.find((typing) => typing.name === name);
      if (typing) {
        typing.pause();
      }
    } else {
      for (const typing of this.typeNodes) {
        typing.pause();
      }
    }
  }

  /**
   * @private
   * @method defaultRender 기본 요소 렌더링 준비
   */
  private defaultRender() {
    const defaultElements = findElements(this.config.querySelector);
    for (const element of [...new Set(defaultElements)]) {
      const trimText = element.innerText.trim();
      if (trimText !== '') {
        if (!Object.hasOwn(element, 'typings')) {
          element.typings = [];
        }
        element.typings.push(trimText.trim());
      }
      const converted = this.convert(trimText);
      const typingModel = new TypeNode(
        element,
        element.typozConfig || JSON.parse(JSON.stringify(this.config)),
        [converted],
      );

      this.typeNodes.push(typingModel);
    }
  }

  /**
   * @private
   * @method manualRender 수동 추가된 요소 렌더링 준비
   * See {@link Typoz.render} argument
   */
  private manualRender(
    elements: NodeListOf<HTMLTypozElement> | HTMLTypozElement[],
  ) {
    for (const element of [...new Set(elements)]) {
      const trimText = element.innerText.trim();
      if (trimText !== '') {
        if (!Object.hasOwn(element, 'typings')) {
          element.typings = [];
        }
        element.typings.push(trimText.trim());
      }
      const converted = this.convert(trimText);
      const typingModel = new TypeNode(
        element,
        element.typozConfig || JSON.parse(JSON.stringify(this.config)),
        [converted],
      );

      this.typeNodes.push(typingModel);
    }
  }

  /**
   * @private
   * @method getConfigNodes config에 추가된 nodes 요소 탐색
   */
  private getConfigNodes(): HTMLTypozElement[] {
    if ((this.config.nodes as Node[]).length > 0) {
      return (this.config.nodes as Node[]).reduce(
        (acc, { select, words, config }) => {
          const target = findOne(select);
          /* istanbul ignore next */
          if (target) {
            target.setAttribute;
            if (!Object.hasOwn(target, 'typozConfig')) {
              const copy = JSON.parse(JSON.stringify(this.config));
              recursiveConfigApply(copy, config || this.config);
              target.typozConfig = copy;
            }
            const targetText = trimInnerText(target);
            if (targetText !== '') {
              if (!Object.hasOwn(target, 'typings')) {
                target.typings = [];
              }
              target.typings.push(targetText.trim());
            }
            if (words?.length > 0) {
              target.typings.push(...words.map((_) => _.trim()));
            }
            acc.push(target);
          } else {
            /* istanbul ignore next */
            console.error(
              new SyntaxError('not found element. select: ' + select, {
                cause: select,
              }),
            );
          }
          return acc;
        },
        [],
      );
    }
    return [];
  }

  /**
   * @private
   * @method nodesRender nodes 요소 렌더링 준비
   */
  private nodesRender() {
    const nodesElements = this.getConfigNodes();
    for (const element of [...new Set(nodesElements)]) {
      const parseBaseText = element.innerText.trim();
      const parsedSentences = [parseBaseText];
      if (element.typings?.length > 0) {
        parsedSentences.push(...element.typings);
      }
      const typingModel = new TypeNode(
        element,
        element.typozConfig || JSON.parse(JSON.stringify(this.defaultConfig)),
        this.bulkConvert([...new Set(parsedSentences)]),
      );

      if (!this.typeNodes.includes(typingModel)) {
        this.typeNodes.push(typingModel);
      }
    }
  }

  /**
   * @method render 탐색된 요소 모두 렌더링
   */
  render(): void;
  /**
   * @method render 탐색된 요소 모두 렌더링
   * @param {NodeListOf<HTMLTypozElement> | HTMLTypozElement[]} [elements] 수동 추가 렌더링 요소
   */
  render(elements: NodeListOf<HTMLTypozElement> | HTMLTypozElement[]): void;
  render(elements?: NodeListOf<HTMLTypozElement> | HTMLTypozElement[]): void {
    let styles = '@keyframes cursor-blink { 100% { opacity: 0; } }';

    styles += getCursorStyle(this.config.style.cursor);

    this.defaultRender();
    this.manualRender(elements);
    this.nodesRender();

    for (const typing of this.typeNodes) {
      styles += typing.injectStyle + '\n';
      typing.run();
    }

    initializeTypozStyle(styles);
  }
}
