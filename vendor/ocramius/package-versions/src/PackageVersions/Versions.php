<?php

declare(strict_types=1);

namespace PackageVersions;

/**
 * This class is generated by ocramius/package-versions, specifically by
 * @see \PackageVersions\Installer
 *
 * This file is overwritten at every run of `composer install` or `composer update`.
 */
final class Versions
{
    public const ROOT_PACKAGE_NAME = '__root__';
    /**
     * Array of all available composer packages.
     * Dont read this array from your calling code, but use the \PackageVersions\Versions::getVersion() method instead.
     *
     * @var array<string, string>
     * @internal
     */
    public const VERSIONS          = array (
  'api-platform/api-pack' => 'v1.2.1@41364f8763475d7709c43f790aa77a4157d038e2',
  'api-platform/core' => 'v2.5.4@14ed547d10a23dcd5c852e24948e661aee48492e',
  'doctrine/annotations' => 'v1.8.0@904dca4eb10715b92569fbcd79e201d5c349b6bc',
  'doctrine/cache' => '1.10.0@382e7f4db9a12dc6c19431743a2b096041bcdd62',
  'doctrine/collections' => '1.6.4@6b1e4b2b66f6d6e49983cebfe23a21b7ccc5b0d7',
  'doctrine/common' => '2.12.0@2053eafdf60c2172ee1373d1b9289ba1db7f1fc6',
  'doctrine/dbal' => 'v2.10.1@c2b8e6e82732a64ecde1cddf9e1e06cb8556e3d8',
  'doctrine/doctrine-bundle' => '2.0.6@0ef972d3b730f975c80db9fffa4b2a0258c91442',
  'doctrine/doctrine-migrations-bundle' => '2.1.2@856437e8de96a70233e1f0cc2352fc8dd15a899d',
  'doctrine/event-manager' => '1.1.0@629572819973f13486371cb611386eb17851e85c',
  'doctrine/inflector' => '1.3.1@ec3a55242203ffa6a4b27c58176da97ff0a7aec1',
  'doctrine/instantiator' => '1.3.0@ae466f726242e637cebdd526a7d991b9433bacf1',
  'doctrine/lexer' => '1.2.0@5242d66dbeb21a30dd8a3e66bf7a73b66e05e1f6',
  'doctrine/migrations' => '2.2.1@a3987131febeb0e9acb3c47ab0df0af004588934',
  'doctrine/orm' => 'v2.7.0@4d763ca4c925f647b248b9fa01b5f47aa3685d62',
  'doctrine/persistence' => '1.3.6@5dd3ac5eebef2d0b074daa4440bb18f93132dee4',
  'doctrine/reflection' => 'v1.1.0@bc420ead87fdfe08c03ecc3549db603a45b06d4c',
  'egulias/email-validator' => '2.1.14@c4b8d12921999d8a561004371701dbc2e05b5ece',
  'fig/link-util' => '1.1.0@47f55860678a9e202206047bc02767556d298106',
  'jdorn/sql-formatter' => 'v1.2.17@64990d96e0959dff8e059dfcdc1af130728d92bc',
  'lcobucci/jwt' => '3.3.1@a11ec5f4b4d75d1fcd04e133dede4c317aac9e18',
  'lexik/jwt-authentication-bundle' => 'v2.6.5@448551fc08c6cff37aad9d8f27f6b9615cd28966',
  'monolog/monolog' => '2.0.2@c861fcba2ca29404dc9e617eedd9eff4616986b8',
  'namshi/jose' => '7.2.3@89a24d7eb3040e285dd5925fcad992378b82bcff',
  'nelmio/cors-bundle' => '2.0.1@9683e6d30d000ef998919261329d825de7c53499',
  'ocramius/package-versions' => '1.5.1@1d32342b8c1eb27353c8887c366147b4c2da673c',
  'ocramius/proxy-manager' => '2.2.3@4d154742e31c35137d5374c998e8f86b54db2e2f',
  'phpdocumentor/reflection-common' => '2.0.0@63a995caa1ca9e5590304cd845c15ad6d482a62a',
  'phpdocumentor/reflection-docblock' => '4.3.4@da3fd972d6bafd628114f7e7e036f45944b62e9c',
  'phpdocumentor/type-resolver' => '1.0.1@2e32a6d48972b2c1976ed5d8967145b6cec4a4a9',
  'psr/cache' => '1.0.1@d11b50ad223250cf17b86e38383413f5a6764bf8',
  'psr/container' => '1.0.0@b7ce3b176482dbbc1245ebf52b181af44c2cf55f',
  'psr/event-dispatcher' => '1.0.0@dbefd12671e8a14ec7f180cab83036ed26714bb0',
  'psr/link' => '1.0.0@eea8e8662d5cd3ae4517c9b864493f59fca95562',
  'psr/log' => '1.1.2@446d54b4cb6bf489fc9d75f55843658e6f25d801',
  'sensio/framework-extra-bundle' => 'v5.5.3@98f0807137b13d0acfdf3c255a731516e97015de',
  'symfony/asset' => 'v5.0.2@6b66969b9f5cd53c1ce69bdc651aa962f211b6b6',
  'symfony/cache' => 'v5.0.2@6e8d978878ae5de705ec9fabbb6011cc18776bc9',
  'symfony/cache-contracts' => 'v2.0.1@23ed8bfc1a4115feca942cb5f1aacdf3dcdf3c16',
  'symfony/config' => 'v5.0.2@7f930484966350906185ba0a604728f7898b7ba0',
  'symfony/console' => 'v5.0.2@fe6e3cd889ca64172d7a742a2eb058541404ef47',
  'symfony/dependency-injection' => 'v5.0.2@f9dbfbf487d08f60b1c83220edcd16559d1e40a2',
  'symfony/doctrine-bridge' => 'v5.0.2@0bdb2d31741cacacb95130d28fbac939c4d574f2',
  'symfony/dotenv' => 'v5.0.2@7e1bc9024edd9157264e388080df2533306894d3',
  'symfony/error-handler' => 'v5.0.2@460863313bd3212d7c38e1b40602cbcfeeeea4a5',
  'symfony/event-dispatcher' => 'v5.0.2@7b738a51645e10f864cc25c24d232fb03f37b475',
  'symfony/event-dispatcher-contracts' => 'v2.0.1@af23c2584d4577d54661c434446fb8fbed6025dd',
  'symfony/expression-language' => 'v5.0.2@412c7cc679805e78987a18fd5860013238f1daa2',
  'symfony/filesystem' => 'v5.0.2@1d71f670bc5a07b9ccc97dc44f932177a322d4e6',
  'symfony/finder' => 'v5.0.2@17874dd8ab9a19422028ad56172fb294287a701b',
  'symfony/flex' => 'v1.6.0@952f45d1c5077e658cb16a61d11603bee873f968',
  'symfony/form' => 'v5.0.2@c57a9fe108cc7747d4e8dfb770a8066b4e906acc',
  'symfony/framework-bundle' => 'v5.0.2@36e51776b231d8e224da4ce4c60079540acd1c55',
  'symfony/http-client' => 'v5.0.2@14e77c6591f7c4c2a6ff86c65af72d3919835adc',
  'symfony/http-client-contracts' => 'v2.0.1@378868b61b85c5cac6822d4f84e26999c9f2e881',
  'symfony/http-foundation' => 'v5.0.2@5dd7f6be6e62d86ba6f3154cf40e78936367978b',
  'symfony/http-kernel' => 'v5.0.2@00ce30602f3f690e66a63c327743d7b26c723b2e',
  'symfony/inflector' => 'v5.0.2@aaeb5e293294070d1b061fa3d7889bac69909320',
  'symfony/intl' => 'v5.0.2@41f910d47883c6ab37087ca4a3332e21e1d682f4',
  'symfony/mailer' => 'v5.0.2@82644dc053ccf80e2d67fd79976a2c0d08bb53c2',
  'symfony/mime' => 'v5.0.2@0e6a4ced216e49d457eddcefb61132173a876d79',
  'symfony/monolog-bridge' => 'v5.0.2@dfac10ea8a5863949966d9b6030984c079bec665',
  'symfony/monolog-bundle' => 'v3.5.0@dd80460fcfe1fa2050a7103ad818e9d0686ce6fd',
  'symfony/notifier' => 'v5.0.2@6345175bd16786036263068253c961afc3c15352',
  'symfony/options-resolver' => 'v5.0.2@1ad3d0ffc00cc1990e5c9c7bb6b81578ec3f5f68',
  'symfony/orm-pack' => 'v1.0.7@c57f5e05232ca40626eb9fa52a32bc8565e9231c',
  'symfony/polyfill-intl-grapheme' => 'v1.13.1@45c566a1ca16273f7ea6b930e013462e00e14502',
  'symfony/polyfill-intl-icu' => 'v1.13.1@b3dffd68afa61ca70f2327f2dd9bbeb6aa53d70b',
  'symfony/polyfill-intl-idn' => 'v1.13.1@6f9c239e61e1b0c9229a28ff89a812dc449c3d46',
  'symfony/polyfill-intl-normalizer' => 'v1.13.1@cfe6ad557c15f3797f667e9518ce759aa04ae4f3',
  'symfony/polyfill-mbstring' => 'v1.13.1@7b4aab9743c30be783b73de055d24a39cf4b954f',
  'symfony/polyfill-php73' => 'v1.13.1@4b0e2222c55a25b4541305a053013d5647d3a25f',
  'symfony/process' => 'v5.0.2@ea2dc31b59d63abd9bc2356ac72eb7b3f3469f0e',
  'symfony/property-access' => 'v5.0.2@b597c4f4dffc522bc4ed4bedcef9ed08d3ae3d23',
  'symfony/property-info' => 'v5.0.2@f0bf8d7360e47261ceec67d9338a0c6257f59878',
  'symfony/routing' => 'v5.0.2@120c5fa4f4ef5466cbb510ece8126e0007285301',
  'symfony/security-bundle' => 'v5.0.2@5cf83dea155ae9666dd491470d760c126e4dab98',
  'symfony/security-core' => 'v5.0.2@4fa0454de2fab0f6c2e9990976d8872b16a0e0a9',
  'symfony/security-csrf' => 'v5.0.2@df14c3ebed8ed99750e8d27a6333918f80b5a8ea',
  'symfony/security-guard' => 'v5.0.2@3e724cb9c186986e66ca2c1aaaba16fe4aa9abf9',
  'symfony/security-http' => 'v5.0.2@64afb9eb9161c65f87de6fc31e3633843bddc02a',
  'symfony/serializer' => 'v5.0.2@3cfc478c102f2d3bcf60edd339cd9c3cb446a576',
  'symfony/serializer-pack' => 'v1.0.2@c5f18ba4ff989a42d7d140b7f85406e77cd8c4b2',
  'symfony/service-contracts' => 'v2.0.1@144c5e51266b281231e947b51223ba14acf1a749',
  'symfony/stopwatch' => 'v5.0.2@d410282956706e0b08681a5527447a8e6b6f421e',
  'symfony/string' => 'v5.0.2@96868dd86d12de86236cb46f774f9a127477bd99',
  'symfony/translation' => 'v5.0.2@3ae6fad7a3dc2d99a023f9360184628fc44acbb3',
  'symfony/translation-contracts' => 'v2.0.1@8cc682ac458d75557203b2f2f14b0b92e1c744ed',
  'symfony/twig-bridge' => 'v5.0.2@abbaeee38ff39651e335c55be40752be2ddd0976',
  'symfony/twig-bundle' => 'v5.0.2@a54f6db9d452aa06a77e9f8562974a61e15bfa42',
  'symfony/twig-pack' => 'v1.0.0@8b278ea4b61fba7c051f172aacae6d87ef4be0e0',
  'symfony/validator' => 'v5.0.2@ff51ce51b3fc4c312039de2cb302e01c17843899',
  'symfony/var-dumper' => 'v5.0.2@d7bc61d5d335fa9b1b91e14bb16861e8ca50f53a',
  'symfony/var-exporter' => 'v5.0.2@1b9653e68d5b701bf6d9c91bdd3660078c9f4f28',
  'symfony/web-link' => 'v5.0.2@572ab541ec2ca2e0d0f76fd08da006805e4db157',
  'symfony/yaml' => 'v5.0.2@847661e77afa48d99ecfa508e8b60f0b029a19c0',
  'twig/extra-bundle' => 'v3.0.1@ce5c97dd566d9acd5d1fbd5eb76b6d264614725a',
  'twig/twig' => 'v3.0.1@28f856a4c57eeb24485916e8a68403f41a133616',
  'webmozart/assert' => '1.6.0@573381c0a64f155a0d9a23f4b0c797194805b925',
  'willdurand/negotiation' => 'v2.3.1@03436ededa67c6e83b9b12defac15384cb399dc9',
  'zendframework/zend-code' => '3.4.1@268040548f92c2bfcba164421c1add2ba43abaaa',
  'zendframework/zend-eventmanager' => '3.2.1@a5e2583a211f73604691586b8406ff7296a946dd',
  'doctrine/data-fixtures' => '1.4.2@39e9777c9089351a468f780b01cffa3cb0a42907',
  'doctrine/doctrine-fixtures-bundle' => '3.3.0@8f07fcfdac7f3591f3c4bf13a50cbae05f65ed70',
  'easycorp/easy-log-handler' => 'v1.0.9@224e1dfcf9455aceee89cd0af306ac097167fac1',
  'fzaninotto/faker' => 'v1.9.1@fc10d778e4b84d5bd315dad194661e091d307c6f',
  'nikic/php-parser' => 'v4.3.0@9a9981c347c5c49d6dfe5cf826bb882b824080dc',
  'symfony/browser-kit' => 'v5.0.2@a195f83b0ba20e622a5baa726af96826b8f5616b',
  'symfony/css-selector' => 'v5.0.2@19d29e7098b7b2c3313cb03902ca30f100dcb837',
  'symfony/debug-bundle' => 'v5.0.2@c9ea0bdc89b9f81d6a292fc42714e807815de027',
  'symfony/debug-pack' => 'v1.0.7@09a4a1e9bf2465987d4f79db0ad6c11cc632bc79',
  'symfony/dom-crawler' => 'v5.0.2@0a0a73a0836926898b6fcd6817fe697487a73d97',
  'symfony/maker-bundle' => 'v1.14.3@c864e7f9b8d1e1f5f60acc3beda11299f637aded',
  'symfony/phpunit-bridge' => 'v5.0.2@010cf42a81e7bec744edfdef5f76d6394f4906a7',
  'symfony/profiler-pack' => 'v1.0.4@99c4370632c2a59bb0444852f92140074ef02209',
  'symfony/test-pack' => 'v1.0.6@ff87e800a67d06c423389f77b8209bc9dc469def',
  'symfony/web-profiler-bundle' => 'v5.0.2@6cc40446060e174a690e0f6da90731133b29b664',
  'paragonie/random_compat' => '2.*@ab99b76ec4bb010402bc3d07d641c29ed6f91b96',
  'symfony/polyfill-ctype' => '*@ab99b76ec4bb010402bc3d07d641c29ed6f91b96',
  'symfony/polyfill-iconv' => '*@ab99b76ec4bb010402bc3d07d641c29ed6f91b96',
  'symfony/polyfill-php72' => '*@ab99b76ec4bb010402bc3d07d641c29ed6f91b96',
  'symfony/polyfill-php71' => '*@ab99b76ec4bb010402bc3d07d641c29ed6f91b96',
  'symfony/polyfill-php70' => '*@ab99b76ec4bb010402bc3d07d641c29ed6f91b96',
  'symfony/polyfill-php56' => '*@ab99b76ec4bb010402bc3d07d641c29ed6f91b96',
  '__root__' => 'dev-master@ab99b76ec4bb010402bc3d07d641c29ed6f91b96',
);

    private function __construct()
    {
    }

    /**
     * @throws \OutOfBoundsException If a version cannot be located.
     *
     * @psalm-param key-of<self::VERSIONS> $packageName
     */
    public static function getVersion(string $packageName) : string
    {
        if (isset(self::VERSIONS[$packageName])) {
            return self::VERSIONS[$packageName];
        }

        throw new \OutOfBoundsException(
            'Required package "' . $packageName . '" is not installed: check your ./vendor/composer/installed.json and/or ./composer.lock files'
        );
    }
}
