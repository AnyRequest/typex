import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  SvgIcon,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typoz from 'typoz';
import JavaScriptIcon from '../assets/icons/JavaScriptIcon';
import ReactIcon from '../assets/icons/ReactIcon';
import TypeScriptIcon from '../assets/icons/TypeScriptIcon';
import VueIcon from '../assets/icons/VueIcon';
import CodeBlock from '../components/common/CodeBlock';
import { goTo } from '../utils/features';
import { BRAND_NAME, VERSION } from '../utils/global';

export default function Landing() {
  useEffect(() => {
    const typoz = new Typoz();
    typoz.initialize();
    typoz.globalConfig({
      nodes: [
        {
          select: '#head1',
          words: [''],
          config: {
            delay: 2,
            speed: {
              write: 3,
              erase: 5,
            },
            style: {
              cursor: {
                blink: true,
                dir: 'horizontal',
              },
            },
          },
        },
        {
          select: '#head2',
          config: {
            delay: 0.5,
            speed: {
              write: 3,
              erase: 5,
            },
          },
        },
      ],
    });

    return () => {
      typoz.destroy();
    };
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        '& *': { transition: 'background-color 150ms ease-in-out' },
      }}
    >
      {/* Hero Section */}
      <Box id="about" sx={{ py: 6, px: 4, bgcolor: 'background.default' }}>
        <Container>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={3}>
            <Stack flex={1} gap={1}>
              <Typography
                id="head1"
                variant="h3"
                gutterBottom
                sx={{
                  height: { xs: '3.5em', lg: '2.5em' },
                  color: (theme) => theme.palette.text.primary,
                  '&::after': {
                    display: 'inline-block',
                    content: '""',
                    height: '1em',
                    width: '10px',
                    ml: 1,
                    backgroundColor: '#56565656',
                  },
                }}
              >
                Bring your text to life with {BRAND_NAME}
              </Typography>
              <Typography
                id="head2"
                sx={{
                  color: 'text.secondary',
                  height: { xs: '3.5em', lg: '2.5em' },
                }}
              >
                Give your UI the dynamic text animation it deserves.
                Effortlessly configure and deploy typing animations with our
                library.
              </Typography>
              <Box>
                <Button
                  startIcon={'🚀'}
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                  onClick={() => goTo('installation')}
                >
                  Get Started!
                </Button>
              </Box>
            </Stack>
            <Stack flex={1}>
              <CodeBlock
                sx={{
                  maxHeight: '70vh',
                  overflowY: 'auto',
                }}
                language="typescript"
                code={`
const typoz = new Typoz();
typoz.initialize();
typoz.globalConfig({
  style: {
    cursor: {
      blink: true,
      blinkTime: 0.5,
      dir: 'vertical',
      color: '#565656',
    },
  },
  nodes: [
    {
      select: '#head1',
      config: {
        delay: 0.5,
        speed: {
          write: 3,
          erase: 5,
        },
        style: {
          cursor: {
            dir: 'horizontal',
          },
        },
      },
    },
    {
      select: '#head2',
      config: {
        delay: 0.5,
        speed: {
          write: 3,
          erase: 5,
        },
      },
    },
  ],
});
                `}
              />
            </Stack>
          </Stack>
          {/* <Grid container spacing={6}>
            <Grid item lg={6} md={12}></Grid>

            <Grid item lg={6} md={12}>
              
            </Grid>
          </Grid> */}
        </Container>
      </Box>

      {/* Installation Section */}
      <Box
        id="installation"
        sx={{ bgcolor: 'background.default', py: 6, px: 4 }}
      >
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
          >
            Installation
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Installation is a breeze. Choose between CDN or npm.
          </Typography>
          <Paper
            component="pre"
            sx={{
              // bgcolor: 'primary.dark',
              // color: 'common.white',
              p: 2,
              borderRadius: 1,
            }}
          >
            <Typography variant="h6">CDN</Typography>
            <CodeBlock
              language="html"
              code={`
<script src="https://www.unpkg.com/typoz@${VERSION}/dist/umd/typoz.min.js"></script>
              `}
            />
            <Typography variant="h6">NPM module</Typography>
            <CodeBlock language="bash" code={`npm install typoz`} />
            <CodeBlock language="bash" code={'pnpm add typoz'} />
          </Paper>
        </Container>
      </Box>

      {/* Where to Use Section */}
      <Box id="use-cases" sx={{ bgcolor: 'background.default', py: 6, px: 4 }}>
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            Use Cases
          </Typography>
          <Stack
            direction={{
              xs: 'column',
              lg: 'row',
            }}
            gap={3}
          >
            <Stack flex={1}>
              <Typography sx={{ color: 'text.secondary' }}>
                We plan to create a typing effector that can be used with
                JavaScript or React and can produce a richer expression by
                adding various effects.
              </Typography>
            </Stack>
            <Stack flex={1} direction="row" justifyContent={'start'} gap={4}>
              {/* Icon list here */}
              <SvgIcon
                color="inherit"
                fontSize="large"
                sx={{ color: '#F7DF1E' }}
              >
                <JavaScriptIcon />
              </SvgIcon>
              <SvgIcon
                color="inherit"
                fontSize="large"
                sx={{ color: '#3178C6' }}
              >
                <TypeScriptIcon />
              </SvgIcon>
              <SvgIcon
                color="inherit"
                fontSize="large"
                sx={{ color: '#61DAFB' }}
              >
                <ReactIcon />
              </SvgIcon>
              <SvgIcon
                color="inherit"
                fontSize="large"
                sx={{ color: '#4FC08D' }}
              >
                <VueIcon />
              </SvgIcon>
            </Stack>
          </Stack>

          <Toolbar />

          <Stack gap={3}>
            <Box>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                Usage in React
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                TypeNode Render
              </Typography>
              <CodeBlock
                filename="index.tsx"
                language="tsx"
                code={`
// "TypozRender Component for React" 코드 블럭을 참조해주세요 😁
import TypozRender from './TypozRender';

function Index() {
  return (
    <div>
      <TypozRender
        id='sub-word'
        fontSize={(theme) => theme.typography.pxToRem(TITLE_SIZE.S)}
        fontWeight={200}
        fontFamily={\`"IBM Plex Sans KR", sans-serif\`}
        sx={{
          textAlign: { xs: "left", lg: "center" },
        }}
        words={[
          "다양한 옵션으로 원하는 효과를 만들어보세요!",
          "애니메이션 효과나 환경에 맞추어 개발 테스트를 하고 있습니다 😁",
          "umd, esm, cjs 모두 사용 가능하며 react에서 로드 시점 문제를 해결하기 위해 예시 컴포넌트 또한 준비되어 있습니다.",
        ]}>
        typoz는 사용자가 직접 입력하는 효과를 편하게 구현하기 위해 직접
        제작한 오픈소스 라이브러리입니다.
      </TypozRender>
    </div>
  );
}

export default Index;
            `}
              />
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                TypeBuilder Render
              </Typography>
              <CodeBlock
                filename="index.tsx"
                language="tsx"
                code={`
// "TypozRender Component for React" 코드 블럭을 참조해주세요 😁
import TypozRender from './TypozRender';

function Index() {
  return (
    <div>
      <TypozRender
        id='main-word'
        builder
        config={{
          speed: { write: 2 },
        }}
        processes={[
          { action: "write", value: MAIN_SUBSCRIPTION },
          { action: "pause", value: 1 },
          { action: "allErase" },
          { action: "write", value: "공부하기 위해" },
          { action: "erase", value: 3 },
          { action: "pause", value: 1 },
          { action: "erase", value: 1 },
          {
            action: "write",
            value: "거나 문제 해결한 내용을 공유하",
            speed: 2,
          },
          { action: "pause", value: 0.2 },
          { action: "write", value: "고" },
          { action: "pause", value: 0.5 },
          { action: "erase", value: 1 },
          { action: "write", value: "기 위해", speed: 1 },
          { action: "write", value: " 작성합", speed: 2.5 },
          { action: "move", value: -3 },
          { action: "write", value: "글을 " },
          { action: "move", value: 3 },
          { action: "write", value: "니다." },
          { action: "pause", value: 1 },
          { action: "forever" },
        ]}
        fontSize={(theme) => theme.typography.pxToRem(TITLE_SIZE.S)}
        fontWeight={200}
        fontFamily={\`"IBM Plex Sans KR", sans-serif\`}
        sx={{
          textAlign: { xs: "left", lg: "center" },
        }}
      />
    </div>
  );
}

export default Index;
            `}
              />
            </Box>
            <Box>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                TypozRender Component for React
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                for Basic
              </Typography>
              <CodeBlock
                folding
                filename="TypozRender.tsx"
                language="tsx"
                code={`import { useEffect, useRef } from "react";
import Typoz, { OmitNodesOptions, Options, RecursivePartial } from "typoz";

type BaseProcess = {
  speed?: number;
  value?: string | number | boolean;
};

interface ProcessStringValue extends BaseProcess {
  action: "write";
  value: string;
}
interface ProcessNumberValue extends BaseProcess {
  action: "erase" | "move" | "pause";
  value: number;
}
interface ProcessNoneValue extends BaseProcess {
  action: "allErase" | "run";
}
interface ProcessBooleanValue extends BaseProcess {
  action: "forever";
  value?: boolean;
}

type PropcessType =
  | ProcessStringValue
  | ProcessNumberValue
  | ProcessNoneValue
  | ProcessBooleanValue;

type BaseTypozRenderProps = {
  id?: string;
  className?: string;
  words?: string[];
  builder?: boolean;
  children?: string;
  processes?: PropcessType[];
  globalConfig?: Options;
  config?: RecursivePartial<OmitNodesOptions>;
};

interface TypozRenderNormalProps extends BaseTypozRenderProps {
  id?: string;
  className?: string;
  words?: string[];
  config?: RecursivePartial<OmitNodesOptions>;
  children?: string;
}
interface TypozRenderBuilderProps extends BaseTypozRenderProps {
  id: string;
  builder: boolean;
  config?: RecursivePartial<OmitNodesOptions>;
  processes: PropcessType[];
}

type TypozRenderProps = TypozRenderNormalProps | TypozRenderBuilderProps;

function TypozRender({
  children,
  words,
  id,
  className,
  builder = false,
  processes = [],
  globalConfig,
  config,
  ...props
}: TypozRenderProps) {
  const typoz = new Typoz();
  const typingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typingRef.current) {
      if (builder === true) {
        handleTypeBuilderProcess(typoz, processes);
      } else {
        handleTypeNodeRender(typoz);
      }
    }
    return () => {
      typoz.destroy();
    };
  }, []);

  function handleTypeBuilderProcess(typoz: Typoz, processes: PropcessType[]) {
    const typeBuilder = typoz
      .createBuilder()
      .select("#" + id)
      .config(config || {});
    for (const { action, value, speed } of processes) {
      switch (action) {
        case "write":
          if (speed) typeBuilder.write(value, speed);
          else typeBuilder.write(value);
          break;
        case "erase":
          if (speed) typeBuilder.erase(value, speed);
          else typeBuilder.erase(value);
          break;
        case "move":
          if (speed) typeBuilder.move(value, speed);
          else typeBuilder.move(value);
          break;
        case "pause":
          typeBuilder.pause(value);
          break;
        case "allErase":
          typeBuilder.allErase();
          break;
        case "run":
          typeBuilder.run();
          break;
        case "forever":
          typeBuilder.forever(value ?? false);
          break;
      }
    }
  }

  function handleTypeNodeRender(typoz: Typoz) {
    typoz.initialize();
    typoz.globalConfig({
      ...globalConfig,
      nodes: [
        {
          select: id ? "#" + id : "." + className,
          words: words || [],
          config,
        },
      ],
    });
  }

  return (
    <div ref={typingRef} id={id} className={className} {...props}>
      {children}
    </div>
  );
}

export default TypozRender;
              `}
              />
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                for MUI
              </Typography>
              <CodeBlock
                folding
                filename="TypozRender.tsx"
                language={'tsx'}
                code={`import { Typography, TypographyProps } from "@mui/material";
import { useEffect, useRef } from "react";
import Typoz, {
  HTMLTypozElement,
  OmitNodesOptions,
  Options,
  RecursivePartial,
} from "typoz";

type BaseProcess = {
  speed?: number;
  value?: string | number | boolean;
};

interface ProcessStringValue extends BaseProcess {
  action: "write";
  value: string;
}
interface ProcessNumberValue extends BaseProcess {
  action: "erase" | "move" | "pause";
  value: number;
}
interface ProcessNoneValue extends BaseProcess {
  action: "allErase" | "run";
}
interface ProcessBooleanValue extends BaseProcess {
  action: "forever";
  value?: boolean;
}

type PropcessType =
  | ProcessStringValue
  | ProcessNumberValue
  | ProcessNoneValue
  | ProcessBooleanValue;

type BaseTypozRenderProps = {
  id?: string;
  className?: string;
  words?: string[];
  builder?: boolean;
  children?: string;
  processes?: PropcessType[];
  globalConfig?: Options;
  config?: RecursivePartial<OmitNodesOptions>;
};

interface TypozRenderNormalProps extends BaseTypozRenderProps {
  id?: string;
  className?: string;
  words?: string[];
  config?: RecursivePartial<OmitNodesOptions>;
  children?: string;
}
interface TypozRenderBuilderProps extends BaseTypozRenderProps {
  id: string;
  builder: boolean;
  config?: RecursivePartial<OmitNodesOptions>;
  processes: PropcessType[];
}

type TypozRenderProps = TypozRenderNormalProps | TypozRenderBuilderProps;

function TypozRender({
  children,
  words,
  id,
  className,
  builder = false,
  processes = [],
  globalConfig,
  config,
  ...props
}: TypozRenderProps & TypographyProps) {
  const typoz = new Typoz();
  const typingRef = useRef<HTMLTypozElement>(null);

  useEffect(() => {
    if (typingRef.current) {
      if (builder === true) {
        handleTypeBuilderProcess(typoz, processes);
      } else {
        handleTypeNodeRender(typoz);
      }
    }
    return () => {
      typoz.destroy();
    };
  }, []);

  function handleTypeBuilderProcess(typoz: Typoz, processes: PropcessType[]) {
    const typeBuilder = typoz
      .createBuilder()
      .select("#" + id)
      .config(config || {});
    for (const { action, value, speed } of processes) {
      switch (action) {
        case "write":
          if (speed) typeBuilder.write(value, speed);
          else typeBuilder.write(value);
          break;
        case "erase":
          if (speed) typeBuilder.erase(value, speed);
          else typeBuilder.erase(value);
          break;
        case "move":
          if (speed) typeBuilder.move(value, speed);
          else typeBuilder.move(value);
          break;
        case "pause":
          typeBuilder.pause(value);
          break;
        case "allErase":
          typeBuilder.allErase();
          break;
        case "run":
          typeBuilder.run();
          break;
        case "forever":
          typeBuilder.forever(value ?? false);
          break;
      }
    }
  }

  function handleTypeNodeRender(typoz: Typoz) {
    typoz.initialize();
    typoz.globalConfig({
      ...globalConfig,
      nodes: [
        {
          select: id ? "#" + id : "." + className,
          words: words || [],
          config,
        },
      ],
    });
  }

  return (
    <Typography ref={typingRef} id={id} className={className} {...props}>
      {children}
    </Typography>
  );
}

export default TypozRender;
`}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Where to Use Section */}
      <Box id="contact" sx={{ bgcolor: 'background.default', py: 6, px: 4 }}>
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            Contact
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4 }}>
            {BRAND_NAME} will continue to evolve, and we welcome your interest
            and contributions. 😁
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4 }}>
            Email:{' '}
            <Typography
              component={Link}
              to="mailto:chaplet01@gmail.com"
              sx={{
                color: 'secondary.main',
                textDecoration: 'none',
              }}
            >
              chaplet01@gmail.com
            </Typography>
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            {/* Icon list here */}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
